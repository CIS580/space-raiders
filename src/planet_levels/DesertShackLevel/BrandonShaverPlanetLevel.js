// Class repo located at: https://github.com/CIS580/space-raiders

import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";

import Laser from "./Laser";
import Alien from "./Alien";

/**
 * Example SamplePlanetLevel which extends the base planet class functionality.
 * ** DO NOT MODIFY THIS CLASS. **
 *
 * To start your own planet, copy this file and rename the class to your own level name, then customize the various
 * methods to tailor it to your game.
 */
export default class BrandonShaverPlanetLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 10;
    this.playerSpawnY = 10;
    this.playerSpawnFaceDirection = 1;

    this.bullets = [];
    this.aliens = [];
    this.aliens.push(new Alien(this, 1, 1, 1));

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/DesertShackLevel/tileset.json"),
      require("../../../dist/resources/planet_tilesets/DesertShackLevel/tilemap.json"),
      "resources/planet_tilesets/DesertShackLevel/Desert.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Desert 1 Level";
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    console.log("Player interacted with " + x + "," + y + ".");

    let tile_id = this.tileset.getTile(x, y).id;

    // press the button
    if( tile_id == 10 ) {
      this.tileset.setTileId(x,y,0,11);
      this.tileset.setTileId(47,56,0,12); // put flower into world
    }
    // unpress the button
    else if ( tile_id == 11 ) {
      this.tileset.setTileId(x,y,0,10);
      this.tileset.setTileId(47,56,0,6); // take flower out of world
    }
    // collect the flower
    else if ( tile_id == 12 ) {
      this.tileset.setTileId(x,y,0,6); // take flower out of world
      // TODO: set world to finished
    }
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

    this.bullets.push(new Laser(this, x, y, player.faceDirection));
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

  resolveBulletCollisions() {
    // NOTE: this is a very messy, very slow function
    let i,j,bullet,alien = 0;
    for( i = 0; i < this.bullets.length; i++ ) {
      bullet = this.bullets[i];

      for ( j = 0; j < this.aliens.length; j++ ) {
        alien = this.aliens[j];

        if( alien.x == bullet.x ) {
          if( alien.y == bullet.y ) {
            this.bullets.splice( this.bullets.indexOf( bullet ), 1 );
            this.aliens.splice( this.aliens.indexOf( alien ), 1 );
          }
        }
      }
    }
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

    this.bullets.forEach(function(object)
    {
      object.update();
    });

    this.aliens.forEach(function(object)
    {
      object.update();
    });

    this.resolveBulletCollisions();
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

    this.bullets.forEach(function(object)
    {
      object.render(context);
    });

    this.aliens.forEach(function(object)
    {
      object.render(context);
    });
  }
}
