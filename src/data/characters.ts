
// Types ----------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { Character, CharacterOptional } from "@/typeDefs";
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
    if(characterDetails.proficiencies) newCharacter.proficiencies = handleCharacterArrayProperties(newCharacter.proficiencies, characterDetails.proficiencies);
    if(characterDetails.talents) newCharacter.talents = handleCharacterArrayProperties(newCharacter.talents, characterDetails.talents);

    if(characterDetails.equipment) newCharacter.equipment = handleCharacterObjectProperties(newCharacter.equipment, characterDetails.equipment);
    return newCharacter;
}



//______________________________________________________________________________________
// ===== Characters =====

export const DEFAULT_CHARACTER: Character = {
    key: "???",
    display: "???",
    relation: "none",
    abilities: { ...DEFAULT_ABILITY_LEVELS },
    proficiencies: [],
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
})

const zig = createCharacter({
    key: "zig",
    display: "Zig",
    fullName: "Zig Nuustor",
})

const zorg = createCharacter({
    key: "zorg",
    display: "Zorg",
    fullName: "Zorg Nuustor",
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