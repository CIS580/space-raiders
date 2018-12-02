
/**
 * Enumeration describing types of encounter game objects
 */
var EncounterObjectType = {
    PLAYER_SHIP : 0b00000001,
    ENEMY_SHIP :  0b00000010,
    ALLY_SHIP :   0b00000100,
    ASTEROID :    0b00001000,
    BLACK_HOLE :  0b00010000,
    LOOP_HOLE :   0b00100000,
    EXPLOSIVE :   0b01000000
};

Object.freeze(EncounterObjectType);
export default EncounterObjectType;