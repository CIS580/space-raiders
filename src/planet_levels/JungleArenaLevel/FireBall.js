/**
 * Class for the projectiles that the enemies fire in the jungle arena level
 */
export default class FireBall{

    /**
     * create a fireball at the given startx and starty that is directed toward the given targetx and targety
     */
    constructor(startx, starty, targetx, targety) {
        this.x = startx;
        this.y = starty;

        var dx = (targetx - startx);
        var dy = (targety - starty);
        var mag = Math.sqrt(dx * dx + dy * dy);

        this.velocityX = (dx / mag) * 1;
        this.velocityY = (dy / mag) * 1;
        this.reflected = false;
      
    }

    /** @method
     * Set reflected to true and reverse the direction of the projectile
     */
    reflect() {
      this.reflected = true;
      this.velocityX = this.velocityX*(-1);
      this.velocityY = this.velocityY*(-1);
    }
  
    /** @method
     * Update the projectile's position, projectile moves faster if it has been reflected
     * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame
     * @param {PlanetPlayer} player - representation of the player
     */
    update(elaspedTime, player) {
      if(!this.reflected){
        this.x += this.velocityX * 0.10;
        this.y += this.velocityY * 0.10;
      }
      else{
        this.x += this.velocityX * 0.50;
        this.y += this.velocityY * 0.50;
      }
      
    }
  
    /** @method
     * Render the projectile, color depends on whether it has been reflected or not
     * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
     * @param {CanvasRenderingContext2D} context - the rendering context
     */
    render(elapsedTime, context) {
        if(!this.reflected){
            context.fillStyle = "#ff7cc4";
        }
        else{
            context.fillStyle = "#70e4ff";
        }
        context.beginPath();
        context.arc(this.x * 32 + 16, this.y * 32 + 16, 16, 0, 2*Math.PI);
        context.fill();  
    }
  }