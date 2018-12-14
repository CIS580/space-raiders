import { AnimatedText, TextPathNode } from "../utils/animatedText";
import { GameState } from "./gameState";
import Vector from "../utils/vector";

/**
 * @class LoseState
 *
 * Represents the lose state of the game
 */
export default class LoseState extends GameState {

    /**
     * Constructs lose state
     *
     * @param {Encounter} encounter - encounter parent object
     * @param {Game} game - reference to the upper-most game object
     */
    constructor(encounter, game) {
        super(encounter, game);

        this.timer = this.settings.subTextDelay + this.settings.textDuration + this.settings.fadeOutDuration;
        this.texts = this.prepareTexts(game.WIDTH, game.HEIGHT);

        this.encounter.camera.moveTo(new Vector(encounter.width / 2, encounter.height / 2), this.timer);
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

        context.save();
        this.texts.forEach(text => {
            text.render(context);
        });

        context.restore();
    }

    /**
     * Updates the encounter game state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    update(elapsedTime, input, game) {
        if (this.timer >= 0) {
            this.encounter.updateEncounter(elapsedTime, input, game);
            this.texts.forEach(text => {
                text.update()
            });

            this.timer -= 1;
        } else {
            this.encounter.onPlayerReady();
        }
    }

    /**
     * Prepares the texts, which should be shown
     *
     * @param {Number} screenWidth - width of screen
     * @param {Number} screenHeight - height of screen
     */
    prepareTexts(screenWidth, screenHeight) {
        let s = this.settings;
        let textY = screenHeight / 2.0 + s.textVerticalOffset;
        let subTextY = textY + s.textVerticalSpacing;

        let levelText = new AnimatedText("YOU DIED!", s.textFont, s.textColor, s.textAlignment, textY, [
            new TextPathNode(screenWidth * (s.leftEdge - s.offset), 0),
            new TextPathNode(screenWidth * s.middlePointStart, s.appearanceDelay),
            new TextPathNode(screenWidth * (s.middlePointStart + s.drift), s.driftDelay),
            new TextPathNode(screenWidth * (s.rightEdge + s.offset), s.disappearanceDelay)
        ])

        let readyText = new AnimatedText("Traveling back in time ...", s.subTextFont, s.textColor, s.textAlignment, subTextY, [
            new TextPathNode(screenWidth * (s.leftEdge - s.offset), 0),
            new TextPathNode(screenWidth * (s.leftEdge - s.offset), s.subTextDelay),
            new TextPathNode(screenWidth * s.middlePointStart, s.appearanceDelay),
            new TextPathNode(screenWidth * (s.middlePointStart + s.drift), s.driftDelay),
            new TextPathNode(screenWidth * (s.rightEdge + s.offset), s.disappearanceDelay)
        ])

        return [levelText, readyText]
    }
}
