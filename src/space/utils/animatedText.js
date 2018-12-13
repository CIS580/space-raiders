
/**
 * @class AnimatedText
 *
 * Represents text able to be moved along horizontal axis
 */
export class AnimatedText {

    /**
     * Constructs base animated text
     *
     * @param {Text} text Text to be displayed
     * @param {Text} font Font setting of the displayed text
     * @param {Text} color Color of displayed text
     * @param {Text} align Alignment setting
     * @param {Number} y Y coordinate of text movement
     * @param {Array} nodes Array of nodes describing its path
     */
    constructor(text, font, color, align, y, nodes) {
        this.text = text
        this.font = font
        this.color = color
        this.align = align

        this.nodes = nodes

        this.timer = 0
        this.currentNode = this.nodes[0]
        this.nextNode = this.nodes[1]
        this.nextNodeIndex = 1

        this.x = this.currentNode.position
        this.y = y
        this.step = computeStep(this.currentNode, this.nextNode)
    }

    /**
     * Procs the timer on this text
     */
    update() {
        if(!this.nextNode) {
            return
        }

        this.x += this.step

        if(this.timer == this.nextNode.time) {
            this.timer = 0
            this.currentNode = this.nextNode
            this.nextNodeIndex += 1

            if(this.nodes.length == this.nextNodeIndex) {
                this.nextNode = null
            } else {
                this.nextNode = this.nodes[this.nextNodeIndex]
                this.step = computeStep(this.currentNode, this.nextNode)
            }
        }

        this.timer += 1
    }

    /**
     * Renders this animatd text
     *
     * @param {CanvasRenderingContext2D} context Context to draw with
     */
    render(context) {
        context.save()

        context.textAlign = this.align

        context.font = this.font
        context.fillStyle = this.color

        context.fillText(this.text, this.x, this.y)

        context.restore()
    }
}

/**
 * Computes movement step for transition in between two nodes
 *
 * @param {Node} startNode Node where motion starts
 * @param {Node} endNode Node where motion ends
 * @returns Movement step of transition between given nodes
 */
function computeStep(startNode, endNode) {
    var distance = endNode.position - startNode.position
    var time = endNode.time

    return distance / time
}

/**
 * @class TextPathNode
 *
 * Represents single node on AnimatedText trajectory
 */
export class TextPathNode {

    /**
     * Constructs base node
     *
     * @param {Number} position Position on horizontal axis
     * @param {Number} time Time in which this position hsould be reached
     */
    constructor(position, time) {
        this.position = position
        this.time = time
    }
}

/**
 * @class AnimatedTextSettings
 *
 * Bundles together the settings for animated texts
 */
export class AnimatedTextSettings {

    /**
     * Constructs default version of settings for animated texts
     */
    constructor() {
        // Color of the text
        this.textColor = "white";

        // Alignment of text
        this.textAlignment = "center";

        // Font for displayed text
        this.textFont = "bold 48px Sans Sarif";

        // Font for displayed lower text
        this.subTextFont = "bold 36px Sans Sarif";

        // Vertical offset of displayed text
        this.textVerticalOffset = -25;

        // Vertical spacing of displayed text
        this.textVerticalSpacing = 70;

        // Drift of text in the middle
        this.drift = 2.0 / 21.0;

        // Offset to hide text from screen
        this.offset = 5.0 / 11.0;

        // Point on the very far left edge of the screen
        this.leftEdge = 0.0;

        // Point where middle animation should start
        this.middlePointStart = 9.5 / 21.0;

        // Point on the very far right edge of the screen
        this.rightEdge = 1.0;

        // Time for the text to get to the middle of the screen
        this.appearanceDelay = 20;

        // Delay for texts to drift in the middle of the screen
        this.driftDelay = 100;

        // Time for the text to disappear from the middle of the screen
        this.disappearanceDelay = 20;

        // Delay before the sub text gets displayed
        this.subTextDelay = 40;

        // Time required for text to appear, drift and disappear
        this.textDuration = this.appearanceDelay + this.driftDelay + this.disappearanceDelay;

        // Duration before screen fades out of the screen
        this.fadeOutDuration = 60;
    }
}
