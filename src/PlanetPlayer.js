/**
 * Represents the player, including location.
 * Health functionality could be added here, as long as it doesn't conflict with other levels that might not use it.
 * The player is typically created and managed by the PlanetLevelManager, so avoid creating players in your own game.
 */
export default class PlanetPlayer {

  /**
   * Create the player for a specific level.
   * Loads the player animation images.
   * @param {BasePlanetLevel} level - The level this player belongs to.
   */
  constructor(level) {
    this.level = level;
    this.movePlayerToSpawn();

    this.imagesLoading = 2;
    this.playerJson = require('../dist/resources/planet_player/PlanetPlayer.json');

    // Load the tileset image.
    this.gunImage = new Image();
    this.noGunImage = new Image();

    this.gunImage.onload = (() => {
      this.imagesLoading--;
    });

    this.noGunImage.onload = (() => {
      this.imagesLoading--;
    });

    this.gunImage.src = "resources/planet_player/astrogun.png";
    this.noGunImage.src = "resources/planet_player/astroman.png";

    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.
    this.tileset = [];
    for(let i = 0; i < this.playerJson.tilecount; i++) {
      let properties = [];
      properties["id"] = i;
      properties["imageX"] = this.playerJson.spacing + ((i % this.playerJson.columns) * (32 + this.playerJson.margin));
      properties["imageY"] = this.playerJson.spacing + (Math.floor(i / this.playerJson.columns) * (32 + this.playerJson.margin));

      this.tileset[i] = properties;
    }
  }

  /**
   * Move the player to a specific location and direction.
   * @param x - New grid x position.
   * @param y - New grid y position.
   * @param direction - New face direction integer. If omitted, the face direction won't change.
   * Face direction key:
   *     N       0       -y
   *   W   E   1   3   -x  +x
   *     S       2       +y
   */
  movePlayer(x, y, direction) {
    this.x = x;
    this.y = y;
    if(direction !== undefined && direction !== null) {
      this.faceDirection = direction;
    }
    this.level.playerMoved(this);
  }

  /**
   * Move the player to the spawn location, as if it was killed and is re-spawning.
   */
  movePlayerToSpawn() {
    this.movePlayer(this.level.playerSpawnX, this.level.playerSpawnY, this.level.playerSpawnFaceDirection);
  }

  /** @method
   * Update logic related to player.
   * @param {DOMHighResTimeStamp} elaspedTime - The amount of time elapsed this frame.
   * @param {Input} input - The input from this and the prior frame.
   * @param {Game} game - The game object. Not currently used.
   */
  update(elaspedTime, input, game) {
    // TODO change to keypressed when animation locks in place (to allow hold down movement)
    let moveLeft = input.keyDown('ArrowLeft') || false;
    let moveRight = input.keyDown('ArrowRight') || false;
    let moveUp = input.keyDown('ArrowUp') || false;
    let moveDown = input.keyDown('ArrowDown') || false;
    let interact = input.keyDown('f') || false;
    let fire = input.keyDown(' ') || false;

    // If more than one button is pressed down, we won't move.
    // This is to prevent some uncertain movement when the player is spamming the keys.

    // Asks the level if the target tile is passable before moving there.
    // Face direction will change regardless if the tile is passable.
    if(moveLeft + moveRight + moveUp + moveDown === 1) {
      if(moveLeft) {
        if(this.level.tilePassable(this.x - 1, this.y)) {
          this.x--;
        }
        this.faceDirection = 1;
      } else if (moveRight) {
        if(this.level.tilePassable(this.x + 1, this.y)) {
          this.x++;
        }
        this.faceDirection = 3;
      } else if (moveUp) {
        if(this.level.tilePassable(this.x, this.y - 1)) {
          this.y--;
        }
        this.faceDirection = 0;
      } else if (moveDown) {
        if(this.level.tilePassable(this.x, this.y + 1)) {
          this.y++;
        }
        this.faceDirection = 2;
      }
      this.level.playerMoved(this);
    }

    if(interact) {
      if(this.faceDirection % 2 === 0) {  // Are we facing north or south?
        this.level.playerInteracted(this, this.x, this.y + (this.faceDirection - 1));
      } else {
        this.level.playerInteracted(this, this.x + (this.faceDirection - 2), this.y);
      }
    }

    if(fire) {
      if(this.faceDirection % 2 === 0) {  // Are we facing north or south?
        this.level.playerFired(this, this.x, this.y + (this.faceDirection - 1));
      } else {
        this.level.playerFired(this, this.x + (this.faceDirection - 2), this.y);
      }
    }
  }

  /** @method
   * Render the player.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - The amount of time elapsed this frame.
   * @param {CanvasRenderingContext2D} context - The rendering context.
   */
  render(elapsedTime, context, isHoldingGun) {
    if(isHoldingGun === undefined) {
      isHoldingGun = false;
    }

    let sourceImage;
    if(isHoldingGun) {
      sourceImage = this.gunImage;
    } else {
      sourceImage = this.noGunImage;
    }

    let imageY = (this.faceDirection + 2) % 4;
    let tile = this.tileset[imageY * 3];
    context.drawImage(
      sourceImage,
      tile["imageX"],                                           // X position within the image
      tile["imageY"],                                           // Y position within the image
      32,                                                       // Width of the tile within the image
      32,                                                       // Height of the tile within the image
      this.x * 32,                                              // X position within the rendered context
      this.y * 32,                                              // Y position within the rendered context
      32,                                                       // Width of the tile within the rendered context
      32);

    //TODO player drawing, animation, smooth relocation
  }
}