
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

const finesse: Ability = {
    key: "finesse",
    short: "fin",
    display: "Finesse",
}

const wit: Ability = {
    key: "wit",
    short: "wit",
    display: "Sense/Wit",
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
    finesse: 0,
    wit: 0,
    physicality: 0,
}

export type AbilityKey = keyof typeof ABILITIES;

export const ABILITIES = {
    arcana,
    charisma,
    finesse,
    wit,
    physicality,
}
