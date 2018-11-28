
/** @module Input
  * A class for handling input from the user
  * will work for all keys on the keyboard
  */
export default class Input {
  /** @constructor
    * Constructs a new instance of the Input class
    * and attaches event listeners to the window.
    */
  constructor() {
    this.oldState = {}
    this.newState = {}

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.newState[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.newState[event.key] = false;
    });

  }

  /** @method update
    * Copies the new state to the old state
    */
  update() {
    this.oldState = JSON.parse(JSON.stringify(this.newState));
  }

  /** @method keyPressed
    * Returns true if the specified key is
    * currently pressed.
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyPressed(key) {
    return this.newState[key];
  }

  /** @method keyDown
    * Returns true if the specified key
    * went down this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyDown(key) {
    return this.newState[key] && !this.oldState[key];
  }

  /** @method keyUp
    * Returns true if the specified key
    * went up this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyUp(key) {
    return !this.newState[key] && this.oldState[key];
  }
}
