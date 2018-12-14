import Vector from "../../utils/vector";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";
import Generator from "../../generator";

const LH_SPRITE_SIZE = 40;
const LH_SPRITE_SHEET_WIDTH = 4;
//LH_ENTRY_SOURCE_Y is the y coordinate of position in loophole png file
const LH_ENTRY_SPRITE_SHEET_Y = 40;
//LH_EXIT_SOURCE_Y is the y coordinate of position in loophole png file
const LH_EXIT_SPRITE_SHEET_Y = 120;

const LH_RENDER_RADIUS = 30;
const LH_MIN_DIS = 700;

// the change value of globalAlpha each time
const LH_FADE_DEGREE = 5;


export default class LoopHole extends EncounterObject{

    /**
      * Construction for a new loop hole
      *
      * @param {Encounter} encounter
      * @param {Vector} position
      */
    constructor(encounter, position){
        super(encounter, Type.LOOP_HOLE, LH_RENDER_RADIUS, position);
        this.mapWidth = encounter.width;
        this.mapHeight = encounter.height;
        // generate loop hole exit
      	do{
            this.outX = Math.floor(Generator.nextRandom()*this.mapWidth);
            this.outY = Math.floor(Generator.nextRandom()*this.mapHeight);
            this.outPos = new Vector(this.outX, this.outY);
        } while (MyMath.distance(position, this.outPos) <= LH_MIN_DIS);
        //load image
        this.lhImage = AssetLoader.getAsset("loophole");
        //the x coordinate of position in loophole png file
        this.coordinateXInImage = 0;
        //fade level (0.0-1.0)
        this.globalAlphaValue = 100; //will be divided by 100 in render()
        this.isFadingOut = true;
    }

    /**
      * Generate a new loop hole in the map
      *
      * @param {Object} encounter
      * @return {LoopHole} a new loop hole with random entry and wayout position
      */
    static generateAtRandomPosition(encounter){
        let x = Math.floor(Generator.nextRandom()*encounter.width);
        let y = Math.floor(Generator.nextRandom()*encounter.height);
        return new LoopHole(encounter, new Vector(x,y));
    }

    /**
      * Generate a loophole with a specified exit
      *
      * @param {Object} encounter
      * @param {Vector} exit - the position of exit LoopHole
      * @return {LoopHole} a new loop hole with spaecified entry and exit
      */
    static generateLoopHoleAt(encounter, entry, exit){
        let loophole = new LoopHole(encounter, entry);
        loophole.outPos = exit;
        return loophole;
    }

    /**
      * check whether the object is in the range of loop hole entry
      *
      * @param {Object} the object waiting for check
      * @return {Boolean} whether other object collided with loop hole entry
      */
    collidesWith(others){
       let distance = MyMath.distance(this.position, others.position);
       return !(distance > (LH_RENDER_RADIUS * this.radiusScale));
    }


    /**
      *
      * when ship collide with entry postion, it will be transfered to way out
      * it will actually transfer the ship
      *
      */
    transfer(object){
        object.position = new Vector(this.outPos.x, this.outPos.y);
    }

    /**
      * Draw the black hole image in the map
      *
      * @param {CanvasRenderingContext2D} context - context to render content on
      * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
      */
    render(deltaT,context){
        //change the fade level
        if(this.isFadingOut){
            this.globalAlphaValue -= LH_FADE_DEGREE;
            if (this.globalAlphaValue <= 0) this.isFadingOut = false;
        }
        else{
            this.globalAlphaValue += LH_FADE_DEGREE;
            if (this.globalAlphaValue >= 100) this.isFadingOut = true;
        }
        // wrap the entry loop hole
        this.coordinateXInImage += LH_SPRITE_SIZE;
        if(this.coordinateXInImage == LH_SPRITE_SIZE * LH_SPRITE_SHEET_WIDTH) this.coordinateXInImage = 0;
        //change the display size according to the radiusScale
        let renderRadius = LH_RENDER_RADIUS * this.radiusScale;
        //draw image
        context.globalAlpha = this.globalAlphaValue / 100.00;
        context.drawImage(this.lhImage, this.coordinateXInImage, LH_ENTRY_SPRITE_SHEET_Y, LH_SPRITE_SIZE, LH_SPRITE_SIZE,
            this.position.x - renderRadius, this.position.y - renderRadius, 2 * renderRadius, 2 * renderRadius);
        context.drawImage(this.lhImage, this.coordinateXInImage, LH_EXIT_SPRITE_SHEET_Y, LH_SPRITE_SIZE, LH_SPRITE_SIZE,
            this.outPos.x - renderRadius, this.outPos.y - renderRadius, 2 * renderRadius, 2 * renderRadius);
        context.globalAlpha = 1;
    }
}
