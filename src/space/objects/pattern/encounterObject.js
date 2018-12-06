import Vector from "../../utils/vector";

/** Safety margin object can be in when not in screen bounds, before they are removed */
const SAFE_EXIT_MARGIN = 10.0;

/** Factor to convert milisecond to seconds */
const MILISECOND_TO_SECOND_FACTOR = 1.0 / 1000.0;

/** Duration of destroy animation */
const DESTROY_DURATION = 400.0;

/**
 * @class EncounterObject
 *
 * Represents abstract game object which appears in encounter
 */
export default class EncounterObject {

    /**
     * Constructs base encounter object
     *
     * @param {Encounter} encounter - reference to encounter this object belongs to
     * @param {Number} type - type of encounter object
     * @param {Number} radius - radius of collider of this object
     * @param {Vector} position - position of this object
     * @param {Image} asset - asset to be used while rendering this object
     */
    constructor(encounter, type, radius, position, asset) {
        this.encounter = encounter;
        this.type = type;

        this.asset = asset;
        this.radius = radius;
        this.radiusScale = 1.0;

        this.position = position;
        this.velocity = new Vector(0, 0);

        this.angle = 0.0;
        this.angularVelocity = 0;

        this.destroyCounter = undefined;
    }

    /**
     * Starts the destroy animation
     */
    startDestroyAnimation() {
        this.destroyCounter = DESTROY_DURATION;
    }

    /**
     * Checks, whether the object has outside the encounter map on the left side
     *
     * @returns True in case object left the game map on the left side, false otherwise
     */
    isTooFarLeft() {
        return this.position.x < -this.radius - SAFE_EXIT_MARGIN;
    }

    /**
     * Checks, whether the object has outside the encounter map on the right side
     *
     * @returns True in case object left the game map on the right side, false otherwise
     */
    isTooFarRight() {
        return this.encounter.width + this.radius + SAFE_EXIT_MARGIN < this.position.x;
    }

    /**
     * Checks, whether the object has outside the encounter map on the top side
     *
     * @returns True in case object left the game map on the top side, false otherwise
     */
    isTooFarTop() {
        return this.position.y < -this.radius - SAFE_EXIT_MARGIN;
    }

    /**
     * Checks, whether the object has outside the encounter map on the bottom side
     *
     * @returns True in case object left the game map on the bottom side, false otherwise
     */
    isTooFarBottom() {
        return this.encounter.height + this.radius + SAFE_EXIT_MARGIN < this.position.y;
    }

    /**
     * Checks, whether the object has left the game area
     * 
     * @returns True in case object left the game area, false otherwise
     */
    hasLeftGameArea() {
        return this.isTooFarTop() || this.isTooFarBottom() || this.isTooFarLeft() || this.isTooFarRight();
    }

    /**
     * Updates the physics components of this object
     * 
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     */
    updatePhysics(elapsedTime) {
        this.angle += this.angularVelocity * elapsedTime * MILISECOND_TO_SECOND_FACTOR;
        this.position.add(Vector.multiply(this.velocity, elapsedTime * MILISECOND_TO_SECOND_FACTOR));
    }

    /**
     * Updates the destroy animation in case it is active
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     */
    updateDestroyAnimation(elapsedTime) {
        if (this.destroyCounter) {
            this.destroyCounter -= elapsedTime;

            if (this.destroyCounter <= 0.0) {
                this.encounter.removeObject(this);
                return;
            }

            this.radiusScale = this.destroyCounter / DESTROY_DURATION;
        }
    }

    /**
     * Updates the common components of encounter objects
     * You might want to call this from the child classes
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     */
    superUpdate(elapsedTime, input) {
        this.updatePhysics(elapsedTime);

        if (this.hasLeftGameArea()) {
            this.encounter.removeObject(this);
        }

        this.updateDestroyAnimation(elapsedTime);
    }

    /**
     * Renders the common components encounter objects to the screen
     * You might want to call this from the child classes
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     */
    superRender(elapsedTime, context) {
        if (!this.asset) {
            return;
        }

        context.save();

        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);

        let currentRadius = this.radius * this.radiusScale;
        context.drawImage(this.asset, -currentRadius, -currentRadius, 2 * currentRadius, 2 * currentRadius);

        context.restore();
    }

    /**
     * Checks, whether this game object collides with given game object
     *
     * @param {GameObject} other The other game object to check
     * @returns True in case checked game objects are colliding, false otherwise
     */
    collidesWith(other) {
        return (this.radius + other.radius) < Vector.magnitude(Vector.subtract(this.position, other.position));
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

    initialize() {}
}