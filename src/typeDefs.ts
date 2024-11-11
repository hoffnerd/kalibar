import { 
    type Role,
    type SaveFile as SaveFilePrisma,
} from "@prisma/client";
import { type NarrativeKey } from "./data/narrative";
import { Character, type CharacterKey } from "./data/characters";



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
    arcana: number;
    charisma: number;
    dexterity: number;
    wisdom: number;
    physicality: number;
}

export interface Crew {
    dante?: Character;
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