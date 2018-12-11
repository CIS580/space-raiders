import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";
import Bullet from "../../../dist/resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/Bullets";
import Entity from "../../../dist/resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/Entity";
import Altar from "../../../dist/resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/Altar";


//everything that is interactable is spwaned using this class not the tilemap. 

//Global Variables for Lava Planet
var bullets = [];
var altars = [];
var entities = [];
const colors = ["black","red","yellow","white","pink","brown"]

var timePassed = 0;
/**
 * Example SamplePlanetLevel which extends the base planet class functionality.
 * ** DO NOT MODIFY THIS CLASS. **
 *
 * To start your own planet, copy this file and rename the class to your own level name, then customize the various
 * methods to tailor it to your game.
 */
export default class LavaPlanetLevel extends BasePlanetLevel {

  /**
   * Called when the level is being created.
   * Be sure to call super() first (before anything else) to ensure the basic planet structure is in place.
   */
  constructor() {
    super();

    this.playerSpawnX = 3;
    this.playerSpawnY = 3;
    this.playerSpawnFaceDirection = 1;
    this.playerHealth = 1; 
    // This loads your own tileset created from Tiled.
    // You'll need the tileset.json, tilemap.json, and image.png. Look at the PlanetTileset class for more details.

    // First two arguments (tileset and tilemap) are relative to the current folder (wherever this file is).
    // Third argument (image) is relative to the dist folder.
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/tileset.json"),
      require("../../../dist/resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/tilemap.json"),
      "resources/planet_tilesets/LavaPlanetLevel/lava_planet_level/tiles.png");
    this.timePassed = 0;	
	this.GolemBulletTime = 0 ;
	this.VolcanoBulletTime = 0;
	
    this.spawnAltar();
	  
	  
    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Lava Planet Level";
     
    //TO DISPLAY TEXT ADD THIS TO YOUR CLASS
    //You'll have changes in playerInteracted, tilePassable, and renderStatic.
    //MAKE SURE YOU GET THEM ALL 
    //If you need more reference, feel free to look at the implementation in LizardJungleLevel
    this.message = [];
    this.message.push('Destroy all the Altars to get the Treasure, Altars are durable so dont give up');
	
    //push each line individually
    //you'll have to check if something goes off the screen and adjust for that by breaking
    //it into multiple push statements
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    console.log("Player interacted with " + x + "," + y);
   this.startNewGame(player);
    //This code handles interacting with things and properly clearing the box
    //I would suggest copying this exactly and then changing the if to whatever you need
    var message = '';
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
		switch(player.faceDirection)
	{
		case 0 : 
		bullets.push (new Bullet (player.x*32+16,player.y*32+16,"north",0.3,"magenta","player") ); 
		//bullets.push (new Bullet (Math.floor (player.x /32),Math.floor (player.y / 32),"north",0.3,"magenta","player") ); 
		break;
		case 1 : 
		 bullets.push (new Bullet (player.x*32+16,player.y*32+16,"west",0.3,"magenta","player") ); 
		break;
		case 2 :
		  bullets.push (new Bullet (player.x*32+16,player.y*32+16,"south",0.3,"magenta","player") ); 
		  break;
		  case 3 : 
		  bullets.push (new Bullet (player.x*32+16,player.y*32+16,"east",0.3,"magenta","player") ); 
		  break;
	}
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

  
// reset the game to back to the begining.     
   startNewGame(player){
	  altars = [];
	  bullets = [];
	  entities = [];
	  this.playerHealth = 1; 
	  this.spawnAltar();
	  player.movePlayerToSpawn();
  }
  
 
 
     /**
   * create all altars in game
   */
   spawnAltar (){
	   	altars.push(new Altar(5,2,this.tileset));
		altars.push(new Altar(17,5,this.tileset));
		altars.push(new Altar(29,29,this.tileset));
		altars.push(new Altar(10,28,this.tileset));
		altars.push(new Altar(2,29,this.tileset));
		altars.push(new Altar(23,29,this.tileset));
		altars.push(new Altar(13,3,this.tileset));
		altars.push(new Altar(17,5,this.tileset));
		altars.push(new Altar(25,2,this.tileset));
		altars.push(new Altar(29,2,this.tileset));
		altars.push(new Altar(16,20,this.tileset));
   }
  
