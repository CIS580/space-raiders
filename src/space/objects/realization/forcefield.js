import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";

/** Color of the forcefield stroke */
const STROKE_COLOR = "blue";

/** Color of the forcefield fill */
const FILL_COLOR = "blue";

/** Distance to be bumped back from the force field */
const BUMP_BACK_DISTANCE = 2;

/**
 * @class Forcefield
 *
 * Represents a force field that blocks encounter game objects from passing through it
 */
export default class Forcefield extends EncounterObject {

    /**
     * Constructs force field
     *
     * @param {Encounter} encounter - reference to the encounter this force field is part of
     * @param {Vector} position - position where to place te center of this force field
     * @param {Number} width - width of this force field
     * @param {Number} height - height of this force field
     */
    constructor(encounter, position, width, height) {
        super(encounter, Type.FORCEFIELD, Math.max(width, height), position, undefined);

        this.width = width;
        this.height = height;

        this.vertical = (width < height);
    }

    /**
     * Handles the simulation of given object bouncing away from this force field
     *
     * @param {EncounterObject} object - object which should bounce of this force field
     */
    bounce(object) {
        if(this.vertical) {
            object.velocity.x = object.velocity.x * -1.0;
            object.position.x += this.calculatePushback(object);
            object.angle = Math.PI * 2.0 - object.angle;
        } else {
            object.velocity.y = object.velocity.y * -1.0;
            object.position.y += this.calculatePushback(object);
            object.angle = Math.PI - object.angle;
        }
    }

    /**
     * Calculates the distance given object should be pushed back to no longer collide with this force field. Please
     * note, that this must be called AFTER the velocity of the object has been reversed
     *
     * @param {EncounterObject} object - object which pushback should be calculated for
     */
    calculatePushback(object) {
        return (this.vertical) ? this.position.x + Math.sign(object.velocity.x) * (this.width + BUMP_BACK_DISTANCE) - object.position.x
                                : this.position.y + Math.sign(object.velocity.y) * (this.height + BUMP_BACK_DISTANCE) - object.position.y;
    }

    /**
     * Checks, whether this force field collides with given game object
     *
     * @param {GameObject} other The other game object to check
     * @returns True in case checked game objects are colliding, false otherwise
     */
    collidesWith(object) {
        return Math.abs(object.position.x - this.position.x) <= this.width / 2.0
            && Math.abs(object.position.y - this.position.y) <= this.height / 2.0;
    }

    /**
     * Renders content of the force field to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     */
    render(elapsedTime, context) {
        context.save();

        context.translate(this.position.x - this.width / 2.0, this. position.y - this.height / 2.0);

        context.fillStyle = FILL_COLOR;
        context.strokeStyle = STROKE_COLOR;

        context.beginPath();

        context.moveTo(0,0);
        context.lineTo(this.width,0);
        context.lineTo(this.width,this.height);
        context.lineTo(0,this.height);

        context.closePath();

        context.fill();
        context.stroke();

        context.restore();
    }
}
