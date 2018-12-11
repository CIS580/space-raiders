//import PlanetTileset from "../PlanetTileset";
/**
 *Bullet for Lava Stage Enemeis
 *Imported by the Lava stage 
 */
export default class Bullet{
/** @method
   * create an new enemy
   * @param {x} x position of the bullet.
   * @param {y} y position of the bullet.
   * @param {bulletSpeed} speed of the bullet
   * @param {direction} the direction  the bullet  travel at.
   */
  constructor(x,y,direction,speed,color,owner) {
    this.x= x;
	this.y=y;
	this.direction = direction;
	this.speed = speed;
	this.color=color;
	this.owner = owner;
	this.travelDistance = 0 ;
  }

 

 update (deltaT){
	  this.directionToMove (this.x,this.y,this.direction,deltaT);
      
 }
 
 //function to choose bullet direction when creating a new bullet
 directionToMove (x,y,dir,deltaT) {
	 if (dir === "east"){ 
	     this.x += deltaT* this.speed;
		 this.travelDistance += deltaT*this.speed;
		 }
	 else if (dir === "west"){ 
	 this.x -= deltaT* this.speed;
	 this.travelDistance += deltaT*this.speed;
	 }
     else if (dir === "north"){ 
	 this.y -= deltaT* this.speed;
	 this.travelDistance += deltaT*this.speed;
	 }
     else if (dir === "south"){ 
	 this.y += deltaT* this.speed;
	 this.travelDistance += deltaT*this.speed;
	 }
 }
 
 

	
	
 //context to draw
 render (context) {		
 
   context.fillStyle = this.color;
   context.beginPath();
   if (this.owner == "player"){
   context.fillRect(this.x,this.y,10,10);
   context.fill();
  }
   if ( this.owner == "enemy" ) {
	   context.fillRect(this.x,this.y,7,7);
       context.fill();
   }
  if ( this.owner == "volcano" ) {
   //ctx.beginPath();
  //ctx.fillStyle = 'magenta';
  //context.arc(this.x , this.y , 10, 10,0, 2 * Math.pi);
  //context.fill();
   context.fillRect(this.x,this.y,18,18);
   context.fill();
  }  
 }

}