 spwanGolems () {
	    entities.push(new Entity(12, 9 , this.tileset));
        entities.push(new Entity(10, 15, this.tileset));
        entities.push(new Entity(7, 23, this.tileset));
        entities.push(new Entity(24 , 13, this.tileset));	
  }
  
  VolcanoFired() {
	  //Volcano at 22,0 tile	  
	bullets.push (new Bullet (22*32+16,0*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (22*32+16,0*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (22*32+16,0*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (22*32+16,0*32+16,"east",0.1,"red","volcano") ); 
	//Volcano at 23,0 tile	  
	bullets.push (new Bullet (23*32+16,0*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (23*32+16,0*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (23*32+16,0*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (23*32+16,0*32+16,"east",0.1,"red","volcano") );
	//Volcano at 3,15 tile			
	bullets.push (new Bullet (3*32+16,15*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (3*32+16,15*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (3*32+16,15*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (3*32+16,15*32+16,"east",0.1,"red","volcano") ); 
	//Volcano at 18,26 tile	
	bullets.push (new Bullet (18*32+16,26*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (18*32+16,26*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (18*32+16,26*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (18*32+16,26*32+16,"east",0.1,"red","volcano") ); 
	//Volcano at 17,26 tile	
	bullets.push (new Bullet (17*32+16,26*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (17*32+16,26*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (17*32+16,26*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (17*32+16,26*32+16,"east",0.1,"red","volcano") ); 
	//Volcano at 4,15 tile	
	bullets.push (new Bullet (4*32+16,15*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (4*32+16,15*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (4*32+16,15*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (4*32+16,15*32+16,"east",0.1,"red","volcano") ); 
	//Volcano at 27 15 
	bullets.push (new Bullet (27*32+16,15*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (27*32+16,15*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (27*32+16,15*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (27*32+16,15*32+16,"east",0.1,"red","volcano") );
	//volcano at 28 16
	bullets.push (new Bullet (28*32+16,15*32+16,"south",0.1,"red","volcano") ); 
	bullets.push (new Bullet (28*32+16,15*32+16,"north",0.1,"red","volcano") ); 
	bullets.push (new Bullet (28*32+16,15*32+16,"west",0.1,"red","volcano") ); 
	bullets.push (new Bullet (28*32+16,15*32+16,"east",0.1,"red","volcano") );	  
  }
	    enemyFired () {				
	    entities.forEach(function(enemy){
			let colorRandom1  = Math.floor((Math.random() * 6) + 1);
		    let colorRandom2  = Math.floor((Math.random() * 6) + 1);
		    let colorRandom3  = Math.floor((Math.random() * 6) + 1);
			let colorRandom4  = Math.floor((Math.random() * 6) + 1);
		  bullets.push (new Bullet (enemy.x*32+16,enemy.y*32+16,"north",0.2,colors[colorRandom1],"enemy") ); 
		  bullets.push (new Bullet (enemy.x*32+16,enemy.y*32+16,"west" ,0.2,colors[colorRandom2],"enemy") ); 
		  bullets.push (new Bullet (enemy.x*32+16,enemy.y*32+16,"east" ,0.2,colors[colorRandom3],"enemy") );
          bullets.push (new Bullet (enemy.x*32+16,enemy.y*32+16,"south",0.2,colors[colorRandom4],"enemy") );		  
	  });
   }
  

  /** @method
   * Render the tileset, the player, and any other custom entities to the provided context.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   * @param {PlanetPlayer} player - representation of the player
   */
  render(elapsedTime, context, player){
   
    
  this.tileset.render(elapsedTime, context);
    player.render(elapsedTime, context);
		entities.forEach( function(entity){ entity.render(elapsedTime, context);});			// Draws entities on map other than player
		 	bullets.forEach(function(bullet){ 
		bullet.render(context); // render all the bullets
	});

	altars.forEach(function(altar){
		altar.render(context);
	});
	 
   if (altars.length == 0){
	      //entities.push();
		  this.tileset.drawTile(13,11,22,context);
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
    player.update(elaspedTime, input, game);
		timePassed += elaspedTime;										//used to track time between calls
	this.GolemBulletTime  += elaspedTime;
	this.VolcanoBulletTime += elaspedTime;
	if(timePassed >= 3750 && entities.length <= 10){				//Edit this to lower spawn time and increase/decrease limit of entities
  
        this.spwanGolems();		
		timePassed = 0 ;
	}	
	if (this.GolemBulletTime  >= 1500){
			this.enemyFired ();
			this.GolemBulletTime = 0 ;
	}
	if (this.VolcanoBulletTime >= 4500 ) {
		this.VolcanoFired ();	    
	}
	
			if ( this.VolcanoBulletTime >= 5500) {
			this.VolcanoFired ();
			this.VolcanoBulletTime = 0 ;
		}
	entities.forEach( function(entity){ entity.update(elaspedTime, player.x, player.y);});  //updates entities on level other than player
     
				 	bullets.forEach(function(bullet){
		bullet.update(elaspedTime); // update function for all the bullets
	});

	//a loop to check for collision for when player hit or get hit by bullets. 
	for ( var q = 0 ; q < bullets.length; q++ ) 
	{	
       if( bullets[q].owner=="player"){
		      //loop for checking with golems entities. 
			  for(var i =0; i < entities.length; i++ ) {		             
				   if(Math.floor( bullets[q].x /32)== entities[i].x && Math.floor ( bullets[q].y/32) == entities[i].y )
				   { 
			   	   bullets.splice(q,1);
			   entities.splice(i,1);			   
			   break;
			   }
			  }
              	if (bullets[q] == undefined ) { break;}	
				
				//loop for  altars checking. 
			  for(var i =0; i < altars.length; i++ ) {          
                if (altars[i].health == 0){ 
				altars.splice(i,1);
				this.playerHealth ++;
				break;
				}		  
				  else if(Math.floor( bullets[q].x /32) == altars[i].x && Math.floor ( bullets[q].y/32) == altars[i].y) 
				{
					   bullets.splice(q,1);	
					   altars[i].health -- ;
			        break;			   
			   }
	  }
		}
	
		else if (bullets[q].owner == "enemy" || bullets[q].owner == "volcano"){
			if ( Math.floor (bullets[q].x /32) == player.x && Math.floor(bullets[q].y /32 ) == player.y )
			{				
				this.playerHealth -= 1; 
				//console.log("player got hit, his current healh is : "+ this.playerHealth);
				bullets.splice(q,1);
				if (this.playerHealth <= 0) 
				{
				this.startNewGame(player);
				}
				}
			}
  } //end for collision checking 
	
	// loop for making bullets stays for short distance.
	   for (var i = 0 ; i < bullets.length; i ++ ) {	
	   if (bullets[i].owner == "player" ) {
		   if (bullets[i].travelDistance >= (5*32) ) {
			   bullets.splice(i,1);		
  			   
		   }
	   }
		  	   else if (bullets[i].owner == "enemy"  ) {
		   if (bullets[i].travelDistance >= (10*32) ) {
			   bullets.splice(i,1);			   
		   }
	   }
	   else if (bullets[i].owner == "volcano" ){
		     if (bullets[i].travelDistance >= (5*32) ) {
			   bullets.splice(i,1);			   
		   }
	   }
    }
	//winning check. 
	if(altars.length == 0 ){
		
		if(player.x == 13 && player.y == 11){
			this.success = true;
			this.finished = true;
			console.log("Win");
		}
	}
  }//update
	
	
	
	
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
          staticContext.fillText(this.message[i], 60, 630+40*i);
        }
        staticContext.font = '18px Arial';
        staticContext.fillText('Press F to continue', 800, 730);  
      }
      else {
        staticContext.fillStyle = 'transparent';
      }
	  		staticContext.fillStyle = 'white';
	  staticContext.font = '18px Arial';
	  staticContext.fillText('Heatlth: ' +this.playerHealth, 900, 750);
	  if (altars.length > 0 ) {  
	  staticContext.fillText('Remaining Altars: ' +altars.length, 50, 750);
	  }
	  else {
		  staticContext.fillText('Take the Treasure' , 50, 750);
	  }	
    }
  }
