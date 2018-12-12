import AssetLoader from "../../utils/assetLoader";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import Explosion,{LAST_IMAGE_SUFFIX} from "./explosion";

/** Name of base bomb asset */
const BARREL_ASSET_NAME = "barrel";

/** Collision radius that activates the bomb*/
const BARREL_ACTIVATE_RADIUS = 10.0;

/** Barrel health */
const BARREL_HEALTH = Math.round(LAST_IMAGE_SUFFIX * 0.7);

export default class Barrel extends EncounterObject {

    /**
     * Constructs player-controlled spaceship
     *
     * @param {Encounter} encounter - reference to encounter this object belongs t
     * @param {Vector} position - position of this object
     */
    constructor(encounter, position) {
        super(encounter, Type.EXPLOSIVE, BARREL_ACTIVATE_RADIUS, position, AssetLoader.getAsset(BARREL_ASSET_NAME));
        this.health = BARREL_HEALTH;
        this.killable = true;
    }

    /**
     * Updates the encounter object state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     */
    update(elapsedTime, input) {
        this.superUpdate(elapsedTime, input);
    }

    /**
     * Renders content of the encounter object to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     */
    render(elapsedTime, context) {
        this.superRender(elapsedTime, context);
    }

    /**
     * Handle of hit barrel by another object
     * Explosion will be created after decreasing health under zero
     * @param amount - health to be decreased
     */
    hit(amount){
        this.health -= amount;
        if (this.health <= 0) {
            this.encounter.addObject(new Explosion(this.encounter, new Vector(this.position.x, this.position.y)));
            this.encounter.removeObject(this);
        }
    }
}