
// Types ----------------------------------------------------------------------------
import { type CharacterEquipmentKey } from "@/typeDefs";
import { type ManeuverKey } from "./maneuvers";
import { type SkillCalculation } from "./abilities";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface InventoryItemBase {
    key: string;
    display: string;
    description?: string;
    icon?: string;

    /** Used to determine how the item is displayed. "equipment" handles "headGear", "armor", "necklace", and "rings" */
    type: "consumable" | "equipment" | "story" | "weapon" | "shield" | "spellFocus";

    equippable?: boolean;
    equipLocation?: Array<CharacterEquipmentKey>;
    maneuvers?: Array<ManeuverKey>;
    targetType?: "ally" | "opponent";
    targetAmount?: "self" | "individual" | "all";
    targetMath?: "add" | "subtract";
}

export type InventoryItem = InventoryItemBase & SkillCalculation;

//______________________________________________________________________________________
// ===== Items =====

const debugPhysicalWeapon: InventoryItem = {
    key: "debugPhysicalWeapon",
    display: "Debug Physical Weapon",
    description: "A test item that does physical damage.",
    type: "weapon",
    equippable: true,
    equipLocation: ["leftHand", "rightHand", "bothHands"],
    maneuvers: ["debugPhysicalAttack"],
}

const debugMagicalWeapon: InventoryItem = {
    key: "debugMagicalWeapon",
    display: "Debug Magical Weapon",
    description: "A test item that does magical damage.",
    type: "spellFocus",
    equippable: true,
    equipLocation: ["leftHand", "rightHand", "bothHands"],
    maneuvers: ["debugMagicalAttack"],
}

const potionHealthLevel1: InventoryItem = {
    key: "potionHealthLevel1",
    display: "Potion of Health (Level 1)",
    description: "A potion that restores 10 health points (plus Medicine Skill).",
    type: "consumable",
    targetType: "ally",
    targetAmount: "individual",
    targetMath: "add",
    skill: "medicine",
    base: 10,
}



const razor: InventoryItem = {
    key: "razor",
    display: "Razor",
    description: "The blade of the razor is made of polyenne fiber, and is harder than diamond. The blade is about a meter long when in sword form, and can be toggled via a button into the form of a whip twice the length of the stiffened blade. When in whip form, its shape can be altered at will with a chemical impulse. As a result, the razor is an incredibly versatile weapon. The average length of the razor is one meter, but the maximum length is one and a half meters long.",
    type: "weapon",
    equippable: true,
    equipLocation: ["leftHand", "rightHand"],
    maneuvers: ["razorsBlade", "razorsWhip"],
}



//______________________________________________________________________________________
// ===== Export =====

export type InventoryItemKey = keyof typeof INVENTORY_ITEMS;

export const INVENTORY_ITEMS = {
    debugPhysicalWeapon,
    debugMagicalWeapon,

    potionHealthLevel1,

    razor,
}
