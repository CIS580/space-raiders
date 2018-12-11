import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";

export default class IceRockLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.sw = [ //Switches
      {
        sx: 27,
        sy: 23,
        ix: 25,
        iy: 23,
        p: false
      }, {
        sx: 14,
        sy: 26,
        ix: 13,
        iy: 28,
        p: false
      }, {
        sx: 12,
        sy: 26,
        ix: 11,
        iy: 28,
        p: false
      }, {
        sx: 12,
        sy: 30,
        ix: 10,
        iy: 28,
        p: false
      },
      {
        sx: 1,
        sy: 30,
        ix: 3,
        iy: 25,
        p: false
      }, {
        sx: 1,
        sy: 26,
        ix: 3,
        iy: 24,
        p: false
      }, {
        sx: 18,
        sy: 7,
        ix: 17,
        iy: 5,
        p: false
      }, {
        sx: 17,
        sy: 10,
        ix: 18,
        iy: 12,
        p: true
      }, {
        sx: 17,
        sy: 21,
        ix: 28,
        iy: 11,
        p: false
      }
    ];
    this.playerSpawnX = 29;
    this.playerSpawnY = 31;
    this.playerSpawnFaceDirection = 1;
    this.sliding = 0; //0=not sliding, 1=right, 2=up, 3=left, 4=down, else=und
    this.rockMoving = 0 //0=not sliding, 1=right, 2=up, 3=left, 4=down, else=und
    this.slideSteps = 0; //steps of sliding (not elapsedTime based)
    this.totalSteps = 8;

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/IceRockLevel/myTileset.json"),
      require("../../../dist/resources/planet_tilesets/IceRockLevel/puzzleRoomR.json"),
      "resources/planet_tilesets/IceRockLevel/tiles.png");

    this.icon = new Image(); // Could be taken from your tileset, this is just a sample blank image.
    this.icon.src = "resources/planet_tilesets/IceRockLevel/IcicleBadge.png"
    this.name = "Ice Rock Level";



    this.message = [];
    this.message.push('Lost in a cave, you find yourself in a room filled with... puzzles?');
    this.message.push('Use [F] to shove boulders, press [R] to give up (or to reset I  guess).');
    this.message.push('Good Luck!');


  }




  shoveRock(player, rX, rY) { //0=up, 1=left, 2=down, 3=right
    var nextTile, nX = rX,
      nY = rY;
    this.rockMoving = player.faceDirection + 1;
    do {
      switch (this.rockMoving) {
        case 1:
          nextTile = this.tileset.getTile(rX, rY - 1);
          nY--;
          break;
        case 2:
          nextTile = this.tileset.getTile(rX - 1, rY);
          nX--;
          break;
        case 3:
          nextTile = this.tileset.getTile(rX, rY + 1);
          nY++;
          break;
        case 4:
          nextTile = this.tileset.getTile(rX + 1, rY);
          nX++;
          break;
      }
      if (nextTile["passable"]) {
        this.tileset.setTileId(rX, rY, 1, -1);
        this.tileset.setTileId(nX, nY, 1, 32);
      }
      rX = nX;
      rY = nY;
    }
    while (nextTile["slippery"]) //Push boulder
    this.rockMoving = 0;
    this.updateSwitches();

  }

  updateSwitches() {
    for (var i = 0; i < this.sw.length; i++) {
      if (this.tileset.getTile(this.sw[i].sx, this.sw[i].sy).id === 32) { //if boulder is on this.switch
        this.tileset.setTileId(this.sw[i].ix, this.sw[i].iy, 1, -1); //make icicle go away
        if (i === 7) {
          this.tileset.setTileId(this.sw[i].ix, this.sw[i].iy, 1, 64); //make icicle come back
        }
      } else { //this.switch not pressed
        this.tileset.setTileId(this.sw[i].ix, this.sw[i].iy, 1, 64); //make icicle
        if (i === 7) {
          this.tileset.setTileId(this.sw[i].ix, this.sw[i].iy, 1, -1); //make icicle go away
        }
      }
    }
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    var tile = this.tileset.getTile(x, y);
    console.log("Player interacted with " + x + "," + y);
    var message = '';

    if (this.message.length !== 0 && message !== '') this.message.length = 0;
    else if (message === '') {
      this.message.length = 0;
    } else this.message.push(message);

    if (this.room == 1) {
      player.x = 12;
      player.y = 7;
    }
    if (this.room == 2) {
      player.x = 16;
      player.y = 2;
    }
    if (x > 31 || y > 31 || isNaN(x)) {
      return;
    }
    if (tile.id === 32) {
      this.shoveRock(player, x, y);
    }

  }

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {
    console.log("Player at " + player.x + "," + player.y);
    var tile = this.tileset.getTile(player.x, player.y);
    var nextTile;
    try {
      switch (player.faceDirection) {
        case 0: //up
          nextTile = this.tileset.getTile(player.x, player.y - 1);
          break;
        case 1: //left
          nextTile = this.tileset.getTile(player.x - 1, player.y);
          break;
        case 2: //down
          nextTile = this.tileset.getTile(player.x, player.y + 1);
          break;
        case 3: //right
          nextTile = this.tileset.getTile(player.x + 1, player.y);
          break;
      }


      if (nextTile["passable"]) {
        this.sliding = tile["slippery"];
      }
    } catch (err) {}
    if (player.x === 16 && player.y === 2) {
      this.finished = true;
      this.success = true;
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
    if (this.message.length != 0 || this.sliding > 0 || this.rockMoving > 0 || (x === 21 && y === 1)) {
      return false;
    }
    return this.tileset.getTile(x, y)["passable"] === true;
  }


  renderTreasure(context) {
    context.drawImage(this.icon, 21 * 32, 1 * 32);
  }

  playerSlide(player) {
    this.slideSteps++;
    var nextTile;
    switch (player.faceDirection) {
      case 0: //up
        player.animationYOffset -= 1 * 32 / this.totalSteps;
        nextTile = this.tileset.getTile(player.x, player.y - 2);
        break;
      case 1: //left
        player.animationXOffset -= 1 * 32 / this.totalSteps;
        nextTile = this.tileset.getTile(player.x - 2, player.y);
        break;
      case 2: //down
        player.animationYOffset += 1 * 32 / this.totalSteps;
        nextTile = this.tileset.getTile(player.x, player.y + 2);
        break;
      case 3: //right
        player.animationXOffset += 1 * 32 / this.totalSteps;
        nextTile = this.tileset.getTile(player.x + 2, player.y);
        break;
    }

    player.x += Math.trunc(player.animationXOffset / 32);
    player.y += Math.trunc(player.animationYOffset / 32);

    player.animationXOffset %= 32;
    player.animationYOffset %= 32;

    if (this.slideSteps === this.totalSteps) {
      this.slideSteps = 0;
      if (!nextTile["passable"] || !this.tileset.getTile(player.x, player.y)["slippery"]) {
        this.sliding = false;
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
    if (!this.sliding) {
      player.update(elaspedTime, input, game);
    }

    if (this.sliding) {
      this.playerSlide(player);
    }
    if (input.newState.r) {
      this.finished = true;
    }

  }



  /** @method
   * Draw items using the static context (after scrolling).
   * Only use this for drawing items on top of the screen.
   * @param staticContext - The context to draw on top of the screen and scrolling elements.
   */
  renderStatic(elapsedTime, staticContext, player) {
    //just copy and paste all of this
    if (this.message.length > 0) {
      staticContext.fillStyle = 'white';
      staticContext.fillRect(0, 576, 1024, 256);
      staticContext.fillStyle = 'black';
      staticContext.font = '24px Arial';
      for (var i = 0; i < this.message.length; i++) {
        staticContext.fillText(this.message[i], 60, 630 + 40 * i);
      }
      staticContext.font = '20px Arial';
      staticContext.fillText('Press [F] to start!', 650, 730);
    } else {
      staticContext.fillStyle = 'transparent';
    }
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
    if (this.icon.complete) {
      this.renderTreasure(context);
    }
    /*context.font = "14px Arial";
    context.fillText(player.animationXOffset + " & " + player.animationYOffset, player.x * 32, player.y * 32 - 35);
    context.fillText(player.x + " & " + player.y, player.x * 32, player.y * 32 - 20);*/


  }
}
