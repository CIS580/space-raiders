import { AnimatedTextSettings } from "../utils/animatedText";

/**
 * @class GameState
 *
 * Represents the abstract game state
 */
export class GameState {

    /**
     * Constructs base game state
     *
     * @param {Encounter} encounter - encounter parent object
     * @param {Game} game - reference to the upper-most game object
     */
    constructor(encounter, game) {
        this.encounter = encounter;
        this.game = game;

        this.settings = new AnimatedTextSettings();
    }

    /**
     * Renders content of the encounter game state to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    render(elapsedTime, context, game) {
        throw new TypeError('State ' + this.constructor.name + ' should override the \'render\' function');
    }

    /**
     * Updates the encounter game state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    update(elapsedTime, input, game) {
        throw new TypeError('State ' + this.constructor.name + ' should override the \'update\' function');
    }
}
