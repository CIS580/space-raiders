import AssetLoader from "./utils/assetLoader";
import Camera from "./utils/camera";
import CollisionHandler from "./objects/pattern/collisionHandler";
import Vector from "./utils/vector";
import PlayerShip from "./objects/realization/playerShip";

/** Name of the image used for the background */
const BACKGROUND_IMAGE = 'starBackground';

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
        this.gameObjects = [];

        this.width = Math.max(width, game.WIDTH);
        this.height = Math.max(height, game.HEIGHT);

        this.camera = new Camera(game.WIDTH, game.HEIGHT, new Vector(0, 0));
        this.prepareBackground();
        this.initialize();
    }

    /**
     * Initializes the encounter
     */
    initialize() {
        // TODO: Prepare game objects and win conditions

        let playerShip = new PlayerShip(this, new Vector(this.width / 2, this.height / 2));
        this.gameObjects.push(playerShip);
        this.camera.bindTo(playerShip);
    }

    /**
     * Prepares the background image
     */
    prepareBackground() {
        this.backgroundBuffer = document.createElement('canvas');
        this.backgroundBuffer.width = this.width;
        this.backgroundBuffer.height = this.height;
        this.backgroundBufferCtx = this.backgroundBuffer.getContext('2d');

        let backgroundImage = AssetLoader.getAsset(BACKGROUND_IMAGE);
        let imageWidth = backgroundImage.width;
        let imageHeight = backgroundImage.height;

        for (let x = 0; x < this.width; x += imageWidth) {
            for (let y = 0; y < this.height; y += imageHeight) {
                this.backgroundBufferCtx.drawImage(backgroundImage, x, y, imageWidth, imageHeight);
            }
        }

        this.camera.addLayer(this.backgroundBuffer, 1.0, new Vector(0, 0));
    }

    /**
     * Checks, whether given game objects collided or not
     *
     * @param {GameObject} object One of the game objects to check
     * @param {GameObject} other The other game object to check
     * @returns True in case given game objects have collided, false otherwise
     */
    areColliding(object, other) {
        return object.areColliding(other) && other.areColliding(object);
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
     * Callback function for objects to report they died
     *
     * @param {EncounterObject} object - game object, which got destroyed
     */
    onObjectDestroyed(object) {
        // TODO: Check for win conditions
    }

    /**
     * Removes given object from game
     *
     * @param {EncounterObject} object - game object to be removed from game
     */
    removeObject(object) {
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
    }

    /**
     * Updates the encounter state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     * @param {Game} game - reference to the upper-most game object
     */
    update(elapsedTime, input, game) {
        // TODO: Add additional updating

        this.gameObjects.forEach(object => {
            if (!object.initialized) {
                object.initialize();
                object.initialized = true;
            }
        });
        this.gameObjects.forEach(object => object.update(elapsedTime, input));
        this.handleCollisions();

        this.camera.update(elapsedTime);
    }

    /**
     * Renders content of the encounter to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    render(elapsedTime, context, game) {
        this.gameObjects.forEach(object => {
            if (!object.initialized) {
                object.initialize();
                object.initialized = true;
            }
        });

        // TODO: Add additional rendering

        this.camera.render(context);
        this.gameObjects.forEach(object => object.render && object.render(elapsedTime, context));
    }
}