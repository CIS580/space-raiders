import AssetLoader from "../../utils/assetLoader";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";

/** Name of the first explosion asset */
const EXPLOSION_ASSET_NAME = "expl_08/expl_08_00";

/** Collision radius that removes hp*/
const EXPLOSION_ACTIVATE_RADIUS = 100.0;

/** Time that defines the image persistence */
const IMAGE_TIME = 50;

/** Index of the image indicating end of explosion */
export const LAST_IMAGE_SUFFIX = 31;

/**Damage per image */
export const EXPLOSION_DAMAGE = 1;

export default class Explosion extends EncounterObject {

    /**
     * Constructs player-controlled spaceship
     *
     * @param {Encounter} encounter - reference to encounter this object belongs t
     * @param {Vector} position - position of this object
     */
    constructor(encounter, position) {
        super(encounter, Type.EXPLOSION, EXPLOSION_ACTIVATE_RADIUS, position, AssetLoader.getAsset(EXPLOSION_ASSET_NAME + 0));
        this.asset_suffix = 1;
        this.timeSinceLastImage = 0;
    }

    /**
     * Updates the encounter object state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     */
    update(elapsedTime, input) {
        if (this.asset_suffix === LAST_IMAGE_SUFFIX) {
            this.encounter.removeObject(this);
        }
        this.superUpdate(elapsedTime, input);
    }

    /**
     * Renders content of the encounter object to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     */
    render(elapsedTime, context) {
        this.timeSinceLastImage += elapsedTime;

        if (this.timeSinceLastImage > IMAGE_TIME) {
            this.asset = AssetLoader.getAsset(EXPLOSION_ASSET_NAME + this.asset_suffix);
            this.asset_suffix++;
            this.timeSinceLastImage = 0;
        }
        this.superRender(elapsedTime, context);
    }
}