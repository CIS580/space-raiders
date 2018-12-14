import crab from './crab.json'

/**
  * CrabPerson entity class
  */
export default class Crab {
	constructor(x, y, health, DesertCastleMap) {
		this.image = new Image();
		//this.img.src = "../../../planet_levels/DesertCastleLevel/crab.png";
		//this.animationDuration = 150;
		//this.animationMsPerImage = 100;
		
		this.crabJson = crab;
		
		this.x = x;
		this.y = y;
		this.health = health;
		this.DesertCastleMap = DesertCastleMap;
	}
	
	/** 
	 * update the crab's location
	 */
	update() {
		// generate a random direction to move
		let rd = Math.floor(Math.random() * 4);
		if (rd === 0) {
			// move up
			if (this.DesertCastleMap.tilePassable(this.x,this.y-1)) {
				this.move(this.x, this.y-32);
				// change sprite
			}
		} else if (rd === 3) {
			//move right
			if (this.DesertCastleMap.tilePassable(this.x+1,this.y)) {
				this.move(this.x+32,this.y);
				
			}
		} else if (rd === 2) {
			//move down
			if (this.DesertCastleMap.tilePassable(this.x,this.y+1)) {
				this.move(this.x,this.y+32);
			}
		} else if (rd === 1) {
			// move left
			if (this.DesertCastleMap.tilePassable(this.x-1,this.y)) {
				this.move(this.x-32,this.y);
			}
		}
		//this.render(img, x, y);
	}
	
	/** 
	 * Render the crab
	 */
	render(elapsedTime, context) {
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