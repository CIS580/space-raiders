// Class repo located at: https://github.com/CIS580/space-raiders

import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";

import Laser from "./Laser";
import Alien from "./Alien";

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
    this.aliens_per_spawn = 30;

    this.spawnAliens();

    this.message_text = "Your mission in this desert is to locate the flower."+
                        "\nYou may want to start by searching for the shack."+
                        "\nBeware of the crabs! Your laser should be able to stop them."+
                        "\n"+
                        "\nUse WASD to move."+
                        "\nPress F to interact."+
                        "\nPress SPACE to fire your gun."+
                        "\n"+
                        "\nPress F to get rid of this message.";

    this.death_text = "Oh NO! You have been defeated."+
                      "\n"+
                      "\nYou will have to start from the beginning."+
                      "\n"+
                      "\nDon't forget your objective is to collect the flower."+
                      "\n"+
                      "\nIt will probably help to find the shack first."+
                      "\n"+
                      "\nPress F to get rid of this message.";

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

    if (( this.message_text === "" ) == false) {
      this.message_text = "";
    }

    let tile_id = this.tileset.getTile(x, y).id;

    // press the button
    if( tile_id == 10 ) {
      this.tileset.setTileId(x,y,0,11);
      this.tileset.setTileId(47,56,0,12);
    }
    // unpress the button
    else if ( tile_id == 11 ) {
      this.tileset.setTileId(x,y,0,10);
      this.tileset.setTileId(47,56,0,6);
    }
    // collect the flower
    else if ( tile_id == 12 ) {
      this.tileset.setTileId(x,y,0,6); // take flower out of world
      // this.message_text = "You have collected the flower!"; // unecessary since the world ends instantly
      this.finished = true;
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

  spawnAliens() {
    for( let i = 0; i < this.aliens_per_spawn; i++ ) {
      var random_x = Math.floor(Math.random() * (58)+1);
      var random_y = Math.floor(Math.random() * (58)+1);

      this.aliens.push(new Alien(this, random_x, random_y, 1));
    }
  }

  resolveBulletCollisions() {
    // NOTE: this is a very messy, very slow function
    let i,j,bullet,alien = 0;
    for( i = 0; i < this.bullets.length; i++ ) {
      bullet = this.bullets[i];

      if( bullet.living == false )
      {
        this.bullets.splice( this.bullets.indexOf( bullet ), 1 );
        break;
      }

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

  resolvePlayerAlienCollisions( player ) {
    for( let i = 0; i < this.aliens.length; i++ ) {
      if( this.aliens[i].x == player.x ) {
        if( this.aliens[i].y == player.y ) {
          player.x = this.playerSpawnX;
          player.y = this.playerSpawnY;
          this.message_text = this.death_text;
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

    this.resolvePlayerAlienCollisions(player);

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

    if (( this.message_text === "" ) == false) {
      context.fillStyle = "grey";
      context.fillRect(150, 150, 750, 450);

      context.fillStyle = "white";
      context.font = '24px Arial';

      if( this.message_text.includes("\n") ) {
        var text = this.message_text.split("\n");
        for( var i = 0; i < text.length; i++ ) {
          context.fillText(text[i], 180, 190 + 30*i);
        }
      } else {
        context.fillText(this.message_text, 180, 190);
      }
    }
  }
}
