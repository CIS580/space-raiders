
//Class created by Aidan Javier 12/9/2018

import AssetLoader from "../../utils/assetLoader";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import MyMath from "../../utils/myMath";

export default class Forcefield extends EncounterObject {

    constructor(encounter, position, width, height, vertical) {
        super(encounter, Type.FORCEFIELD, Math.max(width, height), position, undefined);
        console.log(Math.max(width,height));
        this.width = width;
        this.height = height;
        this.vertical = vertical;
    }

    bounce(object) {
        if(this.vertical) {
            object.velocity.x = object.velocity.x * -1.0;
            object.position.add(Vector.multiply(Vector.normalize(object.velocity), this.calculatePushback(object)));
            object.angle = Math.PI * 2.0 - object.angle;
        }
        else {
            object.velocity.y = object.velocity.y * -1.0;
            object.position.add(Vector.multiply(Vector.normalize(object.velocity), this.calculatePushback(object)));
            object.angle = Math.PI - object.angle;
        }
    }

    calculatePushback(object) {
        return Vector.magnitude(object.velocity) / 5;
    }

    collidesWith(object) {
        return(object.position.x + object.radius > (this.position.x - this.width / 2) &&
               object.position.x - object.radius < (this.position.x + this.width / 2) &&
               object.position.y + object.radius > (this.position.y - this.height / 2) &&
               object.position.y - object.radius < (this.position.y + this.height / 2));
    }

    update(elapsedTime, input) {
        this.superUpdate(elapsedTime, input);
    }

    render(elapsedTime, context) {
        let g = context;
        g.save();

        g.translate(this.position.x - this.width / 2.0, this. position.y - this.height / 2.0);

        g.fillStyle = "blue";
        g.strokeStyle = "white";
        g.beginPath();
        g.moveTo(0,0);
        g.lineTo(this.width,0);
        g.lineTo(this.width,this.height);
        g.lineTo(0,this.height);
        g.closePath();
        g.fill();
        g.stroke();

        g.restore();
    }
}
