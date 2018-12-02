import AssetLoader from "./utils/assetLoader";
import EncounterObject from "../pattern/encounterObject";
import Type from "../pattern/encounterObjectType";
import Vector from "../../utils/vector";

/** Factor to convert milisecond to seconds */
const MILISECOND_TO_SECOND_FACTOR = 1.0 / 1000.0;

/** Collider radius for player sprite */
const PLAYER_RADIUS = 30.0;

/** Name of base player asset */
const PLAYER_ASSET_NAME = "player";

/** Key associated with turning left */
const KEY_TURN_LEFT = "ArrowLeft";

/** Key associated with turning right */
const KEY_TURN_RIGHT = "ArrowRight";

/** Key associated with accelerating */
const KEY_ACCELERATE = "ArrowUp";

/** Key associated with braking */
const KEY_BRAKE = "ArrowDown";

/** Key associated with shooting */
const KEY_SHOOT = " ";

/** Maximal speed of spaceship */
const MAXIMAL_SPEED = 300.0;

/** Normal speed of spaceship */
const NORMAL_SPEED = 170.0;

/** Minimal speed of spaceship */
const MINIMAL_SPEED = 70.0;

/** Maximal acceleration of the spaceship */
const MAXIMAL_ACCELERATION = 90.0;

/** Target spaceship's angular velocity while turning */
const TURNING_ANGULAR_VELOCITY = Math.PI;

/** Cooldown for shooting */
const GUN_COOLDOWN = 300.0;

/**
 * @class PlayerShip
 *
 * Represents player-controlled spaceship
 */
export default class PlayerShip extends EncounterObject {

    /**
     * Constructs player-controlled spaceship
     *
     * @param {Encounter} encounter - reference to encounter this object belongs t
     * @param {Vector} position - position of this object
     */
    constructor(encounter, position) {
        super(encounter, Type.PLAYER_SHIP, PLAYER_RADIUS, position, AssetLoader.getAsset(PLAYER_ASSET_NAME));

        this.velocityMagnitude = 0.0;

        this.targetVelocity = 0.0;
        this.targetAngularVelocity = 0.0;

        this.flicker = 0.0;
        this.gunCooldown = GUN_COOLDOWN;
    }

    /**
     * Checks, whether the player's spaceship should accelerate
     *
     * @param {Input} input - object holding information about user input
     * @returns True in case the spaceship should accelerate, false otherwise
     */
    shouldAccelerate(input) {
        return input.keyPressed(KEY_ACCELERATE) && !input.keyPressed(KEY_BRAKE);
    }

    /**
     * Checks, whether the player's spaceship should brake
     *
     * @param {Input} input - object holding information about user input
     * @returns True in case the spaceship should brake, false otherwise
     */
    shouldBrake(input) {
        return input.keyPressed(KEY_BRAKE) && !input.keyPressed(KEY_ACCELERATE);
    }

    /**
     * Handles the speed associated user commands
     *
     * @param {Input} input - object holding information about user input
     */
    handleSpeedCommands(input) {
        if (this.shouldAccelerate(input)) {
            this.targetVelocity = MAXIMAL_SPEED;
        } else if (this.shouldBrake(input)) {
            this.targetVelocity = MINIMAL_SPEED;
        } else {
            this.targetVelocity = NORMAL_SPEED;
        }
    }

    /**
     * Checks, whether the player's spaceship should turn left
     *
     * @param {Input} input - object holding information about user input
     * @returns True in case the spaceship should turn left, false otherwise
     */
    shouldTurnLeft(input) {
        return input.keyPressed(KEY_TURN_LEFT) && !input.keyPressed(KEY_TURN_RIGHT);
    }

    /**
     * Checks, whether the player's spaceship should turn right
     *
     * @param {Input} input - object holding information about user input
     * @returns True in case the spaceship should turn right, false otherwise
     */
    shouldTurnRight(input) {
        return input.keyPressed(KEY_TURN_RIGHT) && !input.keyPressed(KEY_TURN_LEFT);
    }

    /**
     * Handles the direction associated user commands
     *
     * @param {Input} input - object holding information about user input
     */
    handleDirectionCommands(input) {
        if (this.shouldTurnLeft(input)) {
            this.targetAngularVelocity = -TURNING_ANGULAR_VELOCITY;
        } else if (this.shouldTurnRight(input)) {
            this.targetAngularVelocity = TURNING_ANGULAR_VELOCITY;
        } else {
            this.targetAngularVelocity = 0.0;
        }
    }

    /**
     * Checks, whether the player's spaceship should shoot
     *
     * @param {Input} input - object holding information about user input
     * @returns True in case the spaceship should shoot, false otherwise
     */
    shouldShoot(input) {
        return input.keyPressed(KEY_SHOOT);
    }

    /**
     * Handles the user commands associated with weapons
     *
     * @param {Input} input - object holding information about user input
     */
    handleWeaponCommands(input) {
        if (this.shouldShoot(input) && this.gunCooldown <= 0.0) {
            // TODO: Spawn bullet

            this.gunCooldown = GUN_COOLDOWN;
        }
    }

    /**
     * Updates the current velocity and angular velocity to move them closer to their target values
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     */
    updateVelocities(elapsedTime) {
        let velocityVector = this.targetVelocity - this.velocityMagnitude;
        let acceleration = Math.min(MAXIMAL_ACCELERATION * elapsedTime * MILISECOND_TO_SECOND_FACTOR, Math.abs(velocityVector));

        this.velocityMagnitude += Math.sign(velocityVector) * acceleration;

        this.velocity = new Vector(Math.sin(this.angle), -Math.cos(this.angle)).multiply(this.velocityMagnitude);
        this.angularVelocity = this.targetAngularVelocity;
    }

    /**
     * Updates the encounter object state
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {Input} input - object holding information about user input
     */
    update(elapsedTime, input) {
        this.handleSpeedCommands(input);
        this.handleDirectionCommands(input);
        this.handleWeaponCommands(input);

        this.updateVelocities(elapsedTime);
        this.superUpdate(elapsedTime, input);
    }

    /**
     * Renders content of the encounter object to the screen
     *
     * @param {DOMHighResTimeStamp} elapsedTime - time elapsed from last frame
     * @param {CanvasRenderingContext2D} context - context to render content on
     */
    render(elapsedTime, context) {
        this.superRender(elapsedTime, context);

        // TODO: Implement fancier rendering
    }
}