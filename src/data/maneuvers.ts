
// Types ----------------------------------------------------------------------------
import { Character } from "@/typeDefs";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface Maneuver {
    key: string;
    display: string;
    description?: string;
    action: (maneuver?: Maneuver, user?: Character, target?: Character) => void | any;
    icon?: string;
}


//______________________________________________________________________________________
// ===== Maneuvers =====

const debugPhysicalAttack: Maneuver = {
    key: "debugPhysicalAttack",
    display: "Debug Physical Attack",
    description: "A test attack that does physical damage.",
    action: (maneuver, user, target) => {
        console.log("DEBUG: Physical Attack", {maneuver, user, target});
    },
}

const debugMagicalAttack: Maneuver = {
    key: "debugMagicalAttack",
    display: "Debug Magical Attack",
    description: "A test attack that does magical damage.",
    action: (maneuver, user, target) => {
        console.log("DEBUG: Magical Attack", {maneuver, user, target});
    },
}



//______________________________________________________________________________________
// ===== Export =====

export type ManeuverKey = keyof typeof MANEUVERS;

export const MANEUVERS = {
    debugPhysicalAttack,
    debugMagicalAttack,


}
