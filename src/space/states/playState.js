import { GameState } from "./gameState";

/**
 * @class PlayState
 *
 * Represents the play state of the game
 */
export default class PlayState extends GameState {

    /**
     * Constructs base play mode
     *
     * @param {Encounter} encounter - encounter parent object
     * @param {Game} game - reference to the upper-most game object
     */
    constructor(encounter, game) {
        super(encounter, game);
    }

    /**
     * Renders content of the encounter game state to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    render(elapsedTime, context, game) {
        this.encounter.renderGameObjects(elapsedTime, context, game);
        this.encounter.renderPlayerStats(context, game);
    }

    /**
     * Updates the encounter game state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    update(elapsedTime, input, game) {
        this.encounter.updateEncounter(elapsedTime, input, game);
    }
}
