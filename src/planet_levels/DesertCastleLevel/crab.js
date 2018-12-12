import DesertPlanetLevel from "../planet_levels/DesertCastleLevel/DesertCastleMap";

/**
  * CrabPerson entity class
  */
export default class Crab extends DesertPlanetLevel {
	constructor(x, y, health) {
		this.img = new Image();
		this.img.src = "planet_levels/DesertCastleLevel/crab.png";
		this.animationDuration = 150;
		this.animationMsPerImage = 100;
		
		this.crabJson = require("crab.json");
		
		this.x = x;
		this.y = y;
		this.health = health;
	}
	
	/** 
	 * update the crab's location
	 */
	update(deltaT) {
		// generate a random direction to move
		rd = Math.floor(Math.random() * 4);
		if (rd == 0) {
			// move up
			if (DesertPlanetLevel.tilePassable(x,y-1)) {
				move(x, y-32);
				// change sprite
			}
		} else if (rd == 3) {
			//move right
			if (DesertPlanetLevel.tilePassable(x+1,y)) {
				move(x+32,y);
				
			}
		} else if (rd == 2) {
			//move down
			if (DesertPlanetLevel.tilePassable(x,y+1)) {
				move(x,y+32);
			}
		} else if (rd == 1) {
			// move left
			if (DesertPlanetLevel.tilePassable(x-1,y)) {
				move(x-32,y);
			}
		}
		this.render(img, x, y);
	}
	
	/** 
	 * Render the crab
	 */
	render(deltaT, context) {
		context.drawImage(this.img, this.x, this.y);
	}
	
	/**
	 * Move to the specified position
	 */
	move(x, y) {
		this.x = x;
		this.y = y;
	}
}