import Input from './input';
import StartScreen from './menus/start-screen';

/** @class Game
  * A class representing the high-level functionality
  * of a game - the game loop, buffer swapping, etc.
  */
export default class Game {
  /** @constructor
    * Creates the game instance
    * @param {integer} width - the width of the game screen in pixels
    * @param {integer} heght - the height of the game screen in pixels
    */
  constructor(width, height) {
    this._start = null;
    this.WIDTH = width;
    this.HEIGHT = height;

    // Set up the back buffer
    this.backBuffer = document.createElement('canvas');
    this.backBuffer.width = this.WIDTH;
    this.backBuffer.height = this.HEIGHT;
    this.backBufferCtx = this.backBuffer.getContext('2d');

    // Set up the screen buffer
    this.screenBuffer = document.createElement('canvas');
    this.screenBuffer.width = this.WIDTH;
    this.screenBuffer.height = this.HEIGHT;
    this.screenBufferCtx = this.screenBuffer.getContext('2d');
    document.body.append(this.screenBuffer);

    // Set up the input object
    this.input = new Input();

    // Set up the game state stack
    this.gameState = []
    this.gameState.push(new StartScreen());
  }
  /** @method pushGameState
    * Pushes the provided game state to the
    * state stack.
    * @param {GameState} gameState - an object that
    * implements an update() and render() method.
    */
  pushGameState(gameState) {
    this.gameState.push(gameState);
  }
  /** @method popGameState
    * Pops the current game state from the state stack.
    * @return {GameState} the popped game state object
    */
  popGameState() {
    return this.gameState.pop();
  }
  /** @method update
    * Updates the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  update(elapsedTime) {
    // Update the active game state
    this.gameState[this.gameState.length - 1].update(elapsedTime, this.input, this);

    // Update the input object
    this.input.update();
  }
  /** @method render
    * Renders the game state
    * @param {integer} elapsedTime - the number of milliseconds per frame
    */
  render(elapsedTime) {
    // Clear the back buffer
    this.backBufferCtx.fillStyle = "#000";
    this.backBufferCtx.fillRect(0,0,this.WIDTH, this.HEIGHT);

    // Render the game state
    this.gameState[this.gameState.length - 1].render(elapsedTime, this.backBufferCtx, this);

    // Flip the back buffer
    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);
  }
  /** @method loop
    * Updates and renders the game,
    * and calls itself on the next draw cycle.
    * @param {DOMHighResTimestamp} timestamp - the current system time
    */
  loop(timestamp) {
    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;
    this.update(elapsedTime);
    this.render(elapsedTime);
    this._frame_start = timestamp;
    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
  }
}
