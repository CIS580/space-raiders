/**
 * Base level class used to provide basic functionality and structure for each level.
 * This class could be customized, but you should typically put any level-specific functionality in your own copy of the
 * sample planet level.
 *
 * ** Modification to this class may affect all other planet levels. **
 *
 * Each planet should extend this class, and call the super() function to call this constructor.
 */
export default class BasePlanetLevel {

  /**
   * Should be called by the extending levels when constructed using the super() call.
   * Might overwrite some customization if it is not the first call in the planet's constructor.
   */
  constructor() {
    this.finished = false;
    this.success = false;

    this.playerSpawnX = 1;
    this.playerSpawnY = 1;
    this.playerSpawnFaceDirection = 1;

    this.tileset = undefined;
    this.icon = new Image(32, 32);
    this.name = "Base Planet Level";
  }

  /** @method
   * Called when the player interacts with a tile.
   * @param player Representation of the player.
   * @param x X grid coordinate of the interacted tile (in front of player).
   * @param y Y grid coordinate of the interacted tile (in front of player).
   */
  playerInteracted(player, x, y) {}

  /**
   * Called when the player moves.
   * @param player Representation of the player.
   */
  playerMoved(player) {}

  /**
   * Called when the player fires a weapon.
   * @param player Representation of the player.
   * @param x X grid coordinate of the tile the player fires into (in front of player).
   * @param y Y grid coordinate of the tile the player fires into (in front of player).
   */
  playerFired(player, x, y) {}

  /**
   * Called when the player attempts to move into tile at the given coordinates.
   * @param x The X coordinate of the attempted move.
   * @param y The Y coordinate of the attempted move.
   * @return True if the player may pass, false if the requested tile is "blocked".
   */
  tilePassable(x, y) {}

  /** @method
   * Update any entities within this planet level, including the player.
   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame
   * @param {Input} input - the input from this and the prior frame
   * @param {Game} game - the game object
   * @param {PlanetPlayer} player - representation of the player
   */
  update(elaspedTime, input, game, player) {}

  /** @method
   * Render the tileset, the player, and any other custom entities to the provided context.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   * @param {PlanetPlayer} player - representation of the player
   */
  render(elapsedTime, context, player) {}

  /** @method
   * Draw text using the static context (after scrolling).
   * Only use this for drawing items on top of the screen.
   * @param staticContext - The context to draw on top of the screen and scrolling elements.
   */
  renderStatic(elapsedTime, staticContext, player) {}
}