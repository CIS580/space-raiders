/** Name of the image used for the background */
import AssetLoader from "./utils/assetLoader";
import Vector from "./utils/vector";
import PlayerShip from "./objects/realization/playerShip";
import AsteroidCreator from "./objects/realization/asteroid";
import Barrel from "./objects/realization/barrel";
import Duck from "./objects/realization/duck";
import MyMath from "./utils/myMath";
import BlackHole from "./objects/realization/blackHole";
import EnemyShip, {EnemyType} from "./objects/realization/enemyShip";
import LoopHole from "./objects/realization/loopHole";
import WinHole from "./objects/realization/winHole";
import Forcefield from "./objects/realization/forcefield";

/** Name of the image used for the background */
const BACKGROUND_IMAGE = 'spaceBackground/starBackground';
const STAR_SMALL_IMAGE = 'spaceBackground/starSmall';
const STAR_BIG_IMAGE = 'spaceBackground/starBig';
const PLANET_IMAGE_PREFIX = 'spaceBackground/planet-';

/** Size of the force field */
const FORCE_FIELD_SIZE = 50;


/* private */ class Decision {

    constructor() { // TODO if level replay, generate it the same way
        this.yesDecision = null;
        this.noDecision = null;

        this.yesApply = () => {};
        this.noApply = () => {};

        this.decisionIsTrue = () => {
            return Generator.nextRandom() < 0.5;
        };

        this.decide = () => {
            if (this.decisionIsTrue()) {
                this.yesApply();
                return this.yesDecision;
            } else {
                this.noApply();
                return this.noDecision;
            }
        }
    }
}

/* private */ function lambdifyDecision(decision, returnTo) {
    let lambda = new Decision();

    lambda.decide = () => {
        let res = decision.decide();

        if (res == null) {
            return returnTo;
        } else {
            return lambdifyDecision(res, returnTo);
        }
    };

    return lambda;
}

/* private */ class SequenceDecision extends Decision {

    constructor() {
        super();

        this.sequence = [];
        this.next = null;

        this.decide = () => {
            if (this.sequence.length === 0) {
                return this.next;
            } else {
                let result = new SequenceDecision();
                result.sequence = this.sequence;
                result.next = this.next;

                return lambdifyDecision(result.sequence.splice(0, 1)[0], result);
            }
        }
    }

}

export default class Generator {

    constructor(encounter) { // TODO if level replay, generate it the same way
        this.encounter = encounter;
        this.gameTime = 0;
        // TODO reset deterministic random

        this.decisionTree = this.prepareDecisionTree()
    }

    prepareDecisionTree() {
        this.enemyCount = 0;

        // Shortcuts
        let encounter = this.encounter;

        let root = new SequenceDecision();

        let barrelD = new Decision();
        barrelD.yesDecision = barrelD;
        barrelD.yesApply = () => {
            encounter.addObject(
                new Barrel(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height))
            );
            console.log("[INFO] Adding barrel")
        };
        barrelD.decisionIsTrue = () => { return Generator.nextRandom() < 0.8 };
        root.sequence.push(barrelD);

