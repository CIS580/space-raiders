
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
    this.oldState = {};
    this.newState = {};

    window.addEventListener('keydown', (event) => {
      if(event.key.length <= 1 || event.key.charAt(0) !== 'F') {
        event.preventDefault();
      }
      this.newState[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      if(event.key.length <= 1 || event.key.charAt(0) !== 'F') {
        event.preventDefault();
      }
      this.newState[event.key] = false;
    });

  }

  /** @method
    * Copies the new state to the old state
    */
  update() {
    this.oldState = JSON.parse(JSON.stringify(this.newState));
  }

  /** @method
    * Returns true if the specified key is
    * currently pressed.
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyPressed(key) {
    return this.newState[key];
  }

  /** @method
    * Returns true if the specified key
    * went down this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyDown(key) {
    return this.newState[key] && !this.oldState[key];
  }

  /** @method
    * Returns true if the specified key
    * went up this frame
    * @param {String} key - the key to test
    * @return {bool} if the key is pressed
    */
  keyUp(key) {
    return !this.newState[key] && this.oldState[key];
  }
}
