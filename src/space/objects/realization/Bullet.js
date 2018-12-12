import EncounterObject from "../pattern/encounterObject";
import EncounterObjectType from "../pattern/encounterObjectType";
import AssetLoader from "../../utils/assetLoader";
import Vector from "../../utils/vector";

const RADIUS = 4;
const SPEED = 512;
const DESTROY_DURATION = 17;
const ASSET_NAME_GREEN = "laserGreen";
const ASSET_NAME_GREEN_SHOT = "laserGreenShot";
const ASSET_NAME_RED = "laserRed";
const ASSET_NAME_RED_SHOT = "laserRedShot";

export const BULLET_DAMAGE = 8;

export default class Bullet extends EncounterObject {

    /**
     * Constructs a bullet
     *
     * @param {Encounter} encounter - reference to encounter this object belongs t
     * @param {Vector} position - position of this object
     * @param {Vector} direction - direction in with to fire
     * @param {BulletType} bulletType
     */
    constructor(encounter, position, direction, bulletType = BulletType.RED) {
        let assetName = "", assetNameShot = "";
        if (bulletType === BulletType.RED) {
            assetName = ASSET_NAME_RED;
            assetNameShot = ASSET_NAME_RED_SHOT;
        } else if (bulletType === BulletType.GREEN) {
            assetName = ASSET_NAME_GREEN;
            assetNameShot = ASSET_NAME_GREEN_SHOT;
        } else {
            console.error("bullet: Undefined bullet type, defaults to RED");
            bulletType = BulletType.RED;
            assetName = ASSET_NAME_RED;
            assetNameShot = ASSET_NAME_RED_SHOT;
        }
        super(
            encounter,
            EncounterObjectType.BULLET,
            RADIUS,
            position.add(Vector.normalize(direction).multiply(RADIUS)),
            AssetLoader.getAsset(assetName)
        );

        this.killable = true;
        this.velocity = Vector.normalize(direction).multiply(SPEED);
        this.angle = this.velocity.angle() + Math.PI / 2;

        this.bulletType = bulletType;
        this.assetName = assetName;
        this.assetNameShot = assetNameShot;
    }

    update(elapsedTime, input) {
        this.superUpdate(elapsedTime, input);
    }

    render(elapsedTime, context) {
        this.superRender(elapsedTime, context);
    }

    initialize() {
        this.assetShot = AssetLoader.getAsset(this.assetNameShot);
    }

    startDestroyAnimation() {
        if (this.destroyCounter === undefined) {
            this.destroyCounter = DESTROY_DURATION;
        }
    }

    hit(amount) {
        if (!this.killable) return;

        this.health -= amount;
        if (this.health <= 0) {
            this.startDestroyAnimation();
        }
    }
}


export const BulletType = {
    GREEN: 0b1 << 0,
    RED: 0b1 << 1,
};
