/** Name of the image used for the background */
import AssetLoader from "./utils/assetLoader";
import Camera from "./utils/camera";
import CollisionHandler from "./objects/pattern/collisionHandler";
import Vector from "./utils/vector";
import PlayerShip from "./objects/realization/playerShip";
import AsteroidCreator from "./objects/realization/asteroid";
import Barrel from "./objects/realization/barrel";
import Duck from "./objects/realization/duck";

/** Name of the image used for the background */
const BACKGROUND_IMAGE = 'spaceBackground/starBackground';
const STAR_SMALL_IMAGE = 'spaceBackground/starSmall';
const STAR_BIG_IMAGE = 'spaceBackground/starBig';
const PLANET_IMAGE_PREFIX = 'spaceBackground/planet-';


export default class Generator {

    /**
     * Constructs base encounter
     *
     * @param {Game} game - reference to the base game object
     * @param {Number} width - width of the encounter map
     * @param {Number} height - height of the encounter map
     */
    constructor(encounter) {
        this.encounter = encounter;
        this.gameTime = 0;
        // TODO reset deterministic random
    }

    /**
     * Initializes the encounter
     */
    initialize() {
        this.playerShip = new PlayerShip(this, new Vector(this.width / 2, this.height / 2));
        this.addObject(this.playerShip);
        this.encounter.camera.bindTo(this.playerShip);


        // AsteroidCreator.createLineAsteroidShower(
        //     this,
        //     new Vector(this.width / 2 - 350, this.height / 2 + 100),
        //     20,
        //     90,
        //     true
        //     ).forEach(asteroid => this.addObject(asteroid));
        //
        //
        // let barrelSpacing = 80;
        // for (let i = 0; i < 5; i++) {
        //     this.addObject(new Barrel(this, new Vector(this.width / 2 - 2 * barrelSpacing + i * barrelSpacing, this.height / 2 + 2 * barrelSpacing)))
        // }

        let spawnPos = new Vector(this.width / 2 - 600, this.height / 2 - 30);
        for (let x = 0; x < 10; x ++) {
            for (let y = 0; y < 2; y++) {
                this.addObject(new Duck(this, new Vector(spawnPos.x + x * 30, spawnPos.y + y * 30)))
            }
        }
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
        for (let i = 0; i < 7; i ++) {
            let starBuffer = this.createLayer();
            let starCtx = starBuffer.getContext('2d');
            starCtx.globalAlpha = 0.7;

            let amount = Math.sqrt(this.width * this.height) / 40;
            for (let j = 0; j < amount; j++) {
                let star = starSmallImage;
                if (Generator.nextRandom() < 0.5) star = starBigImage;
                let x = Generator.nextRandom() * this.width;
                let y = Generator.nextRandom() * this.height;

                starCtx.drawImage(star, x, y);
            }

            if (i < 6) {
                starCtx.globalAlpha = 1;
                if (Generator.nextRandom() < 0.5) {
                    let planet = AssetLoader.getAsset(PLANET_IMAGE_PREFIX + (Math.floor(Generator.nextRandom() * 12) + 1));
                    let size = Generator.nextRandom() * 500 + 250;
                    let x = Generator.nextRandom() * this.width;
                    let y = Generator.nextRandom() * this.height;

                    starCtx.drawImage(planet, x - size / 2, y - size / 2, size, size);
                }
            }


            this.camera.addLayer(starBuffer, 0.5 + i / 12.0, new Vector(0, 0));
        }
    }

    onObjectDestroyed(object) {
        if (object !== this.encounter.playerShip) {
            this.encounter.loose();
        }
    }


    update(delta) {
        this.gameTime += delta;
        this.encounter.win();
        this.encounter.loose();
    }

    // Shouldnt be, no time
    static nextRandom() {
        // TODO deterministic random
        return Math.random();
    }
}