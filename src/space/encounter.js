/** Name of the image used for the background */
import AssetLoader from "./utils/assetLoader";
import Camera from "./utils/camera";
import CollisionHandler from "./objects/pattern/collisionHandler";
import Vector from "./utils/vector";
import PlayerShip from "./objects/realization/playerShip";
import AsteroidCreator from "./objects/realization/asteroid";

/** Name of the image used for the background */
const BACKGROUND_IMAGE = 'spaceBackground/starBackground';
const STAR_SMALL_IMAGE = 'spaceBackground/starSmall';
const STAR_BIG_IMAGE = 'spaceBackground/starBig';
const PLANET_IMAGE_PREFIX = 'spaceBackground/planet-';

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
        this.gameObjects = [];
        this.markedForDeletion = [];
        this.markedForInsertion = [];

        this.width = Math.max(width, game.WIDTH);
        this.height = Math.max(height, game.HEIGHT);

        this.camera = new Camera(new Vector(this.width, this.height), new Vector(game.WIDTH, game.HEIGHT));
        this.prepareBackground();
        this.initialize();
    }

    /**
     * Initializes the encounter
     */
    initialize() {
        // TODO: Prepare game objects and win conditions

        this.playerShip = new PlayerShip(this, new Vector(this.width / 2, this.height / 2));
        this.addObject(this.playerShip);

        this.camera.bindTo(this.playerShip);

        AsteroidCreator.createLineAsteroidShower(
            this,
            new Vector(this.width / 2 - 350, this.height / 2 + 100),
            20,
            90,
            true
            ).forEach(asteroid => this.addObject(asteroid))
    }

    /* private */ createLayer() {
        let buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;

        return buffer;
    }

    /**
     * Prepares the background image
     */
    prepareBackground() {
        let buffer = this.createLayer();
        let ctx = buffer.getContext('2d');

        let backgroundImage = AssetLoader.getAsset(BACKGROUND_IMAGE);
        let starSmallImage = AssetLoader.getAsset(STAR_SMALL_IMAGE);
        let starBigImage = AssetLoader.getAsset(STAR_BIG_IMAGE);
        let imageWidth = backgroundImage.width;
        let imageHeight = backgroundImage.height;

        for (let x = 0; x < this.width; x += imageWidth) {
            for (let y = 0; y < this.height; y += imageHeight) {
                ctx.drawImage(backgroundImage, x, y, imageWidth, imageHeight);
            }
        }


        this.camera.addLayer(buffer, 0.2, new Vector(0, 0));
        for (let i = 0; i < 3; i ++) {
            let starBuffer = this.createLayer();
            let starCtx = starBuffer.getContext('2d');
            starCtx.globalAlpha = 0.7;

            let amount = Math.sqrt(this.width * this.height) / 20;
            for (let j = 0; j < amount; j++) {
                let star = starSmallImage;
                if (Math.random() < 0.5) star = starBigImage;
                let x = Math.random() * this.width;
                let y = Math.random() * this.height;

                starCtx.drawImage(star, x, y);
            }

            if (i < 2) {
                amount = Math.floor(Math.random() * 3);
                starCtx.globalAlpha = 1;
                for (let j = 0; j < amount; j++) {
                    let planet = AssetLoader.getAsset(PLANET_IMAGE_PREFIX + (Math.floor(Math.random() * 12) + 1));
                    let size = Math.random() * 500 + 250;
                    let x = Math.random() * this.width;
                    let y = Math.random() * this.height;

                    starCtx.drawImage(planet, x - size / 2, y - size / 2, size, size);
                }
            }


            this.camera.addLayer(starBuffer, 0.5 + i / 4.0, new Vector(0, 0));
        }
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
        let col1 = object.areColliding(other);
        let col2 = other.areColliding(object);
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
        // Postpone removing of objects to make sure we are not accessing gameObjects array while iterating trough it
        if (object !== undefined && object !== null) this.markedForDeletion.push(object);
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
        this.gameObjects.forEach(object => {
            object.update(elapsedTime, input);

            if (
                object.position.x < -object.radius - SAFE_EXIT_MARGIN ||
                this.width + object.radius + SAFE_EXIT_MARGIN < object.position.x ||
                object.position.y < -object.radius - SAFE_EXIT_MARGIN ||
                this.height + object.radius + SAFE_EXIT_MARGIN < object.position.y
            ) {
                this.removeObject(object);
            }

        });
        this.handleCollisions();

        this.camera.update(elapsedTime);

        this.markedForDeletion.forEach(object => this.gameObjects.splice(this.gameObjects.indexOf(object), 1));
        this.markedForDeletion = [];
        this.markedForInsertion.forEach(object => this.gameObjects.push(object));
        this.markedForInsertion.forEach(object => object.initialize());
        this.markedForInsertion = [];
    }

    /**
     * Renders content of the encounter to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     * @param {Game} game - reference to the upper-most game object
     */
    render(elapsedTime, context, game) {
        // TODO: Add additional rendering

        context.save();
        this.camera.render(context);
        this.gameObjects.forEach(object => object.render(elapsedTime, context));
        context.restore();

        if (this.playerShip) {
            context.font = "20px Georgia";
            context.fillText("Health: " + this.playerShip.health, 10, 35);
            context.fillText("Shields: " + Math.round(this.playerShip.shieldHealth), game.WIDTH - 110, 35);
        }
    }
}