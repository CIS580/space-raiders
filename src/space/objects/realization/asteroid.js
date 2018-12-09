/**
 * Created by jozef on 7.12.2018.
 */

import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";


const AST_MAX_SPEED = 200;
const AST_MIN_SPEED = 100;
const AST_MIN_RADIUS = 30;
const AST_MAX_RADIUS = 80;
const ASTEROID_ASSETS = ["001","002","003","004"];

class Asteroid extends EncounterObject {

    constructor(encounter, position,radius) {
        super(encounter, Type.ASTEROID,radius, position, AssetLoader.getAsset("spaceMeteors/" + ASTEROID_ASSETS[Math.floor(MyMath.randomBetween(0, ASTEROID_ASSETS.length))]));
        this.mass = this.radius / 2;
        this.velocity = new Vector(Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED,Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED);
        this.angularVelocity = Math.random() * 3 - 1.5;
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
     * Create offset vector for asteroid shower
     * @param asteroid
     * @param vertical
     * @param horizontal
     * @returns {Vector}
     */
    static offsetCalculator(asteroid,vertical,horizontal) {
        let xOffset = vertical ? 0 : asteroid.radius * MyMath.randomBetween(0.2,1.2);
        let yOffset = horizontal ? 0 : asteroid.radius * MyMath.randomBetween(0.2,1.2);
        return new Vector(xOffset,yOffset);
    }

    /**
     *  Creates shower of asteroid spawned from specified position,
     *  with specified direction
     *
     * @param encounter
     * @param position      from where asteroids should appear
     * @param count         how many asteroids should be spawned
     * @param angle         angle of the direction in which asteroids go
     * @param vertical      if true then create vertical line, if false create horizontal line, if undef, dost create line
     * @returns {Array}     array of instances to asteroid
     */
    static createAsteroidShower(encounter, position, count, angle, vertical) {
        let asteroids = [];
        let horizontal = vertical === undefined ? undefined : !vertical;
        let angleTmp = angle;
        let posTmp = new Vector(position.x,position.y);
        for(let i = 0; i < count; i++) {
            if(vertical !== undefined && i !== 0)
                posTmp.subtract(this.offsetCalculator(asteroids[i - 1],vertical, horizontal));
            let asteroid = new Asteroid(encounter,new Vector(posTmp.x,posTmp.y),MyMath.randomBetween(AST_MIN_RADIUS,AST_MAX_RADIUS));
            asteroid.velocity = (new Vector(Math.sin(angleTmp), -Math.cos(angleTmp))).multiply(MyMath.randomBetween(AST_MIN_SPEED,AST_MAX_SPEED));
            asteroids.push(asteroid);
            angleTmp = angle * MyMath.randomBetween(0.95,1.05);
            posTmp.subtract(this.offsetCalculator(asteroid,vertical, horizontal));
        }
        return asteroids;
    }

    /**
     *  Creates shower of asteroid spawned from specified position,
     *  with specified direction
     *
     * @param encounter
     * @param position      from where asteroids should appear
     * @param count         how many asteroids should be spawned
     * @param angle         angle of the direction in which asteroids go
     * @returns {Array}     array of instances to asteroid
     */
    static createPointAsteroidShower(encounter, position, count, angle) {
        return this.createAsteroidShower(encounter,position,count,angle);
    }

    /**
     *  Creates shower of asteroid spawned as either vertical or horizontal line
     *  with specified direction
     *
     * @param encounter
     * @param position      from where asteroids should appear
     * @param count         how many asteroids should be spawned
     * @param angle         angle of the direction in which asteroids go
     * @param vertical      if true then create vertical line, if false create horizontal line
     * @returns {Array}     array of instances to asteroid
     */
    static createLineAsteroidShower(encounter, position, count, angle, vertical) {
        return this.createAsteroidShower(encounter,position,count,angle,vertical);
    }
}

