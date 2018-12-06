import Type from "./encounterObjectType";
import EncounterObject from "./encounterObject";

/**
 * @class EncounterCollisionHandler
 *
 * A class providing means to handle encounter game object colission
 */
class EncounterCollisionHandler {

    /**
     * Constructs encounter collision handler
     */
    constructor() {
        if (!EncounterCollisionHandler.instance) {
            EncounterCollisionHandler.instance = this;
        }

        return EncounterCollisionHandler.instance;
    }

    /**
     * Handles the collision of player-controlled spaceship and asteroid
     *
     * @param {PlayerShip} player - player-controlled spaceship which collided
     * @param {Asteroid} asteroid - asteroid which collided
     */
    handlePlayerAsteroidCollision(player, asteroid) {
        // TODO: Implement actual handling
    }

    /**
     *  TODO
     *  Type.SLOW | Type.ALLY_SHIP:
     */
    handleSlow(slow,ship) {
        //ship.velocity = Vector.multiply(ship.velocity,slow.SLOW_FORCE);
    }
    /**
     * Handles collision of two encounter game objects
     *
     * @param {EncounterObject} object - one of the object which collided
     * @param {EncounterObject} other - the other game object which collided
     */
    handleCollision(object, other) {
        let collisionType = object.type | other.type;
        switch (collisionType) {
            case Type.PLAYER_SHIP | Type.ASTEROID:
                (object.type == Type.PLAYER_SHIP) ? this.handlePlayerAsteroidCollision(object, other)
                                                  : this.handlePlayerAsteroidCollision(other, object);
                break;

            default:
                // intentionally left blank
        }
    }
}

/** The only instance of this singleton */
const collisionHandler = new EncounterCollisionHandler();
Object.freeze(collisionHandler);

export default collisionHandler;