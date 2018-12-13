import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";
import Scorpion from "./Scorpion";
import Crab from "./Crab";

/**
 * DesertCastleLevel which extends the base planet class functionality.
 *
 * Final Level of the Desert Planet.
 */
export default class DesertCastleMap extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 16;
    this.playerSpawnY = 10;
    this.playerSpawnFaceDirection = 1;

    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      "../dist/resources/planet_tilesets/DesertCastleLevel/dss.json",
      "../dist/resources/planet_tilesets/DesertCastleLevel/desert-castle.json",
      "../dist/resources/planet_tilesets/DesertCastleLevel/dss.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Desert Castle";

    //TO DISPLAY TEXT ADD THIS TO YOUR CLASS
    //You'll have changes in playerInteracted, tilePassable, and renderStatic.
    //MAKE SURE YOU GET THEM ALL 
    //If you need more reference, feel free to look at the implementation in LizardJungleLevel
    this.message = [];
    this.message.push('starting text');
    //push each line individually
    //you'll have to check if something goes off the screen and adjust for that by breaking
    //it into multiple push statements
	
	//spawn enemies
	this.scorpions = [];
	this.crabs = [];
	this.spawnEnemies(context)
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    console.log("Player interacted with " + x + "," + y);

    //This code handles interacting with things and properly clearing the box
    //I would suggest copying this exactly and then changing the if to whatever you need
      let message;
      message = '';
    if (x == 5) {
      message = "wow!";
    }
    if (this.message.length !== 0 && message !== '') this.message.length = 0;
    else if (message === '') {
      this.message.length = 0;
    }
    else this.message.push(message);
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
    if (this.message.length > 0) return false; //Add this line so you can't move when the text box is there
    return this.tileset.getTile(x, y)["passable"] === true;
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
        for (let i = 0; i < this.message.length; i++) {
          staticContext.fillText(this.message[i], 60, 630+40*i);
        }
        staticContext.font = '18px Arial';
        staticContext.fillText('Press F to continue', 800, 730);
      }
      else {
        staticContext.fillStyle = 'transparent';
      }
    }
	
	/** @method
	 *  Spawn all the enemies
	 */
	spawnEnemies(context) {
		// spawn the scorpions
      let xLocs;
      xLocs = [6, 24, 15, 7, 24];
      let yLocs;
      yLocs = [8, 9, 0, -14, -14];
        let i;
        for (i = 0; i < xLocs.length; i++) {
			let scorpion = new Scorpion(xLocs[i], yLocs[i], false, this);
			this.scorpions.push(scorpion);
			//scorpion.render(elapsedTime, context);
		}
		// spawn the crabs
        let xCrab = [8, 23];
		let yCrab = [-18, -19];
        let j;
        for (j = 0; j < xCrab.length; j++) {
			let crab = new Crab(xCrab[j], yCrab[j], 2, this);
			this.crabs.push(crab);
			//crab.render(elapsedTime, context);
		}
	}
  }
