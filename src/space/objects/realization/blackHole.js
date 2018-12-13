import Vector from "../../utils/vector";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";
import Generator from "../../generator";

const BH_SPRITE_SIZE = 100;
const BH_SPRITE_SHEET_WIDTH = 6;
const BH_SPRITE_SHEET_HEIGHT = 2;
const BH_RENDER_RADIUS = 50;
const BH_FORCE_SCALE = 1.5;
const BH_GRAVITY_RANGE = 8000;
const BH_WRAP_INTERVAL = 100;

const BH_KILL_AMOUNT = 1;

export default class BlackHole extends EncounterObject{

    /**
      * Construction for black hole game element
      *
      * @param {Encounter} encounter
      * @param {Vector} position - black hole's position
      * @reference Black Hole (Warp) by Timothy Courtney (timothycourtney.io)
      *  Licensed under Creative Commons: By Attribution 3.0 License
      *  http://creativecommons.org/licenses/by/3.0/
      */
    constructor(encounter, position){
        super(encounter, Type.BLACK_HOLE, BH_GRAVITY_RANGE, position);
        this.bhImage = AssetLoader.getAsset("black-hole");
        this.coordinateXInImage = 0;
        this.coordinateYInImage = 0;
        this.wrapInterval = BH_WRAP_INTERVAL;
    }

    /**
      * generate a random position blackhole
      *
      * @param {Object} encounter
      * @return {BlackHole} a new black hole with random position
      */
    static generateAtRandomPosition(encounter){
        let x = Math.floor(Generator.nextRandom()*encounter.width);
        let y = Math.floor(Generator.nextRandom()*encounter.height);
        return new BlackHole(encounter, new Vector(x,y));
    }

    /**
      * @param {Object} the object waiting for check
      * @return {Boolean} whether other object collided with black hole
      */
    collidesWith(other){
        let distance = MyMath.distance(this.position, other.position);

        // This is a hack:
        if (MyMath.distance(this.position, other.position) <= BH_RENDER_RADIUS + other.radius) {
            other.hit(BH_KILL_AMOUNT);
        }

        return !(distance > BH_GRAVITY_RANGE);
    }

    /**
      * update the source coordinates in sprite sheet
      *
      * @param {DOMHighResTimeStamp} deltaT - time elapsed from last frame
      */
    updateImageSource(deltaT){
        this.wrapInterval -= deltaT;
        if(this.wrapInterval <= 0){
            this.coordinateXInImage += BH_SPRITE_SIZE;
            if(this.coordinateXInImage == BH_SPRITE_SHEET_WIDTH * BH_SPRITE_SIZE){
                this.coordinateYInImage += BH_SPRITE_SIZE;
                if(this.coordinateYInImage == BH_SPRITE_SHEET_HEIGHT * BH_SPRITE_SIZE) this.coordinateYInImage = 0;
                this.coordinateXInImage = 0;
            }
            this.wrapInterval = BH_WRAP_INTERVAL;
        }
    }

    /**
      * Draw the black hole image in the map
      *
      * @param {CanvasRenderingContext2D} context - context to render content on
      * @param {DOMHighResTimeStamp} deltaT - time elapsed from last frame
      */
    render(deltaT, context){
        this.updateImageSource(deltaT);
        //change the display size according to the radiusScale
        let renderRadius =  BH_RENDER_RADIUS * this.radiusScale;
        context.drawImage(this.bhImage,this.coordinateXInImage,this.coordinateYInImage, BH_SPRITE_SIZE, BH_SPRITE_SIZE,
            this.position.x - renderRadius, this.position.y - renderRadius, 2*renderRadius, 2*renderRadius);
    }

    /**
      * get the new ship vector if there is a blackhole in the map.
	  * it will actually pull the ship
      *
      * @param {Object} - the object which need to check gravitation
      */
    applyGravityTo(object) {
        let force = Vector.subtract(this.position,object.position);
        let forceDir = Vector.normalize(force);
        object.position = Vector.add(object.position,Vector.multiply(forceDir,BH_FORCE_SCALE));
    }

}
