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

        this.offset = new Vector(0, 0);

        this.target = null;
        this.layers = [];

        this.moveTarget = null;
        this.step = null;
    }

    /**
     * Binds camera to follow specified target. This will also cancel any moveTo command
     *
     * @param {Object} target - target object to follow
     */
    bindTo(target) {
        this.moveTarget = null;
        this.step = null;

        this.target = target;
        this.offset = new Vector(-target.position.x + this.canvasDimensions.x / 2,
                                 -target.position.y + this.canvasDimensions.y / 2);
    }

    /**
     * Starts moving camera to given destination so it arrives there in number of frames given by time
     *
     * @param {Vector} destination - destination to move camera to
     * @param {Number} time - number of frames the transition should take
     */
    moveTo(destination, time) {
        this.target = null;

        this.moveTarget = new Vector(destination.x, destination.y);
        this.step = new Vector((-destination.x + this.canvasDimensions.x / 2 - this.offset.x) / time,
                                (-destination.y + this.canvasDimensions.y / 2 - this.offset.y) / time);
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
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(-this.offset.x, -this.offset.y, this.canvasDimensions.x, this.canvasDimensions.y);

        this.layers.forEach(layer => {
            let layerOffset = Vector.add(layer.offset, Vector.multiply(this.offset, layer.speed));
            context.drawImage(layer.canvas, layerOffset.x, layerOffset.y);
        });

        context.translate(this.offset.x, this.offset.y);
    }

    /**
     * Allows camera to react to changes in game
     *
     * @param {float} deltaT - time elapsed in between last two frames
     */
    update(deltaT) {
        if(this.target) {
            let deltaX = this.computeDeltaX(deltaT);
            this.offset.x = this.clamp(-this.baseLayerDimensions.x + this.canvasDimensions.x, this.offset.x - deltaX, 0.0);

            let deltaY = this.computeDeltaY(deltaT);
            this.offset.y = this.clamp(-this.baseLayerDimensions.y + this.canvasDimensions.y, this.offset.y - deltaY, 0.0);
        } else if(this.moveTarget && (this.moveTarget.x != this.offset.x || this.moveTarget.y != this.offset.y)) {
            this.offset.add(this.step);
        }
    }

    /**
     * Computes number of pixels the main camera should move along horizontal axis
     *
     * @param {float} deltaT - time elapsed in between last two frames
     * @returns Number of pixels the main camera should move
     */
    computeDeltaX(deltaT) {
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