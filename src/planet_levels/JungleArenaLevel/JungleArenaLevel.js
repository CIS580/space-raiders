import BasePlanetLevel from "../BasePlanetLevel";
import PlanetTileset from "../../PlanetTileset";
import ArenaEnemy from "./ArenaEnemy";

/**
 * Jungle Arena Level
 * Player has a shield that activates with the space bar
 * Objective is to defeat waves of enemies by reflecting their projectiles back at them
 * -Tyler Smith
 */
export default class JungleArenaLevel extends BasePlanetLevel {

  constructor() {
    super();

    this.playerSpawnX = 15;
    this.playerSpawnY = 20;
    this.playerSpawnFaceDirection = 1;
    this.shieldActivated = false;
    this.shieldTime = 0;
    this.shieldRecharging = false;
    this.shieldRechargeTime = 0;
    this.enemyCount = 2;
    this.currentwave = 1;
    this.waves = 5;
    this.activeEnemies = [];
    this.loadingEnemies = false;
    this.gameover = '';

    //Treasure Info
    this.spritesheet = new Image();
    this.success = false;
    this.spritesheet.src = "resources/planet_tilesets/jungle_arena_level/jungletileset.png";
    this.treasureSprite = {
        image: this.spritesheet,
        sx: 5 * 32,
        sy: 64,
        x: 15,
        y: 6
      };
    
    //First 2 enemies always spawn in same place
    this.activeEnemies.push(new ArenaEnemy(11,4));
    this.activeEnemies.push(new ArenaEnemy(20,4));

    // Load Tileset
    this.tileset = new PlanetTileset(
      require("../../../dist/resources/planet_tilesets/jungle_arena_level/jungletileset.json"),
      require("../../../dist/resources/planet_tilesets/jungle_arena_level/tilemap.json"),
      "resources/planet_tilesets/jungle_arena_level/jungletileset.png");

    this.icon = new Image(32, 32);  // Could be taken from your tileset, this is just a sample blank image.
    this.name = "Jungle Arena Level";
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {
    if(x === this.treasureSprite.x && y === this.treasureSprite.y){
      this.success = true;
    }
  }

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {
  }

  /**
   * Called when the player fires a weapon.
   * @param player Representation of the player.
   * @param x X grid coordinate of the tile the player fires into (in front of player).
   * @param y Y grid coordinate of the tile the player fires into (in front of player).
   */
  playerFired(player, x, y) {
    
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
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {Input} input - the input from this and the prior frame
   * @param {Game} game - the game object
   * @param {PlanetPlayer} player - representation of the player
   */
  update(elapsedTime, input, game, player) {
      player.update(elapsedTime, input, game);
      if(input.keyUp(' ') && !this.shieldRecharging){
        this.shieldRecharging = true;
        this.shieldRechargeTime = 0;
      }
      else if(input.keyDown(' ')){
        if(this.gameover === 'lose'){
          player.movePlayerToSpawn()
          this.enemyCount = 2;
          this.waves = 5;
          this.currentwave = 1
          this.activeEnemies = [];
          this.loadingEnemies = false;
          this.gameover = '';
          this.activeEnemies.push(new ArenaEnemy(11,4));
          this.activeEnemies.push(new ArenaEnemy(20,4));
        }
        else if(!this.shieldRecharging){
          this.shieldActivated = true;
          this.shieldTime += elapsedTime;
        }
      }
      else if(input.keyPressed(' ') && !this.shieldRecharging){
          this.shieldActivated = true;
          this.shieldTime += elapsedTime;
      }
      else{
        this.shieldActivated = false;
        this.shieldTime = 0;
      }
      if(this.shieldRecharging){
        this.shieldRechargeTime += elapsedTime;
        if(this.shieldRechargeTime > 1000){
          this.shieldRecharging = false;
          this.shieldRechargeTime = 0;
        }

      }

      //Update enemies or start next wave if they are all dead. Spawn treasure if all waves completed
      if(this.activeEnemies.length === 0 && !this.loadingEnemies){
        if(this.waves > 0){
          this.loadingEnemies = true;
          setTimeout(() => {
            this.waves--;
            this.currentwave++;
            this.enemyCount++;
            for(var i=0; i < this.enemyCount; i++){
              var randx = Math.round(Math.random() * (23 - 8) + 8);
              var randy = Math.round(Math.random() * (22 - 1) + 1);
              do{
                randx = Math.round(Math.random() * (23 - 8) + 8);
                randy = Math.round(Math.random() * (22 - 1) + 1);
              }
              while(randx === player.x && randy === player.y);
              this.activeEnemies.push(new ArenaEnemy(randx,randy));
            }
            this.loadingEnemies = false;      
          }, 3000);
        }
        else{
          this.gameover = 'win';
        }
      }
      else{
        this.activeEnemies.forEach((enemy, index) => {
            if(this.shieldActivated && this.shieldTime < 300){
              if(enemy.x === player.x || enemy.x === player.x + 1 || enemy.x === player.x - 1){
                if(enemy.y === player.y || enemy.y === player.y + 1 || enemy.y === player.y - 1){
                  enemy.dying = true;
                }
              }
            }
            if(enemy.dead){
              this.activeEnemies.splice(index, 1);
            }
            this.checkFireballCollision(enemy, player);
            enemy.update(elapsedTime, player, this.tileset, this.shieldTime);
        });
      }
    
  }

  /** @method
   * Checks if projectiles are colliding with the player or enemies if it has been reflected
   * @param {ArenaEnemy} currentenemy - the enemy who 'owns' the projectiles we are checking
   * @param {PlanetPlayer} player - representation of the player
   */
  checkFireballCollision(currentenemy, player){
    currentenemy.fireballs.forEach((fireball, index) => {
      var fireballXRounded = Math.round(fireball.x);
      var fireballYRounded = Math.round(fireball.y);
      if(fireball.reflected){
        this.activeEnemies.forEach((enemy, key) => {
          if(enemy.x === fireballXRounded && enemy.y === fireballYRounded ){
            enemy.dying = true;
          }
        });
      }
      else{
        if(player.x === fireballXRounded && player.y === fireballYRounded){
          this.gameover = 'lose';
        }
      }
      
    });
  }

  /** @method
   * Render the tileset, the player, and any other custom entities to the provided context.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   * @param {PlanetPlayer} player - representation of the player
   */
  render(elapsedTime, context, player) {
    if(this.gameover !== 'lose'){
      this.tileset.render(elapsedTime, context);
      player.render(elapsedTime, context);
  
      if(this.shieldActivated){
        if(this.shieldTime < 300){
          context.strokeStyle = "#70e4ff";
        }
        else{
          context.strokeStyle = "#ff7cc4";
        }
        context.beginPath();
        context.arc(player.x * 32 + 16, player.y * 32 + 16, 32, 0, 2*Math.PI);
        context.lineWidth=10;
        context.stroke();
      }
      this.activeEnemies.forEach(enemy => enemy.render(elapsedTime, context));

      if(this.gameover === 'win' && !this.success){
        context.drawImage(
          this.spritesheet,
          this.treasureSprite.sx, this.treasureSprite.sy, 32, 32,
          this.treasureSprite.x *32, this.treasureSprite.y*32, 32, 32
        );
      }
    }
    else{
      //show game over message
    }
    
    
    
  }
}