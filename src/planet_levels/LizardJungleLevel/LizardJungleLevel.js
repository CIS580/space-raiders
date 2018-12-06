import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";
import LizardPeople from "./LizardPeople";



export default class LizardJungleLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 15;
    this.playerSpawnY = 18;
    this.playerSpawnFaceDirection = 1;


    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/LizardJungleLevel/jungle_tileset.json"),
      require("../../../dist/resources/planet_tilesets/LizardJungleLevel/lizard_jungle_planet_tilemap.json"),
      "resources/planet_tilesets/LizardJungleLevel/jungle tileset.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Lizard Jungle Level";
    this.message = [];
    this.final = false;

    this.message.push("Welcome to hurgerbluger. The legends say that there's treasure hidden in these trees.");
    this.message.push("Maybe talking to the locals will give some clues as to its location!");

    this.lizards = [];
    this.lizards.push(new LizardPeople(2, 2, 4, this.tileset,
      "I heard the treasure was in the part of the forest that's shaped sort of like a 5."));
    this.lizards.push(new LizardPeople(21, 9, 2, this.tileset,
      "I thought the treasure was on the south side of a tree."));
    this.lizards.push(new LizardPeople(23, 20, 3, this.tileset,
      "Supposedly, the treasure is hidden in a tree somewhere!"));
    this.lizards.push(new LizardPeople(12, 14, 1, this.tileset,
      "The stories say that the treasure is close to the western edge of the forest."));
    this.lizards.push(new LizardPeople(4, 7, 1, this.tileset,
      "A friend told me that if you get to the grove with three trees, you've gone too far."));
    this.lizards.push(new LizardPeople(22, 1, 3, this.tileset,
      "There's treasure somewhere??"));
    this.lizards.push(new LizardPeople(29, 5, 3, this.tileset,
      "Have you seen Rathalgus lately? I swear he's gone crazy muttering about some treasure."));
    this.lizards.push(new LizardPeople(29, 6, 4, this.tileset,
      "I thought Rathalgus was just always like that..."));
    this.lizards.push(new LizardPeople(7, 17, 3, this.tileset,
      "Rathalgus knows. Rathalgus knows treasure is here somewhere. Rathalgus KNOWS."));
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    //console.log("Player interacted with " + x + "," + y);
    if (!this.final && x === 2 && y === 14 && player.y === 15) {
      this.message.push('Nestled in a hole in a tree trunk you find a small statue of a lizard.');
      this.message.push("It looks painstakingly hand carved. This must be the treasure!");
      this.final = true;
      return;
    }
    var message = '';
    this.lizards.forEach(function(lizard){
      if (x == lizard.x && y == lizard.y) {
        message = lizard.text;
      }
    });
    if (this.message.length !== 0 && message !== '') this.message.length = 0;
    else if (message === '') {
      this.message.length = 0;
      if (this.final) {
        this.finished = true;
        this.success = true;
      }
    }
    else this.message.push(message);
  }

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {
  }

  /**
   * Called when the player fires a weapon.
   * @param player Representation of the player.
   * @param x X grid coordinate of the tile the player fires into (in front of player).
   * @param y Y grid coordinate of the tile the player fires into (in front of player).
   */
  playerFired(player, x, y) {
  }

  /**
   * Called when the player attempts to move into tile at the given coordinates.
   * @param x The X coordinate of the attempted move.
   * @param y The Y coordinate of the attempted move.
   * @return True if the player may pass, false if the requested tile is "blocked".
   */
  tilePassable(x, y) {
    if (this.message.length > 0) return false;
    var flag = false;
    this.lizards.forEach(function(lizard) {
      if (x === lizard.x && y === lizard.y) {
        flag = true;
      }
    });
    if (flag) return false;
    return this.tileset.getTile(x, y)["passable"] !== "false";
  }

  /** @method
   * Update any entities within this planet level, including the player.
   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame
   * @param {Input} input - the input from this and the prior frame
   * @param {Game} game - the game object
   * @param {PlanetPlayer} player - representation of the player
   */
  update(elaspedTime, input, game, player) {
    player.update(elaspedTime, input, game);
    this.lizards.forEach(function(lizard) {
      lizard.update(elaspedTime);
    })
  }

  /** @method
   * Render the tileset, the player, and any other custom entities to the provided context.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   * @param {PlanetPlayer} player - representation of the player
   */
  render(elapsedTime, context, player) {
    this.tileset.render(elapsedTime, context);
    player.render(elapsedTime, context);
    this.lizards.forEach(function(lizard) {
      lizard.render(context);
    })
  }

  /** @method
   * Draw text using the static context (after scrolling).
   * Only use this for drawing items on top of the screen.
   * @param staticContext - The context to draw on top of the screen and scrolling elements.
   */
  renderStatic(elapsedTime, staticContext, player) {
    if (this.message.length > 0) {
      staticContext.fillStyle = 'white';
      staticContext.fillRect(0, 576, 1024, 256);
      staticContext.fillStyle = 'black';
      staticContext.font = '24px Arial';
      for (var i = 0; i < this.message.length; i++) {
        staticContext.fillText(this.message[i], 60, 630+40*i);
      }
      staticContext.font = '18px Arial';
      staticContext.fillText('Press F to continue', 800, 730);
    }
    else {
      staticContext.fillStyle = 'transparent';
    }
  }
}
