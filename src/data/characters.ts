
// Types ----------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { type Character, type CharacterSaveData, type CharacterOptional } from "@/typeDefs";
import { DEFAULT_ABILITY_LEVELS } from "./abilities";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Functions =====

const handleCharacterObjectProperties = (defaultObj: any, obj: any) => {
    let objToReturn = structuredClone(defaultObj);
    obj && (Object.keys(obj) as Array<any>).forEach(key => {
        if(obj?.[key]) objToReturn[key] = obj[key];
    })
    return objToReturn;
}

const handleCharacterArrayProperties = (defaultArray: Array<any>, array: Array<any>) => {
    return [ ...new Set([ ...defaultArray, ...array ]) ]
}

/**
 * Creates a new character object by merging provided character details with default values.
 * @param characterDetails - object, with the details for the character you are building.
 */
export const createCharacter = (characterDetails: CharacterOptional) => {
    let newCharacter = structuredClone(DEFAULT_CHARACTER);

    if(characterDetails.key) newCharacter.key = characterDetails.key;
    if(characterDetails.display) newCharacter.display = characterDetails.display;
    if(characterDetails.fullName) newCharacter.fullName = characterDetails.fullName;
    if(characterDetails.relation) newCharacter.relation = characterDetails.relation;

    if(characterDetails.abilities) newCharacter.abilities = handleCharacterObjectProperties(newCharacter.abilities, characterDetails.abilities);
    if(characterDetails.talents) newCharacter.talents = handleCharacterArrayProperties(newCharacter.talents, characterDetails.talents);

    if(characterDetails.equipment) newCharacter.equipment = handleCharacterObjectProperties(newCharacter.equipment, characterDetails.equipment);
    return newCharacter;
}



//______________________________________________________________________________________
// ===== Characters =====

export const DEFAULT_CHARACTER: CharacterSaveData = {
    key: "???",
    display: "???",
    relation: "none",
    abilities: { ...DEFAULT_ABILITY_LEVELS },
    talents: [],
    equipment: {},
}



//______________________________________________________________________________________
// ===== Characters =====

const dante = createCharacter({
    key: "dante",
    display: "Dante",
    fullName: "Dante Greyheart",
    relation: "friendly",
    abilities: {
        arcana: 1,
        charisma: 1,
        finesse: 0,
        wit: 1,
        physicality: 1,
        vitality: 1,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
    },
})

const zig = createCharacter({
    key: "zig",
    display: "Zig",
    fullName: "Zig Nuustor",
    relation: "friendly",
    abilities: {
        arcana: 3,
        wit: 2,
    },
    equipment: {
        rightHand: "debugMagicalWeapon",
    },
})

const zorg = createCharacter({
    key: "zorg",
    display: "Zorg",
    fullName: "Zorg Nuustor",
    relation: "friendly",
    abilities: {
        physicality: 3,
        vitality: 2,
    },
    equipment: {
        bothHands: "debugPhysicalWeapon",
    },
})




//______________________________________________________________________________________
// ===== Export =====

export type CharacterKey = keyof typeof CHARACTERS;
export const CHARACTERS = {
    "???": DEFAULT_CHARACTER,
    dante,
    zig,
    zorg,
}