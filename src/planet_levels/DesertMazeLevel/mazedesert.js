import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";

/**
 * Example SamplePlanetLevel which extends the base planet class functionality.
 * ** DO NOT MODIFY THIS CLASS. **
 *
 * To start your own planet, copy this file and rename the class to your own level name, then customize the various
 * methods to tailor it to your game.
 */
export default class mazedesert extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 64;
    this.playerSpawnY = 48;
    this.playerSpawnFaceDirection = 1;

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/DesertMazeLevel/sandy.json"),
      require("../../../dist/resources/planet_tilesets/DesertMazeLevel/mazemap.json"),
      "resources/planet_tilesets/DesertMazeLevel/dss.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Desert Maze";
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    //console.log("Player interacted with " + x + "," + y);
    if(this.map === undefined) {
      this.map = 0;
    }
    if (x===68&&y===50) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[68+50*j.width] = 12;

        j.layers[0].data[68+48*j.width] = 7;
        j.layers[0].data[69+48*j.width] = 7;
        j.layers[0].data[64+41*j.width] = 7;
      }
    else if (x===116&&y===11) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[116+11*j.width] = 12;

        j.layers[0].data[63+37*j.width] = 7;
        j.layers[0].data[64+37*j.width] = 7;
        j.layers[0].data[65+37*j.width] = 7;
    }
    else if (x===16&&y===75) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[16+75*j.width] = 12;

        j.layers[0].data[63+33*j.width] = 7;
        j.layers[0].data[64+33*j.width] = 7;
        j.layers[0].data[65+33*j.width] = 7;
      }
      else if (x===36&&y===10) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[36+10*j.width] = 12;

        j.layers[0].data[63+29*j.width] = 7;
        j.layers[0].data[64+29*j.width] = 7;
        j.layers[0].data[65+29*j.width] = 7;
      }
      else if (x===64&&y===43) {
        this.success = true;
        this.finished = true;
      }

  }

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {
    //console.log("Player at " + player.x + "," + player.y);
    if (player.x===68&&player.y===50) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[68+50*j.width] = 12;

        j.layers[0].data[68+48*j.width] = 7;
        j.layers[0].data[69+48*j.width] = 7;

        j.layers[0].data[63+41*j.width] = 7;
        j.layers[0].data[64+41*j.width] = 7;
        j.layers[0].data[65+41*j.width] = 7;
    }
    else if (player.x===116&&player.y===11) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[116+11*j.width] = 12;

        j.layers[0].data[63+37*j.width] = 7;
        j.layers[0].data[64+37*j.width] = 7;
        j.layers[0].data[65+37*j.width] = 7;
    }
    else if (player.x===16&&player.y===75) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[16+75*j.width] = 12;

        j.layers[0].data[63+33*j.width] = 7;
        j.layers[0].data[64+33*j.width] = 7;
        j.layers[0].data[65+33*j.width] = 7;
    }
    else if (player.x===36&&player.y===10) {
        var j = this.tileset.tilemapJson;
        j.layers[0].data[36+10*j.width] = 12;

        j.layers[0].data[63+29*j.width] = 7;
        j.layers[0].data[64+29*j.width] = 7;
        j.layers[0].data[65+29*j.width] = 7;
    }
    else if (player.x===64&&player.y===43) {
      this.success = true;
      this.finished = true;
    }

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
