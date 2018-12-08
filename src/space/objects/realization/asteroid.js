/**
 * Created by jozef on 7.12.2018.
 */

import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";


const AST_MAX_SPEED = 80;
const ASSET = ["spaceMeteors_001","spaceMeteors_002","spaceMeteors_003","spaceMeteors_004"];

export default class Asteroid extends EncounterObject {

    constructor(encounter, position,radius) {
        super(encounter, Type.ASTEROID,radius, position);
        this.mass = this.radius / 2;
        this.velocity = new Vector(Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED,Math.random() * AST_MAX_SPEED * 2 - AST_MAX_SPEED);
        this.asset = AssetLoader.getAsset(ASSET[Math.floor(MyMath.randomBetween(0,4))]);
    }


}

