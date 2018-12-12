import EncounterObject from "../pattern/encounterObject";
import EncounterObjectType from "../pattern/encounterObjectType";
import AssetLoader from "../../utils/assetLoader";
import Vector from "../../utils/vector";
import Bullet, { BulletType } from "./Bullet";

const RADIUS = 32;
const ASSET_SHIP = "enemyShip";
const ASSET_UFO = "enemyUFO";
const MAX_VELOCITY = 200;
const MAX_ACCELERATION = 50;
const MIN_DISTANCE = 128;
const GUN_COOLDOWN_MIN = 300;
const GUN_COOLDOWN_MAX = 3000;

export default class EnemyShip extends EncounterObject {

    constructor(encounter, position, enemyType = EnemyType.SHIP) {
        let assetName = "";
        if (enemyType === EnemyType.SHIP) {
            assetName = ASSET_SHIP;
        } else if (enemyType === EnemyType.UFO) {
            assetName = ASSET_UFO;
        } else {
            console.error("enemyShip: Undefined enemy type, defaults to SHIP");
            enemyType = EnemyType.SHIP;
            assetName = ASSET_SHIP;
        }

        super(encounter, EncounterObjectType.ENEMY_SHIP, RADIUS, position, AssetLoader.getAsset(assetName));

        this.killable = true;

        this.assetName = assetName;
    }

    update(elapsedTime, input) {
        this.handleFire(elapsedTime);
        this.updateVelocity(elapsedTime, input);

        this.superUpdate(elapsedTime, input);
    }

    render(elapsedTime, context) {
        this.superRender(elapsedTime, context);
    }

    initialize() {
        this.setCooldown();
    }

    updateVelocity(elapsedTime, input) {
        let distanceVector = Vector.subtract(this.encounter.playerShip.position, this.position);
        let targetDirectionVector = Vector.normalize(distanceVector);
        let targetVelocityVector = Vector.multiply(targetDirectionVector, MAX_VELOCITY);
        let dV = Vector.subtract(targetVelocityVector, this.velocity);

        // TODO: Better physics

        distanceVector.subtract(Vector.multiply(targetDirectionVector, MIN_DISTANCE));

        let velocity = this.velocity.magnitude();

        this.velocity.x = (this.velocity.x + targetVelocityVector.x) / 2;
        this.velocity.y = (this.velocity.y + targetVelocityVector.y) / 2;

        this.angle = this.velocity.angle() - Math.PI / 2;
    }

    handleFire(elapsedTime) {
        this.cooldown -= elapsedTime;
        if (this.cooldown <= 0) {
            let position = Vector.add(this.position, Vector.normalize(this.velocity).multiply(RADIUS));
            let bullet = new Bullet(this.encounter, position, this.velocity, BulletType.GREEN);
            this.encounter.addObject(bullet);
            this.setCooldown();
        }
    }

    setCooldown() {
        this.cooldown = Math.round(Math.random() * (GUN_COOLDOWN_MAX - GUN_COOLDOWN_MIN) + GUN_COOLDOWN_MIN);
    }
}


export const EnemyType = {
    SHIP: 0b1 << 0,
    UFO: 0b1 << 1,
};
