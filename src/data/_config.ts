
// Types ----------------------------------------------------------------------------
import { type Role, type SaveFileType } from "@prisma/client";
import { type ServerActionReturn } from "@/server/actions";
import { type SaveData, type NavItems, type Character, type CharacterSaveData, type CombatEntity } from "@/typeDefs";
// Data -----------------------------------------------------------------------------
import { CHARACTERS } from "./characters";
import { DEFAULT_ABILITY_LEVELS } from "./abilities";



//______________________________________________________________________________________
// ===== Project Configuration =====

/** the readable name of the project. */
export const PROJECT_DISPLAY_NAME = "Project Kalibar";

/** the description of the project. */
export const PROJECT_DESCRIPTION = "A game developed by the NextGenScripts team.";

/** the user role "rankings" of the project. Higher index, the more power that role has */
export const PROJECT_ROLE_MAPPER: Array<Role> = [ "UNAUTHORIZED", "USER", "TESTER", "ADMIN" ]

/** The lowest role needed to play the game */
export const PROJECT_LOWEST_ROLE_FOR_PLAY: Role = "TESTER";

/** Object that lists errors that can occur across the project */
export const PROJECT_ERRORS = {
    // e: { key:"e", display:"" },
    e_unauthorized: { key:"e_unauthorized", display:"Unauthorized!" },
    e_forbidden: { key:"e_forbidden", display:"Forbidden!" },
}

export const PROJECT_BACKGROUND = "bg-gradient-to-b from-[#121212] to-[#15162c]";

export const DEFAULT_SERVER_ACTION_RETURN: ServerActionReturn = {
    error: true,
    message: "Default Error!",
    data: null,
}

//______________________________________________________________________________________
// ===== Route Configuration =====

export const ROUTE_HOME = "/";

export const ROUTE_LOGIN = "/api/auth/signin";



//______________________________________________________________________________________
// ===== Navigation Configuration =====

export const NAVIGATION_MAIN: NavItems = [
	{
		key: "home",
		display: "Home",
		itemType: "internalLink",
		link: ROUTE_HOME,
	},
	{
		key: "play",
		display: "Play",
		itemType: "internalLink",
		link: "/play",
	},
]

export const NAVIGATION_AUTH: NavItems = [
	{
		key: "saves",
		display: "My Saves",
		itemType: "internalLink",
		link: "/play",
		requiredRole: "USER",
	},
];



//______________________________________________________________________________________
// ===== Characters =====

// export const DEFAULT_COMBAT_ENTITY: CombatEntity = {
//     ...DEFAULT_CHARACTER,
//     isDead: false,
//     isUnconscious: false,
//     isHidden: true,
// }

/** @constant {number} - how many ability points a character has at level 0. */
export const ABILITY_POINTS_AT_LEVEL_0 = 5;



//______________________________________________________________________________________
// ===== Save File Configuration =====

/** An array of objects where each object has data related to its respective SaveFileType */
export const SAVE_FILE_TYPE_MAPPER: Array<{
    key: SaveFileType;
    display?: string;
    disabled?: boolean;
    invisible?: boolean;
}> = [
    { key:"STORY", display:"Story",  disabled:true },
    { key:"UNLIMITED", display:"Unlimited", disabled:true },
    { key:"DEBUG_NARRATIVE" },
    { key:"DEBUG_COMBAT" },
    { key:"DEBUG_MISSIONS", disabled:true },
];

/** The default saveData each safe file should have. */
export const DEFAULT_SAVE_DATA: SaveData = {
    crew: {
        dante: CHARACTERS.dante,
    },
    party: [ "dante" ],
    narrative: [],
    inventory: {
        debugPhysicalWeapon: 1,
        debugMagicalWeapon: 1,
        potionHealthLevel1: 1,
    },
}