import BasePlanetLevel from "./BasePlanetLevel";
import PlanetTileset from "../PlanetTileset";

/**
 * Example SamplePlanetLevel which extends the base planet class functionality.
 * ** DO NOT MODIFY THIS CLASS. **
 *
 * To start your own planet, copy this file and rename the class to your own level name, then customize the various
 * methods to tailor it to your game.
 */
export default class SamplePlanetLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 10;
    this.playerSpawnY = 10;
    this.playerSpawnFaceDirection = 1;

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../dist/resources/planet_tilesets/sample_planet_level/tileset.json"),
      require("../../dist/resources/planet_tilesets/sample_planet_level/tilemap.json"),
      "resources/planet_tilesets/sample_planet_level/tiles.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Sample Planet Level";
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    console.log("Player interacted with " + x + "," + y);
    if(this.map === undefined) {
      this.map = 0;
    }
    this.map++;
    this.map %= 3;
    switch(this.map) {
      case 0:
        this.tileset.loadNewTilemap(require("../../dist/resources/planet_tilesets/sample_planet_level/tilemap.json"));
        break;
      case 1:
        this.tileset.loadNewTilemap(require("../../dist/resources/planet_tilesets/sample_planet_level/tilemap_large.json"));
        break;
      case 2:
        this.tileset.loadNewTilemap(require("../../dist/resources/planet_tilesets/sample_planet_level/tilemap_small.json"));
        break;
    }
    player.movePlayerToSpawn();
  }

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {
    console.log("Player at " + player.x + "," + player.y);
  }

  /**
   * Called when the player fires a weapon.
   * @param player Representation of the player.
   * @param x X grid coordinate of the tile the player fires into (in front of player).
   * @param y Y grid coordinate of the tile the player fires into (in front of player).
   */
  playerFired(player, x, y) {
    console.log("Player fired at " + x + "," + y);
  }

  /**
   * Called when the player attempts to move into tile at the given coordinates.
   * @param x The X coordinate of the attempted move.
   * @param y The Y coordinate of the attempted move.
   * @return True if the player may pass, false if the requested tile is "blocked".
   */
  tilePassable(x, y) {
    return this.tileset.getTile(x, y)["passable"] === true;
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
  }
}