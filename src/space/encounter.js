import Camera from "./utils/camera";
import CollisionHandler from "./objects/pattern/collisionHandler";
import Vector from "./utils/vector";
import Generator from "./generator";
import PlayState from "./states/playState";
import EncounterObjectType from "./objects/pattern/encounterObjectType";
import WinState from "./states/winState";
import LoseState from "./states/loseState";

/** Safety margin object can be in when not in screen bounds, before they are removed */
const SAFE_EXIT_MARGIN = 30.0;

/**
 * @class Encounter
 *
 * Represents encounter scenario during movement on over-world map
 */
export default class Encounter {

    /**
     * Constructs base encounter
     *
     * @param {Game} game - reference to the base game object
     * @param {Number} width - width of the encounter map
     * @param {Number} height - height of the encounter map
     */
    constructor(game, width, height) {
        this.game = game;

        this.gameObjects = [];
        this.markedForDeletion = [];
        this.markedForInsertion = [];

        this.width = Math.max(width, game.WIDTH);
        this.height = Math.max(height, game.HEIGHT);

        this.camera = new Camera(new Vector(this.width, this.height), new Vector(game.WIDTH, game.HEIGHT));
        this.generator = new Generator(this);

        this.generator.prepareBackground();
        this.generator.initialize();

        this.isOver = false;
        this.state = new PlayState(this, game);
    }

    /**
     * Checks, whether given game objects collided or not
     *
     * @param {GameObject} object One of the game objects to check
     * @param {GameObject} other The other game object to check
     * @returns True in case given game objects have collided, false otherwise
     */
    areColliding(object, other) {
        //forcing both methods to be called, so AoE object can detect object leaving its radius
        let col1 = object.collidesWith(other);
        let col2 = other.collidesWith(object);
        return col1 && col2;
    }

    /**
     * Handles collision in between game objects
     */
    handleCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            let object = this.gameObjects[i];

            for (let j = i + 1; j < this.gameObjects.length; j++) {
                let other = this.gameObjects[j];

                if (this.areColliding(object, other)) {
                    CollisionHandler.handleCollision(object, other);
                }
            }
        }
    }

    /**
     * Adds new object to gameObjects
     *
     * @param {EncounterObject} object - game object to be added to game
     */
    addObject(object) {
        // Postpone adding of objects to make sure we are not accessing gameObjects array while iterating trough it
        if (object !== undefined && object !== null) this.markedForInsertion.push(object);
    }

    /**
     * Removes given object from game
     *
     * @param {EncounterObject} object - game object to be removed from game
     */
    removeObject(object) {
        // Postpone removing of objects to make sure we are not accessing gameObjects array while iterating trough it
        if (object !== undefined && object !== null) {
            this.markedForDeletion.push(object);
            this.generator.onObjectDestroyed(object);
        }
    }

    /**
     * Switches game to given game state
     *
     * @param {GameState} state - game state to switch to
     */
    switchState(state) {
        this.state = state;
    }

    /**
     * Callback function used to notify encounter that the player is ready to play
     */
    onPlayerReady() {
        this.generator = new Generator(this);
        this.generator.initialize();

        this.isOver = false;
        this.switchState(new PlayState(this));
    }

    /**
     * Callback function used to notify encounter that the player has met all win conditions
     */
    win() {
        if (!this.isOver) {
            this.isOver = true;

            this.clear();
            this.switchState(new WinState(this, this.game));
        }
    }

    /**
     * Callback function used to notify encounter that the player failed to complete the level
     */
    lose() {
        if (!this.isOver) {
            this.isOver = true;

            this.clear();
            this.switchState(new LoseState(this, this.game));
        }
    }

    /**
     * Clears all the game objects from the encounter except for player ship and the boundaries
     */
    clear() {
        this.gameObjects.forEach(object => {
            if (object.type !== EncounterObjectType.PLAYER_SHIP) {
                this.removeObject(object);
            }
        });
    }

    /**
     * Updates the content of this encounter
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    updateEncounter(elapsedTime, input, game) {
        this.gameObjects.forEach(object => {
            if (!object.initialized) {
                object.initialize();
                object.initialized = true;
            }
        });

        this.gameObjects.forEach(object => {
            object.update(elapsedTime, input);

            if (object.position.x < -object.radius - SAFE_EXIT_MARGIN
            || this.width + object.radius + SAFE_EXIT_MARGIN < object.position.x
            || object.position.y < -object.radius - SAFE_EXIT_MARGIN
            || this.height + object.radius + SAFE_EXIT_MARGIN < object.position.y) {
                this.removeObject(object);
            }
        });

        this.handleCollisions();

        this.generator.update(elapsedTime);
        this.camera.update(elapsedTime);

        this.markedForDeletion.forEach(object => this.gameObjects.splice(this.gameObjects.indexOf(object), 1));
        this.markedForDeletion = [];

        this.markedForInsertion.forEach(object => this.gameObjects.push(object));
        this.markedForInsertion.forEach(object => object.initialize());
        this.markedForInsertion = [];
    }

    /**
     * Renders the information of player stats to the game screen
     *
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    renderPlayerStats(context, game) {
        if (this.playerShip) {
            // TODO: Make fancier health and shields display

            context.font = "20px Georgia";
            context.fillText("Health: " + Math.round(this.playerShip.health), 10, 35);
            context.fillText("Shields: " + Math.round(this.playerShip.shieldHealth), game.WIDTH - 110, 35);
        }
    }

    /**
     * Renders game objects of this encounter to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    renderGameObjects(elapsedTime, context, game) {
        context.save();

        this.camera.render(context);
        this.gameObjects.forEach(object => object.render(elapsedTime, context));

        context.restore();
    }

    /**
     * Updates the encounter state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    update(elapsedTime, input, game) {
        this.state.update(elapsedTime, input, game);
    }

    /**
     * Renders content of the encounter to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    render(elapsedTime, context, game) {
        this.state.render(elapsedTime, context, game);
    }
}
