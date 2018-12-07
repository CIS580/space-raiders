/**
  * Represents the Scorpion entity,
  * which moves left and right
  */
export default class Scorpion {
	/** 
	 * Creates a Scorpion object
	 * @param {float} x represent's the scorpion's x-coordinate
	 * @param {float} y represent's the scorpion's y-coordinate
	 * @param {boolean} facingLeft - true if sprite is facing left, false if not
	 */
	constructor(x, y, facingLeft) {
		this.img = new Image();
		this.img.src = "scorpionRight.png";
		this.x = x;
		this.x0 = x;
		this.y = y;
		this.facingLeft = facingLeft;
	}
	
	/** 
	 * updates the scorpion's position
	 * @param {double} deltaT - the elapsed time
	 */
	update(deltaT) {
		if (this.facingLeft) {		
			if ((this.x < this.x0 - 3) || !(tilePassable(this.x,this.y))) {
				this.facingLeft != this.facingLeft;
				this.img.src = "scorpionRight.png";
			} else {
				this.x -= 1;
			}
		} else {
			if ((this.x > this.x0 + 3) || !(tilePassable(this.x,this.y))) {
				this.facingLeft != this.facingLeft;
				this.img.src = "scorpionLeft.png";
			} else {
				this.x += 1;
			}
		}
	}
	
	/**
	 * Render the object
	 * @param {double} deltaT - the elapsed time
	 * @param context - the screen the object is in
	 */
	render(deltaT, context) {
		context.drawImage(this.img, this.x, this.y);
	}
}