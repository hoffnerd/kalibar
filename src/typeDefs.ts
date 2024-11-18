import { 
    type Role,
    type SaveFile as SaveFilePrisma,
} from "@prisma/client";
import { type NarrativeKey } from "./data/narrative";
import { type CharacterKey } from "./data/characters";



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

export interface AbilityLevels {
    arcana?: number;
    charisma?: number;
    finesse?: number;
    wit?: number;
    physicality?: number;
}

export interface Crew {
    dante: Character;
    zig?: Character;
    zorg?: Character;
}

export interface SaveData {
    crew: Crew;
    party: Array<CharacterKey>;
    narrative: Array<NarrativeKey>;
}

export interface SaveFile extends Omit<SaveFilePrisma, 'saveData'> {
    saveData: SaveData
}



//______________________________________________________________________________________
// ===== Characters =====

export type CharacterEquipmentKey = keyof CharacterEquipment;
export interface CharacterEquipment {
    headGear?: string;
    armor?: string;
    necklace?: string;
    rings?: Array<string>;
    leftHand?: string;
    rightHand?: string;
    bothHands?: string;
}

export type CharacterRelation = "friendly" | "enemy" | "none"

export interface Character {
    key: string;
    display: string;
    fullName?: string;
    relation: CharacterRelation;
    abilities: AbilityLevels;
    proficiencies: Array<string>;
    talents: Array<string>;
    equipment: CharacterEquipment;
}

export interface CombatEntity extends Character {
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
    proficiencies?: Array<string>;
    talents?: Array<string>;
    equipment?: any;
}

export interface CombatEntityOptional extends CharacterOptional {
    isDead?: boolean;
    isUnconscious?: boolean;
    isHidden?: boolean;
}