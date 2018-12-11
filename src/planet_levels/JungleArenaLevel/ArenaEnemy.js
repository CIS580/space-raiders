import FireBall from "./FireBall";

/**
 * Class for the enemies that are fought in the jungle arena
 */
export default class ArenaEnemy{

  /**
   * Create a new enemy at the given x and y position
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'S';
    this.fireballs = [];
    this.spritesheet = new Image();
    this.sprites = [];
    this.spawning = true;
    this.explosionX = 0;
    this.explosionY = 30;
    this.explosionIncreasing = true;
    this.alive = true;
    this.dying = false;
    this.dead = false
    this.spritesheet.src = "resources/planet_tilesets/jungle_arena_level/jungletileset.png";
    this.sprites.push({
        image: this.spritesheet,
        sx: 9 * 32,
        sy: 32
      });

    for(var i = 0; i < 3; i++) {
        var sprite = {
          image: this.spritesheet,
          sx: (i % 10) * 32,
          sy: 64
        }
        this.sprites.push(sprite);
      }
  }


  /** @method
   * Update the enemies: determine what direction to face, whether to fire or not, and update ellipse size for the spawn/death "explosion"
   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame
   * @param {tileset} tileset - the tileset
   * @param {PlanetPlayer} player - representation of the player
   * @param {number} shieldTime - the amount of time the player's shield has been active
   */
  update(elapsedTime, player, tileset, shieldTime) {
    if(this.spawning || this.dying){
        if(this.explosionIncreasing){
            if(this.explosionX >= 20){
                this.explosionIncreasing = false
            }
            else{
               this.explosionX += elapsedTime * 0.10; 
            }
        }
        else{
            this.explosionX -= elapsedTime * 0.10; 
            if(this.explosionX <= 10){
                this.spawning = false;
                if(this.dying){
                    this.dying = false;
                    this.dead = true;
                }
                this.explosionIncreasing = true;
                this.explosionX = 0;
            }
        }
    }
    else{
        var shootChance = Math.floor(Math.random() * 101);
        var xDiff = Math.abs(player.x - this.x);
        var yDiff = Math.abs(player.y - this.y);

        if(xDiff > yDiff && player.x < this.x){
            this.direction = "W";
        }
        else if(xDiff > yDiff && player.x > this.x){
            this.direction = "E";
        }
        else if(xDiff < yDiff && player.y < this.y){
            this.direction = "N";
        }
        else if(xDiff < yDiff && player.y > this.y){
            this.direction = "S";
        }
        if(shootChance >=99 && this.fireballs.length < 1){
            this.fireballs.push(new FireBall(this.x, this.y, player.x, player.y));
        } 
    }
    this.fireballs.forEach((fireball, index) => {
        var fireballXRounded = Math.round(fireball.x + fireball.velocityX * 0.25);
        var fireballYRounded = Math.round(fireball.y + fireball.velocityY * 0.25);
        if(!isNaN(fireballXRounded) && !isNaN(fireballYRounded)){
            if(tileset.getTile(fireballXRounded, fireballYRounded)["passable"] === false){
                this.fireballs.splice(index, 1);
            }
            else{
                if(shieldTime > 0){
                    if(fireballXRounded === player.x || fireballXRounded === player.x + 1 || fireballXRounded === player.x - 1){
                    if(fireballYRounded === player.y || fireballYRounded === player.y + 1 || fireballYRounded === player.y - 1){
                        if(shieldTime < 300){
                            fireball.reflect();
                        }
                        else{
                            this.fireballs.splice(index, 1);
                        }
                    }
                    }
                }
                fireball.update(elapsedTime, player);
            }
        }
        
    });
  }

  /** @method
   * Render the enemy depending on the direction it should be facing and whether it is spawing/dying or not
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   */
  render(elapsedTime, context) {
    context.beginPath();
    if(this.spawning){
        context.fillStyle = "#ff7cc4";
        context.ellipse(this.x*32+15, this.y*32+10, this.explosionX, this.explosionY, 0, 0, 2 * Math.PI);
        context.fill();
    }
    else if(this.dying){
        context.fillStyle = "#70e4ff";
        context.ellipse(this.x*32, this.y*32, this.explosionX, this.explosionY, 0, 0, 2 * Math.PI);
        context.fill();
    }
    else{
        switch(this.direction) {
            case 'N':
                context.drawImage(
                  this.spritesheet,
                  this.sprites[3].sx, this.sprites[3].sy, 32, 32, 
                  this.x *32, this.y*32, 32, 32
                );
                break;
            case 'E':
                context.drawImage(
                  this.spritesheet,
                  this.sprites[1].sx, this.sprites[1].sy, 32, 32,
                  this.x *32, this.y*32, 32, 32 
                );
                break;
            case 'W':
                context.drawImage(
                  this.spritesheet,
                  this.sprites[0].sx, this.sprites[0].sy, 32, 32,
                  this.x *32, this.y*32, 32, 32
                );
                break;
            default:
                context.drawImage(
                  this.spritesheet,
                  this.sprites[2].sx, this.sprites[2].sy, 32, 32,
                  this.x *32, this.y*32, 32, 32
                );
          }
    }
    this.fireballs.forEach(fireball => fireball.render(elapsedTime, context));   
  }
}