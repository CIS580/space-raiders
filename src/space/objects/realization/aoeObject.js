import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";

const SLOW_RADIUS = 300;
const SLOW_FORCE = 0.3;

export default class Slow extends EncounterObject {
    constructor(encounter, position) {
        super(encounter, Type.SLOW, SLOW_RADIUS, position);
        this.containing = [];
    }

    isContained(object) {
        for (var i = 0; i < this.containing.length; i++) {
            if (object === this.containing[i])
                return true;
        }
        return false;
    }

    render(elapsedTime, context) {
        context.save();
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = "rgba(0, 0, 0, 0.1)";
        context.fillStyle = 'rgba(0, 0, 0, 0.08)';
        context.fill();
        context.stroke();
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.strokeStyle = "rgba(0, 0, 0, 1)";
    }

    remove(element) {
        const index = this.containing.indexOf(element);
        this.containing.splice(index, 1);
    }

    areColliding(other) {
        if (other.areColliding(this)) {
            if (this.isContained(other)) {
                return false;
            }
            this.containing.push(other);
            return true;
        } else {
            if (this.isContained(other)) {
                this.remove(other);
                return false;
            }
        }

    }
}