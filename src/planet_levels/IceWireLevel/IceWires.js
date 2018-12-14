import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";
var electricity = true;
var electricAnimationCounter = 0;
var wiresStart = false;
var gunPowderStart = false;
var tntset = 0;

/**
 * Example SamplePlanetLevel which extends the base planet class functionality.
 * ** DO NOT MODIFY THIS CLASS. **
 *
 * To start your own planet, copy this file and rename the class to your own level name, then customize the various
 * methods to tailor it to your game.
 */
export default class IceWireLevel extends BasePlanetLevel {

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
      require("../../../dist/resources/planet_tilesets/IceWireLevel/tileset.json"),
      require("../../../dist/resources/planet_tilesets/IceWireLevel/tilemap.json"),
      "resources/planet_tilesets/IceWireLevel/tiles.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "IceWires";
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
        this.tileset.loadNewTilemap(require("../../../dist/resources/planet_tilesets/IceWireLevel/tilemap.json"));
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
    this.wirerunCheck(player);
    this.gunPowderCheck(player);
    this.tntcheck(player);
    this.finalBatteryCheck(player);
    this.checkReset(player);
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
    //update electricity animations while on
    this.electricityAnimations();
    if(gunPowderStart == true)this.runGunPowder(player);
    if(wiresStart == true)this.runWire(player);
    player.update(elaspedTime, input, game);
  }

  //check if you are on reset button
  checkReset(player){
   if(player.x == 10 && player.y == 20){
     this.clearField();
   }
  }

  //check if player walks over wire kit
  wirerunCheck(player){
    if(player.x == 11 && player.y == 18){
     wiresStart = true;
   }
  }
  //check if player walks over gun powder kit
  gunPowderCheck(player){
    if(player.x == 12 && player.y == 19){
     gunPowderStart = true;
   }
  }
  //start dropping gunpowder
  runGunPowder(player){
  this.tileset.setTileId(player.x,player.y,0,66);
  }
  //start dropping wire
  runWire(player){
  this.tileset.setTileId(player.x,player.y,0,50);
  }

  //check final battery
  finalBatteryCheck(player){
    if(player.x == 30 && player.y == 16 && wiresStart == true){
      this.tileset.setTileId(31,16,0,48);
      //extend extendBridge
      this.tileset.setTileId(200,0,0,51);
      this.tileset.setTileId(199,0,0,51);
      this.tileset.setTileId(198,0,0,51);
      this.tileset.setTileId(230,0,0,51);
      this.tileset.setTileId(231,0,0,51);
      this.tileset.setTileId(232,0,0,51);
      this.tileset.setTileId(262,0,0,51);
      this.tileset.setTileId(263,0,0,51);
      this.tileset.setTileId(264,0,0,51);
      this.tileset.setTileId(168,0,0,51);
      this.tileset.setTileId(167,0,0,51);
      this.tileset.setTileId(166,0,0,51);
      this.tileset.setTileId(134,0,0,51);
      this.tileset.setTileId(135,0,0,51);
      this.tileset.setTileId(136,0,0,51);
      //turn off wires
      wiresStart = false;
    }
  }

  //check tnt puzzle
  tntcheck(player){
    if(player.x == 23 && player.y == 12){//set 6
      tntset = 1;
    }
    if(player.x == 19 && player.y == 12 && tntset == 1){//set 5
      tntset = 2;
    }
    if(player.x == 13 && player.y == 12 && tntset == 2){//set 4
      tntset = 3;
    }
    if(player.x == 15 && player.y == 19 && tntset == 3){//set 3
      tntset = 4;
    }
    if(player.x == 19 && player.y == 19 && tntset == 4){//set 2
      tntset = 5;
    }
    if(player.x == 25 && player.y == 19 && tntset == 5){//set 1
      tntset = 6;
    }
    //finally hit the switch to check answers
    if(player.x == 11 && player.y == 21 && tntset == 6 && gunPowderStart == true){//set 1
      //stop dropping gunpowder
      gunPowderStart = false;
      //pull down lever animation
      this.tileset.setTileId(11,20,0,72);
      this.detonateAnimation();


      //unlock wires
      this.tileset.setTileId(11,18,0,49);
      //turn off electric gates
      electricity = false;
      electricAnimationCounter = 0;
      this.tileset.setTileId(444,0,0,1);
      this.tileset.setTileId(445,0,0,1);
      this.tileset.setTileId(446,0,0,1);
      this.tileset.setTileId(539,0,0,1);
      this.tileset.setTileId(507,0,0,1);
      this.tileset.setTileId(475,0,0,1);
      this.tileset.setTileId(571,0,0,1);
      this.tileset.setTileId(603,0,0,1);
      this.tileset.setTileId(638,0,0,1);
      this.tileset.setTileId(637,0,0,1);
      this.tileset.setTileId(636,0,0,1);
    }
  }

  clearField(){
    for(var i = 0; i < 750; i++){
      //clears gunPowder
      if(this.tileset.getTile(i, 0).id == 66){
        this.tileset.setTileId(i,0,0,1);
      }
      //clears wires
      if(this.tileset.getTile(i, 0).id == 50){
        this.tileset.setTileId(i,0,0,1);
      }
    }
  }

  electricityAnimations(){
    //electric animations
  if(electricity == true){electricAnimationCounter++;}
  if(electricity == true){
  if(electricAnimationCounter < 10){
  this.tileset.setTileId(444,0,0,53);
  this.tileset.setTileId(445,0,0,53);
  this.tileset.setTileId(446,0,0,53);
  this.tileset.setTileId(539,0,0,56);
  this.tileset.setTileId(507,0,0,56);
  this.tileset.setTileId(475,0,0,56);
  this.tileset.setTileId(571,0,0,56);
  this.tileset.setTileId(603,0,0,56);
  this.tileset.setTileId(638,0,0,53);
  this.tileset.setTileId(637,0,0,53);
  this.tileset.setTileId(636,0,0,53);
}
 if(electricAnimationCounter > 10){
  this.tileset.setTileId(444,0,0,52);
  this.tileset.setTileId(445,0,0,52);
  this.tileset.setTileId(446,0,0,52);
  this.tileset.setTileId(539,0,0,55);
  this.tileset.setTileId(507,0,0,55);
  this.tileset.setTileId(475,0,0,55);
  this.tileset.setTileId(571,0,0,55);
  this.tileset.setTileId(603,0,0,55);
  this.tileset.setTileId(638,0,0,52);
  this.tileset.setTileId(637,0,0,52);
  this.tileset.setTileId(636,0,0,52);
  }
   if(electricAnimationCounter > 20){
    this.tileset.setTileId(444,0,0,53);
    this.tileset.setTileId(445,0,0,53);
    this.tileset.setTileId(446,0,0,53);
    this.tileset.setTileId(539,0,0,56);
    this.tileset.setTileId(507,0,0,56);
    this.tileset.setTileId(475,0,0,56);
    this.tileset.setTileId(571,0,0,56);
    this.tileset.setTileId(603,0,0,56);
    this.tileset.setTileId(638,0,0,52);
    this.tileset.setTileId(637,0,0,53);
    this.tileset.setTileId(636,0,0,53);
    electricAnimationCounter = 0;
  }
}
}

detonateAnimation(){
  for(var i = 300; i < 750; i++){
    //initial blast
    if(this.tileset.getTile(i, 0).id == 66){
      this.tileset.setTileId(i,0,0,36);
    }
    if(this.tileset.getTile(i, 0).id == 68){
      this.tileset.setTileId(i,0,0,1);
    }
    if(this.tileset.getTile(i, 0).id == 69){
      this.tileset.setTileId(i,0,0,1);
    }
    if(this.tileset.getTile(i, 0).id == 48){
      this.tileset.setTileId(i,0,0,54);
    }

    if(this.tileset.getTile(i, 0).id == 36){
      this.tileset.setTileId(i,0,0,1);
    }
}


}

getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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
