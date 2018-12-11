import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";

/**
 * Ice Walker Level
 * By: Cale Benne
 */
export default class IceWalkerLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 28;
    this.playerSpawnY = 2;
    this.playerSpawnFaceDirection = 1;
    this.lastX = this.playerSpawnX;
    this.lastY = this.playerSpawnY;

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/ice_walker_level/tiles.json"),
      require("../../../dist/resources/planet_tilesets/ice_walker_level/room_1.json"),
      "resources/planet_tilesets/ice_walker_level/tiles.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Sample Planet Level";

    this.solve_tiles1 = [
      {sx: 26, sy: 5},{sx: 27, sy: 5},{sx: 28, sy: 5},
      {sx: 24, sy: 6},{sx: 25, sy: 6},{sx: 26, sy: 6},
      {sx: 27, sy: 6},{sx: 28, sy: 6},{sx: 24, sy: 7},
      {sx: 25, sy: 7},{sx: 26, sy: 7},{sx: 27, sy: 7},
      {sx: 24, sy: 8},{sx: 25, sy: 8},{sx: 26, sy: 8},
      {sx: 27, sy: 8},{sx: 24, sy: 9},{sx: 25, sy: 9},
      {sx: 26, sy: 9},{sx: 27, sy: 9},{sx: 24, sy: 10},
      {sx: 25, sy: 10},{sx: 24, sy: 11},{sx: 25, sy: 11}
    ];
    this.solve_tiles2 = [
      {sx: 9, sy: 11},{sx: 10, sy: 11},{sx: 11, sy: 11},{sx: 12, sy: 11},{sx: 13, sy: 11},{sx: 14, sy: 11},{sx: 15, sy: 11},{sx: 16, sy: 11},
      {sx: 8, sy: 12},{sx: 9, sy: 12},{sx: 10, sy: 12},{sx: 11, sy: 12},{sx: 12, sy: 12},
      {sx: 13, sy: 12},{sx: 14, sy: 12},{sx: 15, sy: 12},{sx: 16, sy: 12},{sx: 17, sy: 12},
      {sx: 8, sy: 13},{sx: 9, sy: 13},{sx: 10, sy: 13},{sx: 11, sy: 13},{sx: 12, sy: 13},
      {sx: 13, sy: 13},{sx: 14, sy: 13},{sx: 15, sy: 13},{sx: 16, sy: 13},{sx: 17, sy: 13},
      {sx: 9, sy: 14},{sx: 10, sy: 14},{sx: 11, sy: 14},{sx: 12, sy: 14},{sx: 13, sy: 14},{sx: 14, sy: 14},{sx: 15, sy: 14},{sx: 16, sy: 14}
    ]
    this.room = 1;
    this.lighting_tiles = [
      {sx: 23, sy: 7, dur: 0, final: 39},
      {sx: 14, sy: 11, dur: 0, final: 39},
      {sx: 13, sy: 12, dur: 0, final: 39},
      {sx: 17, sy: 7, dur: 0, final: 39},
      {sx: 17, sy: 12, dur: 0, final: 39},
      {sx: 8, sy: 6, dur: 0, final: 39},
      {sx: 8, sy: 7, dur: 0, final: 39},
      {sx: 8, sy: 8, dur: 0, final: 39},
      {sx: 7, sy: 7, dur: 0, final: 39},
      {sx: 9, sy: 7, dur: 0, final: 39},
      {sx: 13, sy: 6, dur: 0, final: 39}
    ]
    this.gatetime = 0;
    this.roomtutorial = 0;
    this.treasure = 0;
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    console.log("Player interacted with " + x + "," + y);
    if (this.room == 1) {
      player.x = 12;
      player.y = 7;
    }
    if (this.room == 2) {
      player.x = 16;
      player.y = 2;
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
  checkPuzzles() {
    var solved = true;
    for (var i = 0; i < this.solve_tiles1.length; i++) {
      var point = this.solve_tiles1[i];
      if(!this.tileset.getTile(point.sx,point.sy)["cracked"]) {
        solved = false;
      }
    }
    if (solved) {
      this.tileset.setTileId(20,12,1,51);
      this.tileset.setTileId(21,12,1,51);
    }
    var solved = true;
    for (var i = 0; i < this.solve_tiles2.length; i++) {
      var point = this.solve_tiles2[i];
      if(!this.tileset.getTile(point.sx,point.sy)["cracked"]) {
        solved = false;
      }
    }
    if (solved) {
      this.tileset.setTileId(15,9,1,51);
    }
  }

  checkLights() {
    this.all_lights = true;
    for (var i = 0; i < this.tileset.width; i++) {
      for (var j = 0; j < this.tileset.height; j++) {
        var tile = this.tileset.getTile(i,j);
        if (tile["lightable"] === true && tile["lighted"] === false) {
          this.all_lights = false;
        }
      }
    }
    if (this.all_lights) {
      var newid = 1;
      this.tileset.setTileId(14,3,1,newid);
      this.tileset.setTileId(15,3,1,newid);
      this.tileset.setTileId(16,3,1,newid);
      this.tileset.setTileId(17,3,1,newid);
    }
  }
  updateIce(player) {
    var tile = this.tileset.getTile(player.x,player.y);
    //Don't do anything if the player hasn't moved.
    if (this.lastX == player.x && this.lastY == player.y) {
      return;
    }
    //Check if the player has moved onto ice.
    if (tile && tile["ice"] === true && !tile["cracked"]) {
      var id = 17 + ((player.y % player.x) % 2);
      this.tileset.setTileId(player.x,player.y,1,id);
      this.checkPuzzles();
    }
    //If the ice is already cracked, the player will 'fall' and reset.
    else if (tile && tile["ice"] === true && tile["cracked"] === true) {
      this.tileset.setTileId(player.x,player.y,1,19);
      player.movePlayerToSpawn();
    }
    //If the player hits the button, all ice tiles are reset.
    else if (tile && tile.id == 33) {
      for (var i = 0; i < this.tileset.width; i++) {
        for (var j = 0; j < this.tileset.height; j++) {
          if (this.tileset.getTile(i,j)["ice"] === true) {
            this.tileset.setTileId(i,j,1,15);
          }
        }
      }
    }
  }

  updateLights(player,elapsedTime) {
    var tile = this.tileset.getTile(player.x, player.y);
    if (this.lastX == player.x && this.lastY == player.y) {
      return;
    }
    if (tile && tile["lightable"] == true) {
      //Update chktile tile
      var chktile = this.tileset.getTile(player.x-1,player.y);
      if (chktile["lightable"]) {
        var newid = chktile["lighted"] ? 15 : 39;
        this.lighting_tiles.push({sx: player.x-1,sy: player.y, dur: 0, final: newid});
      } 
      //Update right tile
      var chktile = this.tileset.getTile(player.x+1,player.y);
      if (chktile["lightable"]) {
        var newid = chktile["lighted"] ? 15 : 39;
        this.lighting_tiles.push({sx: player.x+1,sy: player.y, dur: 0, final: newid});
      } 
      //Update top tile
      var chktile = this.tileset.getTile(player.x,player.y-1);
      if (chktile["lightable"]) {
        var newid = chktile["lighted"] ? 15 : 39;
        this.lighting_tiles.push({sx: player.x,sy: player.y-1, dur: 0, final: newid});
      } 
      //Update bottom tile
      var chktile = this.tileset.getTile(player.x,player.y+1);
      if (chktile["lightable"]) {
        var newid = chktile["lighted"] ? 15 : 39;
        this.lighting_tiles.push({sx: player.x,sy: player.y+1, dur: 0, final: newid});
      } 
      //Update player tile
      var chktile = this.tileset.getTile(player.x,player.y);
      if (chktile["lightable"]) {
        var newid = chktile["lighted"] ? 15 : 39;
        this.lighting_tiles.push({sx: player.x,sy: player.y, dur: 0, final: newid});
        this.tileset.setTileId(player.x, player.y,1,newid);
      } 
    }
    else if (tile && tile.id == 33) {
      for (var i = 0; i < this.tileset.width; i++) {
        for (var j = 0; j < this.tileset.height; j++) {
          if (this.tileset.getTile(i,j)["lightable"] === true) {
            this.tileset.setTileId(i,j,1,15);
          }
        }
      }
      this.lighting_tiles = [
        {sx: 23, sy: 7, dur: 0, final: 39},
        {sx: 14, sy: 11, dur: 0, final: 39},
        {sx: 13, sy: 12, dur: 0, final: 39},
        {sx: 17, sy: 7, dur: 0, final: 39},
        {sx: 17, sy: 12, dur: 0, final: 39},
        {sx: 8, sy: 6, dur: 0, final: 39},
        {sx: 8, sy: 7, dur: 0, final: 39},
        {sx: 8, sy: 8, dur: 0, final: 39},
        {sx: 7, sy: 7, dur: 0, final: 39},
        {sx: 9, sy: 7, dur: 0, final: 39},
        {sx: 13, sy: 6, dur: 0, final: 39}
      ]
    }
    this.checkLights();
    
  }


  updateRoom(player) {
    if (this.room == 1 && player.x == 11 && player.y == 6) {
      this.room = 2;
      this.tileset.loadNewTilemap(require("../../../dist/resources/planet_tilesets/ice_walker_level/room_2.json"));
      this.playerSpawnX = 15;
      this.playerSpawnY = 14;
      player.movePlayerToSpawn();
      this.roomtutorial = 0;
    }
    if (this.room == 2 && player.x == 16 && player.y == 14) {
      this.room = 1;
      this.tileset.loadNewTilemap(require("../../../dist/resources/planet_tilesets/ice_walker_level/room_1.json"));
      this.playerSpawnX = 28;
      this.playerSpawnY = 2;
      player.x = 11;
      player.y = 7;
    }
    if (this.room == 2 && player.x == 16 && player.y == 1) {
      this.room = 3;
      this.tileset.loadNewTilemap(require("../../../dist/resources/planet_tilesets/ice_walker_level/room_3.json"));
      this.playerSpawnX = 15;
      this.playerSpawnY = 11;
      player.movePlayerToSpawn();
      this.success = true;
    }
    if (this.room == 3 && player.x == 16 && player.y == 11) {
      this.room = 2;
      this.tileset.loadNewTilemap(require("../../../dist/resources/planet_tilesets/ice_walker_level/room_2.json"));
      this.playerSpawnX = 16;
      this.playerSpawnY = 14;
      player.x = 16;
      player.y = 2;
    }
    if (this.room == 1 && player.x == 29 && player.y == 2) {
      this.finished = true;
    }
  }
  flicker(elapsedTime) {
    for (var i = 0; i < this.lighting_tiles.length; i++) {
      var light_tile = this.lighting_tiles[i];
      if (light_tile.dur > 500) {
        this.tileset.setTileId(light_tile.sx,light_tile.sy,1,light_tile.final);
        this.lighting_tiles.splice(i,1);
        i--;
      } else {
        var newid = this.tileset.getTile(light_tile.sx,light_tile.sy)["lighted"] ? 15 : 39;
        this.tileset.setTileId(light_tile.sx,light_tile.sy,1,newid);
        this.lighting_tiles[i].dur += elapsedTime;
      }
    }
    this.gatetime += elapsedTime;
    if (this.gatetime > 200 && this.all_lights === false) {
      this.gatetime = 0;
      var newid = this.tileset.getTile(14,3).id == 52 ? 53 : 52;
      this.tileset.setTileId(14,3,1,newid);
      this.tileset.setTileId(15,3,1,newid);
      this.tileset.setTileId(16,3,1,newid);
      this.tileset.setTileId(17,3,1,newid);
    }
  }

  renderTreasure(elapsedTime,context) {
    this.treasure += elapsedTime;
    this.treasureY = Math.max(6 - this.treasure*.002, 3);
    this.tileset.drawTile(15, (this.treasureY),64,context);
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
    if (this.room == 1) {
      this.updateIce(player);
    }
    if (this.room == 2) {
      this.updateLights(player);
      this.flicker(elaspedTime);
    }
    this.updateRoom(player);
    this.lastX = player.x;
    this.lastY = player.y;
    this.roomtutorial += elaspedTime;
  }
  renderTutorial(elapsedTime, context) {
    if (this.room == 1 && this.roomtutorial < 4000) {
      context.fillStyle = "rgba(0, 0, 0, 0.9)";
      context.strokeStyle = "rgba(0, 0, 255, 1)";
      context.fillRect(256,160,550,100);
      context.strokeRect(256,160,550,100);
      context.fillStyle = "white";
      context.strokeStyle = "white";
      context.font = "20px 'Courier New'";
      context.fillText("The ice is a bit thin here. Crack the ice,",280, 200);
      context.fillText(" but don't fall through!",350,230);
    }
    if (this.room == 2 && this.roomtutorial < 2000) {
      context.fillStyle = "rgba(0, 0, 0, 0.9)";
      context.strokeStyle = "rgba(0, 0, 255, 1)";
      context.fillRect(256,160,550,100);
      context.strokeRect(256,160,550,100);
      context.fillStyle = "white";
      context.strokeStyle = "white";
      context.font = "20px 'Courier New'";
      context.fillText("Get lit.",430, 215);
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
    this.renderTutorial(elapsedTime, context);
    if (this.treasure < 3000 && this.success) {
      this.renderTreasure(elapsedTime,context);
    }
  }
}