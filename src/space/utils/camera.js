import Vector from "./vector";

/** Boundary on screen to start follow player when moving beyond */
const FOLLOW_BOUNDARY = 0.3;

/** Color used for background rendering */
const BACKGROUND_COLOR = "black";

/**
 * @class Camera
 *
 * A class representing game camera capable of following given target
 */
export default class Camera {

    /**
     * Constructs base camera
     *
     * @param {Vector} baseLayerDimensions - dimensions of the base layer for the camera
     * @param {Vector} canvasDimensions - dimensions of the main game canvas
     */
    constructor(baseLayerDimensions, canvasDimensions) {
        this.baseLayerDimensions = baseLayerDimensions;
        this.canvasDimensions = canvasDimensions;

        this.delta = new Vector(0, 0);

        this.previousOffset = new Vector(0, 0);
        this.offset = new Vector(0, 0);

        this.target = null;
        this.layers = [];
    }

    /**
     * Binds camera to follow specified target
     *
     * @param {Object} target - target object to follow
     */
    bindTo(target) {
        this.target = target;
        this.offset = new Vector(-target.position.x + this.canvasDimensions.x / 2,
                                 -target.position.y + this.canvasDimensions.y / 2);
        this.previousOffset = new Vector(0, 0);
    }

    /**
     * Adds next layer to be rendered on top of all the others
     *
     * @param {Canvas} canvas - reference to canvas which content will get rendered
     * @param {float} speed - speed at which this layer will move (1 equals to speed of tracked object)
     * @param {Vector} offset - vector determining basic offset of displayed layer
     */
    addLayer(canvas, speed, offset) {
        this.layers.push({ canvas: canvas, speed: speed, offset: offset });
    }

    /**
     * Renders all layers using given context
     *
     * @param {2DContext} context - context to render layers onto
     */
    render(context) {
        context.translate(this.delta.x, this.delta.y);

        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(-this.offset.x, -this.offset.y, this.canvasDimensions.x, this.canvasDimensions.y);

        this.layers.forEach(layer => {
            let layerOffset = Vector.add(layer.offset, Vector.multiply(this.offset, 1.0 - layer.speed));
            context.drawImage(layer.canvas, -layerOffset.x, -layerOffset.y);
        });
    }

    /**
     * Allows camera to react to changes in game
     *
     * @param {float} deltaT - time elapsed in between last two frames
     */
    update(deltaT) {
        let deltaX = this.computeDeltaX(deltaT);
        this.offset.x = this.clamp(-this.baseLayerDimensions.x + this.canvasDimensions.x, this.offset.x - deltaX, 0.0);

        let deltaY = this.computeDeltaY(deltaT);
        this.offset.y = this.clamp(-this.baseLayerDimensions.y + this.canvasDimensions.y, this.offset.y - deltaY, 0.0);

        this.delta = Vector.subtract(this.offset, this.previousOffset);
        this.previousOffset = new Vector( this.offset.x, this.offset.y );
    }

    /**
     * Computes number of pixels the main camera should move along horizontal axis
     *
     * @param {float} deltaT - time elapsed in between last two frames
     * @returns Number of pixels the main camera should move
     */
    computeDeltaX(deltaT) {
        if (!this.target) {
            return 0.0;
        }

        let cameraX = this.target.position.x + this.offset.x;
        let leftBoundary = this.canvasDimensions.x * FOLLOW_BOUNDARY;
        let rightBoundary = this.canvasDimensions.x * (1 - FOLLOW_BOUNDARY);

        if (cameraX < leftBoundary) {
            return cameraX - leftBoundary;
        }

        if (cameraX > rightBoundary) {
            return cameraX - rightBoundary;
        }

        return 0.0;
    }

    /**
     * Computes number of pixels the main camera should move along vertical axis
     *
     * @param {float} deltaT - time elapsed in between last two frames
     * @returns Number of pixels the main camera should move
     */
    computeDeltaY(deltaT) {
        if (!this.target) {
            return 0.0;
        }

        let cameraY = this.target.position.y + this.offset.y;
        let topBoundary = this.canvasDimensions.y * FOLLOW_BOUNDARY;
        let bottomBoundary = this.canvasDimensions.y * (1 - FOLLOW_BOUNDARY);

        if (cameraY < topBoundary) {
            return cameraY - topBoundary;
        }

        if (cameraY > bottomBoundary) {
            return cameraY - bottomBoundary;
        }

        return 0.0;
    }

    /**
     * Clamps the given value in between low and high boundaries
     *
     * @param {Number} low - lower boundary
     * @param {Number} value - value to be clamped
     * @param {Number} high - upper boundary
     * @returns Clamped value
     */
    clamp(low, value, high) {
        if (value < low) {
            return low;
        }

        if (high < value) {
            return high;
        }

        return value;
    }
}