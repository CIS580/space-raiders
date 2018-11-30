import PlanetPlayer from "../PlanetPlayer";

/**
 * Manages a planet level and provides scrolling functionality.
 * Changes to this class will affect every other planet level.
 */
export default class PlanetLevelManager {

  /**
   * Create a new manager to work with the given level.
   * Typically should be called like:
   *   new PlanetLevelManager(new SamplePlanetLevel());
   * @param level - The level to manager and call render/update functions for.
   */
  constructor(level) {
    this.finished = false;

    this.level = level;
    this.player = new PlanetPlayer(this.level);
    this.lastCalculatedTilemapWidth = 0;
    this.lastCalculatedTilemapHeight = 0;

    this.scrollingXOffset = 0;
    this.scrollingYOffset = 0;

    this.scrollingCanvas = document.createElement('canvas');
    this.scrollingCanvas.width = this.level.tileset.width * 32;
    this.scrollingCanvas.height = this.level.tileset.height * 32;
    this.scrollingContext = this.scrollingCanvas.getContext('2d');
  }

  /**
   * Get the active level.
   * Used externally.
   * @returns {BasePlanetLevel} An extension of the BasePlanetLevel representing the current custom planet level.
   */
  getLevel() {
    return this.level;
  }

  /**
   * Get the icon (treasure token) for the current level.
   * Used externally.
   * @returns {Image} Drawable image.
   */
  getLevelIcon() {
    return this.level.icon;
  }

  /**
   * Get the name of the current level.
   * Used externally.
   * @returns {string}
   */
  getLevelName() {
    return this.level.name;
  }

  /**
   * Check whether or not the current level is finished.
   * Used externally.
   * Typically rendering and updating of this manager should stop once this is true.
   * @returns {boolean} True if finished, false if the player is still playing.
   */
  levelFinished() {
    return this.finished;
  }

  /**
   * Check whether or not the player succeeded in gaining the treasure for this active level.
   * Used externally.
   * Typically this should only be checked once levelFinished() is true.
   * @returns {boolean} True if success, false if failure (no treasure).
   */
  playerSucceeded() {
    return this.level.success;
  }

  /** @method
   * Updates the active level and any calculations necessary for tileset scrolling.
   * @param {DOMHighResTimeStamp} elaspedTime - The amount of time elapsed this frame.
   * @param {Input} input - The input from this and the prior frame.
   * @param {Game} game - The game object.
   */
  update(elaspedTime, input, game) {
    if(this.level.finished) {
      this.finished = true;
    } else {
      this.level.update(elaspedTime, input, game, this.player);

      // Check if we need to update our scrolling information based on a change in tilemap.
      if(this.lastCalculatedTilemapWidth !== this.level.tileset.width ||
          this.lastCalculatedTilemapHeight !== this.level.tileset.height) {

        this.lastCalculatedTilemapWidth = this.level.tileset.width;
        this.lastCalculatedTilemapHeight = this.level.tileset.height;

        // Edges which, if the player is within, the map must scroll.
        this.leftEdge = game.WIDTH / (32 * 2);
        this.topEdge = game.HEIGHT / (32 * 2);
        this.rightEdge = this.lastCalculatedTilemapWidth - (this.leftEdge);
        this.bottomEdge = this.lastCalculatedTilemapHeight - (this.topEdge);

        // Actual dimensions that we'll be drawing. Either the dim of the canvas or the tilemap dim, whichever is smaller.
        this.drawingWidth = Math.min(game.WIDTH, this.lastCalculatedTilemapWidth * 32);
        this.drawingHeight = Math.min(game.HEIGHT, this.lastCalculatedTilemapHeight * 32);

        // Update the scrolling canvas with the new width and height.
        this.scrollingCanvas.width = this.lastCalculatedTilemapWidth * 32;
        this.scrollingCanvas.height = this.lastCalculatedTilemapHeight * 32;

        // If the new tilemap is smaller, we want to avoid drawing old data.
        this.scrollingContext.clearRect(0, 0, this.scrollingCanvas.width, this.scrollingCanvas.height);
      }

      // Check if we need to scroll x dimension.
      if(this.lastCalculatedTilemapWidth > game.GRID_WIDTH && this.player.x > this.leftEdge) {
        if(this.player.x < this.rightEdge) {
          this.scrollingXOffset = (this.player.x - this.leftEdge) * 32;
        } else {
          this.scrollingXOffset = (this.rightEdge - this.leftEdge) * 32;
        }
      } else {
        this.scrollingXOffset = 0;
      }

      // Check if we need to scroll y dimension.
      if(this.lastCalculatedTilemapHeight > game.GRID_HEIGHT && this.player.y > this.topEdge) {
        if(this.player.y < this.bottomEdge) {
          this.scrollingYOffset = (this.player.y - this.topEdge) * 32;
        } else {
          this.scrollingYOffset = (this.bottomEdge - this.topEdge) * 32;
        }
      } else {
        this.scrollingYOffset = 0;
      }
    }
  }

  /** @method
   * Renders the active level and manages tileset scrolling within the scene.
   * @param {DOMHighResTimeStamp} elapsedTime - The amount of time elapsed this frame.
   * @param {CanvasRenderingContext2D} context - The rendering context.
   */
  render(elapsedTime, context) {
    if(!this.finished) {
      this.level.render(elapsedTime, this.scrollingContext, this.player);

      context.drawImage(
        this.scrollingCanvas,
        this.scrollingXOffset,
        this.scrollingYOffset,
        this.drawingWidth,
        this.drawingHeight,
        0,
        0,
        this.drawingWidth,
        this.drawingHeight);
    }
  }
}