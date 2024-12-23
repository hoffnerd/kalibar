
// Types ----------------------------------------------------------------------------
import { type Maneuver } from "../maneuvers";



//______________________________________________________________________________________
// ===== Types & Interfaces =====



//______________________________________________________________________________________
// ===== Additional Actions =====

const dodge: Maneuver = {
    key: "dodge",
    display: "Dodge",
    description: "Use your action to double your Evasion skill until the start of your next turn.",
    action: (maneuver, user, target) => {
        console.log("dodge", {maneuver, user, target});
    },
}

const hide: Maneuver = {
    key: "hide",
    display: "Hide",
    description: "Use your action to make a Stealth skill check. On a success, your Aggro Rating (AR) will be 0%.",
    action: (maneuver, user, target) => {
        console.log("hide", {maneuver, user, target});
    },
}

const search: Maneuver = {
    key: "search",
    display: "Search",
    description: "Use your action to look for any additional loot you can pick up.",
    action: (maneuver, user, target) => {
        console.log("search", {maneuver, user, target});
    },
}

const swapEquipment: Maneuver = {
    key: "swapEquipment",
    display: "Swap Equipment",
    description: "Use your action to swap your equipment for other pieces of equipment from your inventory.",
    action: (maneuver, user, target) => {
        console.log("swapEquipment", {maneuver, user, target});
    },
}

const endTurn: Maneuver = {
    key: "endTurn",
    display: "End Turn",
    description: "Don't do anything for your turn.",
    action: (maneuver, user, target) => {
        console.log("endTurn", {maneuver, user, target});
    },
}




//______________________________________________________________________________________
// ===== Export =====

export type AdditionalActionKey = keyof typeof ADDITIONAL_ACTIONS;

export const ADDITIONAL_ACTIONS = {
    dodge,
    hide,
    search,
    swapEquipment,
    endTurn,
}
