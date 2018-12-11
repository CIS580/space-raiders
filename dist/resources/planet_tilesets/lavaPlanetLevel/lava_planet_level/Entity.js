//Located in src folder 
import PlanetTileset from "../../../../../src/PlanetTileset";

//Global constant for reading in Directions for frames
const DIRECTIONS = ["Left", "Right", "Forward", "Backward"];

export default class Entity {
	
 /** Constructor to Entity
   * Creates a Entity
   * @param x_pos - x position of Entity (tile number, not pixel number)
   * @param y_pos - y position of Entity (tile number, not pixel number)
   * @param tileset - loaded tileset (defines each tile type), used to move on tiles
   */
	constructor(x_pos, y_pos, tileset){
		//coordinates
		this.x = x_pos;
		this.y = y_pos;	
		//tileset for map		
		this.tileset = tileset;	
		//loads and stores frames for animation
		this.images = {};
		this.loadImages();	
		//Information about currrent frame of Entity
		this.state = "Forward";
		this.frame = 0;
		this.cycleCount = 0;	
		this.time = 0;
	
	}
	
 /** @method
   * Update an entities within this planet level, including the player.
   * @param {DOMHighResTimeStamp} deltaT - the amount of time elapsed between last call
   * @param {int} player_x - player's x position on map
   * @param {int} player_y - player's y position on map
   */
	update(deltaT, player_x, player_y){		
		//NEED TO FIX, NOT READY
		
		
		this.time += deltaT;		
		if(this.time >= 750){	
			var entityMoved = false;
			var passableForward = this.tileset.getTile(this.x, this.y+1)["passable"]; 
			var passableBackward = this.tileset.getTile(this.x, this.y-1)["passable"];
			var passableLeft = this.tileset.getTile(this.x-1, this.y)["passable"];
			var passableRight = this.tileset.getTile(this.x+1, this.y)["passable"];
					
			if( player_x == this.x){			// same x 								
				if ((player_y - this.y) > 0 && passableForward) {
					this.y += 1;
					this.state = "Forward";
					entityMoved = true;
				} else if ((player_y - this.y) < 0 && passableBackward){
					this.y -= 1;
					this.state = "Backward";
					entityMoved = true;
				} else {
					if (passableRight) {
						this.x += 1;
						this.state = "Right";
						entityMoved = true;
					} else if (passableLeft){
						this.x -= 1;
						this.state = "Left";
						entityMoved = true;
					}
				}
				
			} else if (player_y == this.y) {	// same y		
				
				if ((player_x - this.x) > 0 && passableRight) {
					this.x += 1;
					this.state = "Right";
					entityMoved = true;
				} else if ((player_x - this.x) < 0 && passableLeft){
					this.x -= 1;
					this.state = "Left";
					entityMoved = true;
				} else {
					if (passableForward) {
						this.y += 1;
						this.state = "Forward";
						entityMoved = true;
					} else if (passableBackward){
						this.y -= 1;
						this.state = "Backward";
						entityMoved = true;
					}
				}
				
			} else {							// neither
				
				var diffX = Math.abs(player_x - this.x);
				var diffY = Math.abs(player_y - this.y);
				
				if (diffX < diffY){				
					
					if ((player_x - this.x) > 0 && passableRight) {
						this.x += 1;
						this.state = "Right";
						entityMoved = true;
					} else if ((player_x - this.x) < 0 && passableLeft){
						this.x -= 1;
						this.state = "Left";
						entityMoved = true;
					} 
					/*
					else {
						if ((player_y - this.y) > 0 && passableForward) {
							this.y += 1;
						} else if ((player_y - this.y) < 0 && passableBackward){
							this.y -= 1;
						}
					}
					*/
					
				} else {						
					
					if (((player_y - this.y) > 0 && passableForward) || this.stuck) {
						this.y += 1;
						this.state = "Forward";
						entityMoved = true;
					} else if ((player_y - this.y) < 0 && passableBackward){
						this.y -= 1;
						this.state = "Backward";
						entityMoved = true;
					} 
					/*
					else {
						if ((player_x - this.x) > 0 && passableRight){
							this.x -= 1;
						} else if ((player_x - this.x) < 0 && passableLeft){
							this.x += 1;
						}
					}
					*/
				}
			}				
			if( entityMoved && this.cycleCount >= 4 && ( this.frame != 0 || this.frame != 2 ) ) {
				this.frame += 1;
				this.frame = this.frame % 4;
				this.cycleCount = 0;
			}
			this.cycleCount++;
			this.time = 0;						
		}	
		
	}
	
 /** @method render
   * Renders the Entity.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} deltaT - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   */
	render(deltaT, context){
		var image = this.images[this.state][this.frame];
        context.drawImage(image, this.x*32, this.y*32);
	}		
	
  /** @method loadImages
	* Loads the animation frames for Entity an stores them in an Array of Images
	*/
	loadImages(){
        DIRECTIONS.forEach( direction => {this.images[direction] = []});
        for( var i = 0; i < 4; i++ ) {
            DIRECTIONS.forEach( direction => {this.images[direction].push( this.getFrame( direction, i))});
        }
    }
	
	/** @method getFrame
     * Retrieves frame of entity animation
     * @param {string} direction - direction of animation
     * @param {int} number - number of frame within the animation
     */
    getFrame(direction, number){
        var frame = new Image(32, 32);
		//"resources/planet_tilesets/lava_planet_level/tiles.png"	
        frame.src = "./resources/planet_tilesets/LavaPlanetLevel/lavaGolemAnimation/lavaGolem-" + direction + "-" + number +".png"; //change this path to location of animation folder for entity
        return frame;
    }
	
}