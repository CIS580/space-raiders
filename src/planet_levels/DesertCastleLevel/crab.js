/**
  * CrabPerson entity class
  */
export default class Crab {
	constructor(x, y, health) {
		this.img.src = "crab.png";
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
			if (tilePassable(x,y-32)) {
				move(x, y-32);
				// change sprite
			}
		} else if (rd == 1) {
			//move right
			if (tilePassable(x+32,y)) {
				move(x+32,y);
				
			}
		} else if (rd == 2) {
			//move down
			if (tilePassable(x,y+32)) {
				move(x,y+32);
			}
		} else if (rd == 3) {
			// move left
			if (tilePassable(x-32,y) {
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