import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";

const SLOW_RADIUS = 300;
const SLOW_FORCE = 10;
const SLOW_VECTOR = new Vector(SLOW_FORCE,SLOW_FORCE);

export default class Slow extends EncounterObject {
    constructor(encounter, radius, position) {
        super(encounter, Type.SLOW, SLOW_RADIUS, position);
    }

    collideWithShip(ship) {
        ship.velocity = Vector.subtract(ship.velocity,SLOW_VECTOR);
    }

    render() {

    }
}