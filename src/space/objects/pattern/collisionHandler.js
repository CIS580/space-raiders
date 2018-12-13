/**
 * @class EncounterCollisionHandler
 *
 * A class providing means to handle encounter game object colission
 */
import Type from "./encounterObjectType";
import EncounterObject from "./encounterObject";
import MyMath from "../../utils/myMath";
import Explosion, {EXPLOSION_DAMAGE} from "../realization/explosion";
import Vector from "../../utils/vector";
import {BULLET_DAMAGE} from "../realization/Bullet";


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

    handleEnemyShipCollision(enemyShip, object) {
        MyMath.bounce(enemyShip, object);
        if (object.type !== Type.ENEMY_SHIP) {
            enemyShip.hit(15);
            object.hit(15);
        }
    }

    handleExplosiveCollision(explosive, object) {
        // TODO: Implement handling of remove life to explosive
        explosive.hit(5)
    }

    handleExplosionCollision(explosion, object) {
        object.hit(EXPLOSION_DAMAGE)
    }

    handleAsteroidCollision(asteroid, object) {
        // TODO: Implement actual handling
        MyMath.bounce(asteroid,object);
    }

    handleBlackHoleCollision(blackHole, object) {
        blackHole.applyGravityTo(object);
    }

    handleBlackHoleRadiusCollision(blackHoleRadius, object) {
        // TODO: Implement actual handling
    }

    handleLoopHoleCollision(loopHole, object){
        loopHole.transfer(object);
    }

    handleBulletCollision(bullet, object) {
        if (bullet.health > 0) {
            object.hit(BULLET_DAMAGE);
        }
        bullet.hit(bullet.health);
    }

    /**
     *  TODO
     *  Type.SLOW | Type.ALLY_SHIP:
     */
    handleSlow(slow, other) {
        //other.velocity = Vector.multiply(other.velocity,slow.SLOW_FORCE);
        //other.velocityMagnitude *= slow.SLOW_FORCE;
    }
    /**
     * Handles collision of two encounter game objects
     *
     * @param {EncounterObject} object - one of the object which collided
     * @param {EncounterObject} other - the other game object which collided
     */
    handleCollision(object, other) {
        if (object.type === 0 || other.type === 0) {
            throw "Unknown type!";
        }
        let collisionType = object.type | other.type;
        switch (collisionType) {
            case Type.ENEMY_SHIP | Type.ALLY_SHIP:
            case Type.ENEMY_SHIP | Type.PLAYER_SHIP:
            case Type.ENEMY_SHIP | Type.ENEMY_SHIP:
                (object.type === Type.ENEMY_SHIP)
                    ? this.handleEnemyShipCollision(object, other) : this.handleEnemyShipCollision(other, object);
                break;

            case Type.ASTEROID | Type.ASTEROID:
            case Type.ASTEROID | Type.PLAYER_SHIP:
            case Type.ASTEROID | Type.ALLY_SHIP:
            case Type.ASTEROID | Type.ENEMY_SHIP:
                (object.type === Type.ASTEROID)
                    ? this.handleAsteroidCollision(object, other) : this.handleAsteroidCollision(other, object);
                break;

            case Type.EXPLOSIVE | Type.EXPLOSIVE:
            case Type.EXPLOSIVE | Type.PLAYER_SHIP:
            case Type.EXPLOSIVE | Type.ALLY_SHIP:
            case Type.EXPLOSIVE | Type.ENEMY_SHIP:
            case Type.EXPLOSIVE | Type.ASTEROID:
            case Type.EXPLOSIVE | Type.BULLET:
                (object.type === Type.EXPLOSIVE)
                    ? this.handleExplosiveCollision(object, other) : this.handleExplosiveCollision(other, object);
                break;

            case Type.EXPLOSION | Type.PLAYER_SHIP:
            case Type.EXPLOSION | Type.ALLY_SHIP:
            case Type.EXPLOSION | Type.ENEMY_SHIP:
            case Type.EXPLOSION | Type.ASTEROID:
            case Type.EXPLOSION | Type.EXPLOSIVE:
            case Type.EXPLOSION | Type.BULLET:
                (object.type === Type.EXPLOSION)
                    ? this.handleExplosionCollision(object, other) : this.handleExplosionCollision(other, object);
                break;

            case Type.BLACK_HOLE_RADIUS | Type.PLAYER_SHIP:
            case Type.BLACK_HOLE_RADIUS | Type.ALLY_SHIP:
            case Type.BLACK_HOLE_RADIUS | Type.ENEMY_SHIP:
            case Type.BLACK_HOLE_RADIUS | Type.ASTEROID:
            case Type.BLACK_HOLE_RADIUS | Type.EXPLOSIVE:
            case Type.BLACK_HOLE_RADIUS | Type.BULLET:
                (object.type === Type.BLACK_HOLE_RADIUS)
                    ? this.handleBlackHoleRadiusCollision(object, other) : this.handleBlackHoleRadiusCollision(other, object);
                break;

            case Type.BLACK_HOLE | Type.PLAYER_SHIP:
            case Type.BLACK_HOLE | Type.ALLY_SHIP:
            case Type.BLACK_HOLE | Type.ENEMY_SHIP:
            case Type.BLACK_HOLE | Type.ASTEROID:
            case Type.BLACK_HOLE | Type.EXPLOSIVE:
            case Type.BLACK_HOLE | Type.BULLET:
                (object.type === Type.BLACK_HOLE)
                    ? this.handleBlackHoleCollision(object, other) : this.handleBlackHoleCollision(other, object);
                break;

            case Type.LOOP_HOLE | Type.PLAYER_SHIP:
            case Type.LOOP_HOLE | Type.ALLY_SHIP:
            case Type.LOOP_HOLE | Type.ENEMY_SHIP:
            case Type.LOOP_HOLE | Type.ASTEROID:
            case Type.LOOP_HOLE | Type.BULLET:
                (object.type === Type.LOOP_HOLE)
                    ? this.handleLoopHoleCollision(object, other) : this.handleLoopHoleCollision(other, object);
                break;

            case Type.BULLET | Type.PLAYER_SHIP:
            case Type.BULLET | Type.ENEMY_SHIP:
            case Type.BULLET | Type.ALLY_SHIP:
            case Type.BULLET | Type.ASTEROID:
                (object.type === Type.BULLET)
                    ? this.handleBulletCollision(object, other)
                    : this.handleBulletCollision(other, object);
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
