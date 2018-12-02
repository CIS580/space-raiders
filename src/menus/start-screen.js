/** @class StartScreen
  * A starting screen for the game.
  */
import PlanetLevelManager from "./PlanetLevelManager";
import SamplePlanetLevel from "../planet_levels/SamplePlanetLevel";
import Encounter from "../space/encounter";

export default class StartScreen {
  /** @method
    * Updates the starting screen
    * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame
    * @param {Input} input - the input from this and the prior frame
    * @param {Game} game - the game object
    */
  update(elaspedTime, input, game) {
    // TODO: Load inital game state object
    if(input.keyPressed(' ')) {
      game.pushGameState(new Encounter(game, 1024, 768));
    }
  }
  /** @method
    * Renders the starting screen.
    * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
    * @param {CanvasRenderingContext2D} context - the rendering context
    */
  render(elapsedTime, context) {
    context.save();
    context.fillStyle = 'white';
    context.font = '48pt Serif';
    context.fillText("Welcome to Space Raiders", 280, 200);
    context.font = '18pt Serif';
    context.fillText("Press [SPACE] to Begin", 500, 300);
    context.restore();
  }
}
