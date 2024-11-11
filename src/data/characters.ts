
// Types ----------------------------------------------------------------------------
import { type AbilityLevels } from "@/typeDefs";
// Data -----------------------------------------------------------------------------
import { AbilityKey, DEFAULT_ABILITY_LEVELS } from "./abilities";



//______________________________________________________________________________________
// ===== Functions =====

const createCharacter = (characterDetails: {
    key: string;
    display: string;
    fullName?: string;
    relation?: CharacterRelation;
    abilities?: AbilityLevels;
    proficiencies?: Array<string>;
    talents?: Array<string>;
}) => {
    let newCharacter = structuredClone(DEFAULT_CREW_CHARACTER);

    if(characterDetails.key) newCharacter.key = characterDetails.key as CharacterKey;
    if(characterDetails.display) newCharacter.display = characterDetails.display;
    if(characterDetails.fullName) newCharacter.fullName = characterDetails.fullName;
    if(characterDetails.relation) newCharacter.relation = characterDetails.relation;

    characterDetails.abilities && (Object.keys(characterDetails.abilities) as Array<AbilityKey>).forEach(abilityKey => {
        if(!(newCharacter.abilities[abilityKey] && characterDetails?.abilities?.[abilityKey])) return;
        newCharacter.abilities[abilityKey] = characterDetails.abilities[abilityKey];
    })

    if(characterDetails.proficiencies){
        newCharacter.proficiencies = [ ...new Set([ ...newCharacter.proficiencies, ...characterDetails.proficiencies ]) ];
    }

    if(characterDetails.talents){
        newCharacter.talents = [ ...new Set([ ...newCharacter.talents, ...characterDetails.talents ]) ];
    }

    return newCharacter;
}



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export type CharacterRelation = "friendly" | "enemy" | "none"

export interface Character {
    key: CharacterKey;
    display: string;
    fullName?: string;
    relation: CharacterRelation;
    abilities: AbilityLevels;
    proficiencies: Array<string>;
    talents: Array<string>;
}




//______________________________________________________________________________________
// ===== Details =====

/** The default character */
export const DEFAULT_CREW_CHARACTER: Character = {
    key: "???",
    display: "???",
    relation: "none",
    abilities: { ...DEFAULT_ABILITY_LEVELS },
    proficiencies: [],
    talents: [],
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
    "???": DEFAULT_CREW_CHARACTER,
    dante,
    zig,
    zorg,
}