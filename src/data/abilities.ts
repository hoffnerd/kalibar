
// Types ----------------------------------------------------------------------------
import { AbilityLevels } from "@/typeDefs"



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface Ability {
    key: AbilityKey;
    short: string;
    display: string;
    description?: string;
    proficiencies?: Array<any>;
    talents?: Array<any>;
}



//______________________________________________________________________________________
// ===== Abilities =====

const arcana: Ability = {
    key: "arcana",
    short: "arc",
    display: "Arcana",
}

const charisma: Ability = {
    key: "charisma",
    short: "cha",
    display: "Charisma",
}

const dexterity: Ability = {
    key: "dexterity",
    short: "dex",
    display: "Dexterity",
}

const wisdom: Ability = {
    key: "wisdom",
    short: "wis",
    display: "Wisdom",
}

const physicality: Ability = {
    key: "physicality",
    short: "phys",
    display: "Physicality",
}



//______________________________________________________________________________________
// ===== Export =====

/** The default ability levels a character has */
export const DEFAULT_ABILITY_LEVELS: AbilityLevels = {
    arcana: 0,
    charisma: 0,
    dexterity: 0,
    wisdom: 0,
    physicality: 0,
}

export type AbilityKey = keyof typeof ABILITIES;

export const ABILITIES = {
    arcana,
    charisma,
    dexterity,
    wisdom,
    physicality,
}
