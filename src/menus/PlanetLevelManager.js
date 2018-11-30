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
      // TODO scrolling logic
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
      // TODO scrolling render
      context.drawImage(this.scrollingCanvas, 0, 0);
    }
  }
}