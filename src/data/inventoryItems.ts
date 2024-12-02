
// Types ----------------------------------------------------------------------------
import { type CharacterEquipmentKey } from "@/typeDefs";
import { type ManeuverKey } from "./maneuvers";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface InventoryItem {
    key: string;
    display: string;
    description?: string;
    icon?: string;

    /** Used to determine how the item is displayed. "equipment" handles "headGear", "armor", "necklace", and "rings" */
    type: "consumable" | "equipment" | "story" | "weapon" | "shield" | "spellFocus";

    equippable?: boolean;
    equipLocation?: Array<CharacterEquipmentKey>;
    maneuvers?: Array<ManeuverKey>;
}


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
}



//______________________________________________________________________________________
// ===== Export =====

export type InventoryItemKey = keyof typeof INVENTORY_ITEMS;

export const INVENTORY_ITEMS = {
    debugPhysicalWeapon,
    debugMagicalWeapon,

    potionHealthLevel1,
}
