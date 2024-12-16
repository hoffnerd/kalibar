
// Types ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface Skill {
    key: SkillKey;
    short: string;
    display: string;
    abilityKey: AbilityKey;
    description?: string;
    base: number,
    perTotalLevel: number,
    perAbilityLevel: number,
    max?: number;
    calculationType: "round" | "floor" | "raw";
}

export type AbilityLevels = {
    [key in AbilityKey]?: number;
}

export interface Ability {
    key: AbilityKey;
    short: string;
    display: string;
    description?: string;
    skills?: Array<Skill>;
}



//______________________________________________________________________________________
// ===== Skills =====

const magicAttack: Skill = {
    key: "magicAttack",
    short: "M Atk",
    display: "Magic Attack",
    abilityKey: "arcana",
    base: 1,
    perTotalLevel: 1,
    perAbilityLevel: 1,
    calculationType: "floor",
}

const magicDefense: Skill = {
    key: "magicDefense",
    short: "M Def",
    display: "Magic Defense",
    abilityKey: "arcana",
    base: 0,
    perTotalLevel: 0.25,
    perAbilityLevel: 0.5,
    max: 25,
    calculationType: "round",
}

const aggroManipulation: Skill = {
    key: "aggroManipulation",
    short: "Agr Manip",
    display: "Aggro Manipulation",
    abilityKey: "charisma",
    base: 1,
    perTotalLevel: 0.5,
    perAbilityLevel: 1,
    max: 50,
    calculationType: "round",
}

const initiative: Skill = {
    key: "initiative",
    short: "Init",
    display: "Initiative",
    abilityKey: "finesse",
    base: 0,
    perTotalLevel: 1,
    perAbilityLevel: 2,
    calculationType: "floor",
}

const accuracy: Skill = {
    key: "accuracy",
    short: "Acc",
    display: "Accuracy",
    abilityKey: "finesse",
    base: 0,
    perTotalLevel: 0.25,
    perAbilityLevel: 0.5,
    max: 25,
    calculationType: "round",
}

const evasion: Skill = {
    key: "evasion",
    short: "Eva",
    display: "Evasion",
    abilityKey: "finesse",
    base: 15,
    perTotalLevel: 0.5,
    perAbilityLevel: 1,
    max: 90,
    calculationType: "round",
}

const medicine: Skill = {
    key: "medicine",
    short: "Med",
    display: "Medicine",
    abilityKey: "wit",
    base: 0,
    perTotalLevel: 2,
    perAbilityLevel: 4,
    max: 500,
    calculationType: "round",
}

const physicalAttack: Skill = {
    key: "physicalAttack",
    short: "Phys Atk",
    display: "Physical Attack",
    abilityKey: "physicality",
    base: 1,
    perTotalLevel: 1,
    perAbilityLevel: 2,
    calculationType: "floor",
}

const physicalDefense: Skill = {
    key: "physicalDefense",
    short: "Phys Def",
    display: "Physical Defense",
    abilityKey: "physicality",
    base: 0,
    perTotalLevel: 0.25,
    perAbilityLevel: 0.5,
    max: 25,
    calculationType: "round",
}

const maxHealth: Skill = {
    key: "maxHealth",
    short: "Max HP",
    display: "Max Health Points",
    abilityKey: "vitality",
    base: 10,
    perTotalLevel: 5,
    perAbilityLevel: 10,
    calculationType: "floor",
}

const regenHealth: Skill = {
    key: "regenHealth",
    short: "Regen HP",
    display: "Regen Health Points",
    abilityKey: "vitality",
    base: 0,
    perTotalLevel: 0.5,
    perAbilityLevel: 1,
    calculationType: "floor",
}



//______________________________________________________________________________________
// ===== Abilities =====

const arcana: Ability = {
    key: "arcana",
    short: "arc",
    display: "Arcana",
    skills: [
        magicAttack,
        magicDefense,
    ],
}

const charisma: Ability = {
    key: "charisma",
    short: "cha",
    display: "Charisma",
    skills: [
        aggroManipulation,
    ],
}

const finesse: Ability = {
    key: "finesse",
    short: "fin",
    display: "Finesse",
    skills: [
        initiative,
        accuracy,
        evasion,
    ],
}

const wit: Ability = {
    key: "wit",
    short: "wit",
    display: "Sense/Wit",
    skills: [
        medicine,
    ],
}

const physicality: Ability = {
    key: "physicality",
    short: "phy",
    display: "Physicality",
    skills: [
        physicalAttack,
        physicalDefense,
    ],
}

const vitality: Ability = {
    key: "vitality",
    short: "vit",
    display: "Vitality",
    skills: [
        maxHealth,
        regenHealth,
    ],
}



//______________________________________________________________________________________
// ===== Export =====

export type SkillOptional = {
    [key in SkillKey]?: Skill;
};

export type SkillKey = keyof typeof SKILLS;

export const SKILLS = {
    // arcana
    magicAttack,
    magicDefense,

    // charisma
    aggroManipulation,

    // finesse
    initiative,
    accuracy,
    evasion,

    // wit
    medicine,

    // physicality
    physicalAttack,
    physicalDefense,

    // vitality
    maxHealth,
    regenHealth,
}

/** The default ability levels a character has */
export const DEFAULT_ABILITY_LEVELS: AbilityLevels = {
    arcana: 0,
    charisma: 0,
    finesse: 0,
    wit: 0,
    physicality: 0,
    vitality: 0,
}

export type AbilityKey = keyof typeof ABILITIES;

export const ABILITIES = {
    arcana,
    charisma,
    finesse,
    wit,
    physicality,
    vitality,
}