        let asteroidD = new Decision();
        asteroidD.yesDecision = asteroidD;
        asteroidD.yesApply = () => {
            encounter.addObject(
                AsteroidCreator.createAsteroid(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height), MyMath.randomBetween(30, 80))
            );
            console.log("[INFO] Adding asteroid")
        };
        asteroidD.decisionIsTrue = () => { return Generator.nextRandom() < 0.6 };
        root.sequence.push(asteroidD);

        let asteroidShowerD = new Decision();
        asteroidShowerD.yesDecision = asteroidShowerD;
        asteroidShowerD.yesApply = () => {
            let asteroids = AsteroidCreator.createPointAsteroidShower(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height), MyMath.randomBetween(2, 10), Generator.nextRandom() * Math.PI * 2)
            asteroids.forEach(object => encounter.addObject(object));
            console.log("[INFO] Adding asteroid shower")
        };
        asteroidShowerD.decisionIsTrue = () => { return Generator.nextRandom() < 0.5 };
        root.sequence.push(asteroidShowerD);

        let blackHoleD = new Decision();
        blackHoleD.yesDecision = blackHoleD;
        blackHoleD.yesApply = () => {
            encounter.addObject(
                new BlackHole(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height))
            );
            console.log("[INFO] Adding BH")
        };
        blackHoleD.decisionIsTrue = () => { return Generator.nextRandom() < 0.6 };
        root.sequence.push(blackHoleD);

        let loopHoleD = new Decision();
        loopHoleD.yesDecision = loopHoleD;
        loopHoleD.yesApply = () => {
            encounter.addObject(
                new LoopHole(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height))
            );
            console.log("[INFO] Adding LH")
        };
        loopHoleD.decisionIsTrue = () => { return Generator.nextRandom() < 0.4 };
        root.sequence.push(loopHoleD);

        let duckD = new Decision();
        duckD.yesDecision = duckD;
        duckD.yesApply = () => {
            encounter.addObject(
                new Duck(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height))
            );
            console.log("[INFO] Adding duck")
        };
        duckD.decisionIsTrue = () => { return Generator.nextRandom() < 0.6 };
        root.sequence.push(duckD);

        let duckSquadD = new Decision();
        duckSquadD.yesDecision = duckSquadD;
        duckSquadD.yesApply = () => {
            let pos = new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height);
            for (let x = 0; x < 10; x ++) {
                for (let y = 0; y < 2; y ++) {
                    encounter.addObject(
                        new Duck(encounter, Vector.add(pos, new Vector(x * 40, y * 40)))
                    );
                }
            }

            console.log("[INFO] Adding duck squad")
        };
        duckSquadD.decisionIsTrue = () => { return Generator.nextRandom() < 0.6 };
        root.sequence.push(duckSquadD);

        let moreEnemiesD = new Decision();
        moreEnemiesD.yesDecision = moreEnemiesD;
        moreEnemiesD.yesApply = () => {
            let eType = EnemyType.SHIP;
            if (Generator.nextRandom() < 0.3) eType = EnemyType.UFO;
            encounter.addObject(
                new EnemyShip(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height), eType)
            );
            this.enemyCount ++;

            console.log("[INFO] Adding enemy ship")
        };
        moreEnemiesD.decisionIsTrue = () => { return Generator.nextRandom() < 0.3 };

        let firstEnemyD = new Decision();
        firstEnemyD.yesDecision = moreEnemiesD;
        firstEnemyD.yesApply = () => {
            let eType = EnemyType.SHIP;
            if (Generator.nextRandom() < 0.3) eType = EnemyType.UFO;
            encounter.addObject(
                new EnemyShip(encounter, new Vector(Generator.nextRandom() * encounter.width, Generator.nextRandom() * encounter.height), eType)
            );
            this.enemyCount ++;

            console.log("[INFO] Adding enemy ship")
        };
        firstEnemyD.decisionIsTrue = () => { return Generator.nextRandom() < 0.7 };
        root.sequence.push(firstEnemyD);


        // Sequence for each [object]
        //    Want more [object]
        //       Yes? - crate [object]; goto Want more [object]
        //       No? - continue




        return root;
    }

    /**
     * Initializes the encounter
     */
    initialize() {
        let encounter = this.encounter;

        encounter.playerShip = new PlayerShip(encounter, new Vector(encounter.width / 2, encounter.height / 2));
        encounter.addObject(encounter.playerShip);
        encounter.camera.bindTo(encounter.playerShip);

        encounter.addObject(new Forcefield(encounter, new Vector(encounter.width / 2.0, 0), encounter.width, FORCE_FIELD_SIZE));
        encounter.addObject(new Forcefield(encounter, new Vector(encounter.width / 2.0, encounter.height), encounter.width, FORCE_FIELD_SIZE));
        encounter.addObject(new Forcefield(encounter, new Vector(0, encounter.height / 2.0), FORCE_FIELD_SIZE, encounter.height));
        encounter.addObject(new Forcefield(encounter, new Vector(encounter.width, encounter.height / 2.0), FORCE_FIELD_SIZE, encounter.height));

        let next = this.decisionTree;
        while (next !== null) {
            next = next.decide();
        }
        // encounter.addObject(new BlackHole(this.encounter, new Vector(encounter.width / 2, encounter.height / 2 + 100)))
    }

    /* private */ createLayer() {
        let buffer = document.createElement('canvas');
        buffer.width = this.encounter.width;
        buffer.height = this.encounter.height;

        return buffer;
    }
    /**
     * Prepares the background image
     */
    prepareBackground() {
        let encounter = this.encounter;

        let buffer = this.createLayer();
        let ctx = buffer.getContext('2d');

        let backgroundImage = AssetLoader.getAsset(BACKGROUND_IMAGE);
        let starSmallImage = AssetLoader.getAsset(STAR_SMALL_IMAGE);
        let starBigImage = AssetLoader.getAsset(STAR_BIG_IMAGE);
        let imageWidth = backgroundImage.width;
        let imageHeight = backgroundImage.height;

        for (let x = 0; x < encounter.width; x += imageWidth) {
            for (let y = 0; y < encounter.height; y += imageHeight) {
                ctx.drawImage(backgroundImage, x, y, imageWidth, imageHeight);
            }
        }


        encounter.camera.addLayer(buffer, 0.2, new Vector(0, 0));
        for (let i = 0; i < 7; i ++) {
            let starBuffer = this.createLayer();
            let starCtx = starBuffer.getContext('2d');
            starCtx.globalAlpha = 0.7;

            let amount = Math.sqrt(encounter.width * encounter.height) / 40;
            for (let j = 0; j < amount; j++) {
                let star = starSmallImage;
                if (Generator.nextRandom() < 0.5) star = starBigImage;
                let x = Generator.nextRandom() * encounter.width;
                let y = Generator.nextRandom() * encounter.height;

                starCtx.drawImage(star, x, y);
            }

            if (i < 6) {
                starCtx.globalAlpha = 1;
                if (Generator.nextRandom() < 0.5) {
                    let planet = AssetLoader.getAsset(PLANET_IMAGE_PREFIX + (Math.floor(Generator.nextRandom() * 12) + 1));
                    let size = Generator.nextRandom() * 500 + 250;
                    let x = Generator.nextRandom() * encounter.width;
                    let y = Generator.nextRandom() * encounter.height;

                    starCtx.drawImage(planet, x - size / 2, y - size / 2, size, size);
                }
            }


            encounter.camera.addLayer(starBuffer, 0.5 + i / 12.0, new Vector(0, 0));
        }
    }

    onObjectDestroyed(object) {
        if (object === this.encounter.playerShip) {
            this.encounter.lose();
        } else if (object instanceof EnemyShip) {
            this.enemyCount --;
        }
    }


    update(delta) {
        this.gameTime += delta;

        if (this.gameTime >= 15 * 1000 && this.enemyCount === 0) {
            if (!this.winReady) {
                this.winReady = true;
                this.encounter.addObject(new WinHole(this.encounter, new Vector(Generator.nextRandom() * this.encounter.width, Generator.nextRandom() * this.encounter.height)))
                console.log("[INFO] Spawning win thingy")
            }
        } else {
            this.winReady = false;
        }

        // TODO keep adding things like asteroids
    }

    // Shouldnt be static, no time
    static nextRandom() {
        // TODO deterministic random
        return Math.random();
    }
}