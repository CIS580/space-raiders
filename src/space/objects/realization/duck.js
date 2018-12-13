/**
 * Created by jozef on 7.12.2018.
 */

import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";
import MyMath from "../../utils/myMath";
import AssetLoader from "../../utils/assetLoader";

const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 60;

export default class Duck extends EncounterObject {

    constructor(encounter, position) {
        super(encounter, Type.ASTEROID, 15, position, AssetLoader.getAsset("DUX"));
        this.mass /= 2;

        this.animationFrame = 0;
        this.animationFrameTime = 0;
    }


    update(elapsedTime, input) {
        this.velocity = Vector.subtract(this.encounter.playerShip.position, this.position).normalize().multiply(150);

        this.superUpdate(elapsedTime, input)
    }

    render(elapsedTime, context) {
        this.animationFrameTime -= elapsedTime;
        if (this.animationFrameTime <= 0) {
            this.animationFrameTime = 350;
            this.animationFrame ++;

            if (this.animationFrame > 1) {
                this.animationFrame = 0
            }
        }
        let angle = this.velocity.normalize().angle();

        let facingLeft = angle < -Math.PI / 2 || angle > Math.PI / 2;

        context.save();

        context.translate(this.position.x, this.position.y);

        let currentRadius = this.radius * this.radiusScale;
        context.drawImage(this.asset,
            facingLeft ? 0 : IMAGE_WIDTH / 2, this.animationFrame * IMAGE_HEIGHT / 2, IMAGE_WIDTH / 2, IMAGE_HEIGHT / 2,
            -currentRadius, -currentRadius, 2 * currentRadius, 2 * currentRadius);

        context.restore();
    }
}

