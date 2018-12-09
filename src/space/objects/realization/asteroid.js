/**
 * Created by jozef on 7.12.2018.
 */

import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";


const AST_MAX_SPEED = 80;
const AST_MIN_RADIUS = 30;
const AST_MAX_RADIUS = 80;
const ASSET = ["spaceMeteors_001","spaceMeteors_002","spaceMeteors_003","spaceMeteors_004"];

class Asteroid extends EncounterObject {

    constructor(encounter, position,radius) {
        super(encounter, Type.ASTEROID,radius, position);
        this.mass = this.radius / 2;
        this.velocity = new Vector(Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED,Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED);
        this.asset = AssetLoader.getAsset(ASSET[Math.floor(MyMath.randomBetween(0,4))]);
    }


}

/**
 * Factory of asteroids
 */
export default class AsteroidCreator {
    /**
     * Creates one asteroid
     *
     * @param encounter     encounter
     * @param position      position where asteroid should be spawned
     * @param radius        radius of the asteroid
     * @returns {Asteroid}  instance
     */
    static createAsteroid(encounter, position,radius) {
        return new Asteroid(encounter, position, radius);
    }

    /**
     *  Creates shower of asteroid spawned from specified position,
     *  with specified direction either up left/ up right; or
     *  down left/ down right
     *
     * @param encounter
     * @param position      from where asteroids should appear
     * @param count         how many asteroids should be spawned
     * @param up            if true, asteroids go up; else they go down
     * @param left          if true, asteroids go left; else they go right
     * @returns {Array}     array of instances to asteroid
     */
    static createAsteroidShower(encounter, position, count, up, left) {
        let asteroids = [];
        for(let i = 0; i < count; i++) {
            let posTmp = new Vector(position.x,position.y);
            let asteroid = new Asteroid(encounter,posTmp,MyMath.randomBetween(AST_MIN_RADIUS,AST_MAX_RADIUS));
            if(up) {
                asteroid.velocity.x *= (-1);
                position.x += 10;
            } else {
                asteroid.velocity.x = encounter.width - asteroid.velocity.x;
                position.x -= 10;
            }
            if(left) {
                asteroid.velocity.y *= (-1);
                position.y += 10;
            } else {
                asteroid.velocity.y = encounter.width - asteroid.velocity.y;
                position.y -= 10;
            }
            asteroid.velocity = Vector.multiply(asteroid.velocity,0.1);
            asteroids.push(asteroid);
        }
        return asteroids;
    }
}

