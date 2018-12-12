import AssetLoader from "../../utils/assetLoader";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import Explosion, {LAST_IMAGE_SUFFIX} from "./explosion";

/** Name of active barrel asset */
const BARREL_ACTIVE_ASSET_NAME = "barrel";

/** Name of the inactvie barrel asset */
const BARREL_INACTIVE_ASSET_NAME = "barrel_inactive";

/** Time in ms after the barrel become active */
const BARREL_COOLDOWN = 3000;

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
        super(encounter, Type.EXPLOSIVE, BARREL_ACTIVATE_RADIUS, position, AssetLoader.getAsset(BARREL_INACTIVE_ASSET_NAME));
        this.health = BARREL_HEALTH;
        this.killable = false;
        this.cooldown = BARREL_COOLDOWN
        this.inactive = true;
    }

    /**
     * Updates the encounter object state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     */
    update(elapsedTime, input) {
        if (this.cooldown > 0) {
            this.cooldown = this.cooldown - elapsedTime;
        } else if (this.inactive)  {
            this.killable = true;
            this.asset = AssetLoader.getAsset(BARREL_ACTIVE_ASSET_NAME);
            this.inactive = false;
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
        this.superRender(elapsedTime, context);
    }

    /**
     * Handle of hit barrel by another object
     * Explosion will be created after decreasing health under zero
     * @param amount - health to be decreased
     */
    hit(amount) {
        if (!this.killable) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.encounter.addObject(new Explosion(this.encounter, new Vector(this.position.x, this.position.y)));
            this.encounter.removeObject(this);
        }
    }
}