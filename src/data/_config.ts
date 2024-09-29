
// Types ----------------------------------------------------------------------------
import { type Role } from "@prisma/client";
import { type NavItems } from "@/interfaces";


//______________________________________________________________________________________
// ===== Project Configuration =====

/** the readable name of the project. */
export const PROJECT_DISPLAY_NAME = "Project Kalibar";

/** the description of the project. */
export const PROJECT_DESCRIPTION = "A game developed by the NextGenScripts team.";

/** the user role "rankings" of the project. Higher index, the more power that role has */
export const PROJECT_ROLE_MAPPER: Array<Role | string> = [ "UNAUTHORIZED", "USER", "TESTER", "ADMIN" ]




//______________________________________________________________________________________
// ===== Route Configuration =====

/** the route that the home page is on. */
export const ROUTE_HOME = "/";

/** the route that the login page is on. */
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
