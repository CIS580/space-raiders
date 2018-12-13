
/**
 * Enumeration describing types of encounter game objects
 */

let EncounterObjectType = {
    PLAYER_SHIP :       0b1 << 0,
    ENEMY_SHIP :        0b1 << 1,
    ALLY_SHIP :         0b1 << 2,
    ASTEROID :          0b1 << 3,
    BLACK_HOLE :        0b1 << 4,
    BLACK_HOLE_RADIUS:  0b1 << 5,
    LOOP_HOLE :         0b1 << 6,
    EXPLOSIVE :         0b1 << 7,
    EXPLOSION:          0b1 << 8,
    SLOW :              0b1 << 9,
    BULLET :            0b1 << 10,
};

Object.freeze(EncounterObjectType);
export default EncounterObjectType;
