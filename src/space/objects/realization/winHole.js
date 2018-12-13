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


export default class WinHole extends EncounterObject{

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

        //load image
        this.whImage = AssetLoader.getAsset("winhole");
        //the x coordinate of position in loophole png file
        this.coordinateXInImage = 0;
        //fade level (0.0-1.0)
        this.globalAlphaValue = 100; //will be divided by 100 in render()
        this.isFadingOut = true;
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
        if (object === this.encounter.playerShip) this.encounter.win();
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
        context.drawImage(this.whImage, this.coordinateXInImage, LH_ENTRY_SPRITE_SHEET_Y, LH_SPRITE_SIZE, LH_SPRITE_SIZE,
            this.position.x - renderRadius, this.position.y - renderRadius, 2 * renderRadius, 2 * renderRadius);
        context.globalAlpha = 1;
    }
}
