import Vector from "./vector";

/** Boundary on screen to start follow player when moving beyond */
const FOLLOW_BOUNDARY = 0.4;

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
     * @param {Number} width - width of the canvas to render on
     * @param {Number} height - height of the canvas to render on
     * @param {Vector} offset - starting offset for the camera
     */
    constructor(width, height, offset) {
        this.width = width;
        this.height = height;

        this.offset = offset;
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
        context.fillRect(0, 0, this.width, this.height);

        this.layers.forEach(layer => {
            context.drawImage(layer.canvas, layer.offset.x, layer.offset.y);
        });
    }

    /**
     * Allows camera to react to changes in game
     *
     * @param {float} deltaT - time elapsed in between last two frames
     */
    update(deltaT) {
        let deltaX = this.computeDeltaX(deltaT);
        this.offset.x += deltaX;

        let deltaY = this.computeDeltaY(deltaT);
        this.offset.y += deltaY;

        this.layers.forEach(layer => {
            layer.offset.x = this.clamp(0, layer.offset.x - layer.speed * deltaX, layer.canvas.width - this.width);
            layer.offset.y = this.clamp(0, layer.offset.y - layer.speed * deltaY, layer.canvas.height - this.height);
        });
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

        let cameraX = this.target.x - this.offset.x;
        let leftBoundary = this.width * FOLLOW_BOUNDARY;
        let rightBoundary = this.width * (1 - FOLLOW_BOUNDARY);

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

        let cameraY = this.target.x - this.offset.y;
        let topBoundary = this.height * FOLLOW_BOUNDARY;
        let bottomBoundary = this.height * (1 - FOLLOW_BOUNDARY);

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