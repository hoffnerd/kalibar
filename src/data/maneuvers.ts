
// Types ----------------------------------------------------------------------------
import { type Character } from "@/typeDefs";
import { type SkillCalculation, type SkillKey } from "./abilities";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

interface ManeuverBase {
    key: string;
    display: string;
    description?: string;
    action: (maneuver?: Maneuver, user?: Character, target?: Character) => void | any;
    icon?: string;
    targetType?: "ally" | "opponent";
    targetAmount?: "self" | "individual" | "all";
    targetMath?: "add" | "subtract";
}

export type Maneuver = ManeuverBase & SkillCalculation;


//______________________________________________________________________________________
// ===== Maneuvers =====

const debugPhysicalAttack: Maneuver = {
    key: "debugPhysicalAttack",
    display: "Debug Physical Attack",
    description: "A test attack that does physical damage.",
    action: (maneuver, user, target) => {
        console.log("DEBUG: Physical Attack", {maneuver, user, target});
    },
    targetType: "opponent",
    targetAmount: "individual",
    targetMath: "subtract",
    skill: "physicalAttack",
    base: 2,
    perTotalLevel: 1,
    perAbilityLevel: 1,
}

const debugMagicalAttack: Maneuver = {
    key: "debugMagicalAttack",
    display: "Debug Magical Attack",
    description: "A test attack that does magical damage.",
    action: (maneuver, user, target) => {
        console.log("DEBUG: Magical Attack", {maneuver, user, target});
    },
    targetType: "opponent",
    targetAmount: "all",
    targetMath: "subtract",
    skill: "magicAttack",
}





const razorsBlade: Maneuver = {
    key: "razorsBlade",
    display: "Razor's Blade",
    description: "Make a slashing attack while the Razor is in the blade form.",
    action: (maneuver, user, target) => {
        console.log("Razor's Blade", {maneuver, user, target});
    },
    targetType: "opponent",
    targetAmount: "individual",
    targetMath: "subtract",
    skill: "physicalAttack",
    base: 10,
    perTotalLevel: 5,
    perAbilityLevel: 10,
}

const razorsWhip: Maneuver = {
    key: "razorsWhip",
    display: "Razor's Whip",
    description: "Make a whipping attack, targeting all opponent, while the Razor is in the whip form.",
    action: (maneuver, user, target) => {
        console.log("Razor's Whip", {maneuver, user, target});
    },
    targetType: "opponent",
    targetAmount: "individual",
    targetMath: "subtract",
    base: 4,
    perTotalLevel: 2,
    perAbilityLevel: 4,
}


//______________________________________________________________________________________
// ===== Export =====

export type ManeuverKey = keyof typeof MANEUVERS;

export const MANEUVERS = {
    debugPhysicalAttack,
    debugMagicalAttack,

    razorsBlade,
    razorsWhip,
}
