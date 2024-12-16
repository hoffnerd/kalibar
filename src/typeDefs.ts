import { 
    type Role,
    type SaveFile as SaveFilePrisma,
} from "@prisma/client";
import { type NarrativeKey } from "./data/narrative";
import { type CharacterKey } from "./data/characters";
import { type AbilityLevels, type SkillKey } from "./data/abilities";
import { InventoryItemKey } from "./data/inventoryItems";
import { ManeuverKey } from "./data/maneuvers";



//______________________________________________________________________________________
// ===== Navbar =====

interface NavItemBase {
    key: string;
    display: string;
    subDisplay?: string;
    requiredRole?: Role;
}

interface NavItemLinkProperties {
    link: string;
    itemType: "internalLink" | "externalLink";
}

interface NavItemSuperProperties {
    itemType: "superItem";
    subItems: NavItems;
}

type NavItemLink = NavItemBase & NavItemLinkProperties;

type NavItemSuper = NavItemBase & NavItemSuperProperties;

export type NavItemSub = NavItemLink;

export type NavItem = NavItemLink | NavItemSuper | NavItemSub;

export type NavItems = NavItem[];

export interface NavOptions {
    showSignInButtonWhenLoggedOut?: boolean;
}



//______________________________________________________________________________________
// ===== Save File Types =====

export interface SaveData {
    crew: {
        [key in CharacterKey]?: CharacterSaveData;
    };
    party: Array<CharacterKey>;
    narrative: Array<NarrativeKey>;
    inventory: {
        [key in InventoryItemKey]?: number;
    };
}

export interface SaveFile extends Omit<SaveFilePrisma, 'saveData'> {
    saveData: SaveData
}



//______________________________________________________________________________________
// ===== Characters =====

export type CharacterSkill = {
    [key in SkillKey]?: number;
}

export type CharacterEquipmentKey = keyof CharacterEquipment;
export interface CharacterEquipment {
    headGear?: InventoryItemKey;
    armor?: InventoryItemKey;
    necklace?: InventoryItemKey;
    rings?: Array<InventoryItemKey>;
    leftHand?: InventoryItemKey;
    rightHand?: InventoryItemKey;
    bothHands?: InventoryItemKey;
}

export type CharacterRelation = "friendly" | "enemy" | "none"

export interface CharacterSaveData {
    key: string;
    display: string;
    fullName?: string;
    relation: CharacterRelation;
    abilities: AbilityLevels;
    talents: Array<string>;
    equipment: CharacterEquipment;
    maneuvers?: Array<ManeuverKey>;
    maneuversAvailable?: Array<ManeuverKey>;
}

export interface Character extends CharacterSaveData {
    skills: CharacterSkill;
}

export interface CombatEntity extends Character {
    hp: number;
    aggro?: number;
    isDead: boolean;
    isUnconscious: boolean;
    isHidden: boolean;
}

export interface CharacterOptional {
    key: string;
    display: string;
    fullName?: string;
    relation?: CharacterRelation;
    abilities?: AbilityLevels;
    talents?: Array<string>;
    equipment?: CharacterEquipment;
    maneuvers?: Array<ManeuverKey>;
    skills?: CharacterSkill;
}

export interface CombatEntityOptional extends CharacterOptional {
    isDead?: boolean;
    isUnconscious?: boolean;
    isHidden?: boolean;
}