// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type NavItems, type NavOptions } from "@/interfaces";
// Actions --------------------------------------------------------------------------
import { getServerAuthSession } from "@/server/auth";
// Components -----------------------------------------------------------------------
import DesktopNavbar from "./desktop/DesktopNavbar";
import MobileNavbar from "./mobile/MobileNavbar";
// Utils ----------------------------------------------------------------------------
import { checkRoleAccessLevel } from "@/utils";



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: NavOptions = {
    showSignInButtonWhenLoggedOut: true,
};



//______________________________________________________________________________________
// ===== Pure Functions =====

/**
 * Filter out nav items that the user is not authorized to see
 * @param navItems - The unfiltered nav items
 * @param session - The auth session
 */
const filterUnauthorizedNavItems = (navItems?: NavItems, session?: Session | null): NavItems => {
	if (!navItems) return [];

	// Filter out all items for which the user does not have the required role
	const filteredNavItems = navItems.filter(item => checkRoleAccessLevel(item?.requiredRole || "UNAUTHORIZED", session));

	// Iterate over all the nav items and call this function recursively on the super items
	for (let item of filteredNavItems) {
		if (item.itemType === "superItem") item.subItems = filterUnauthorizedNavItems(item.subItems, session);
	}

	return filteredNavItems;
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * @param {Object} props
 * @param {NavItems} props.navItems - Items to fill the navigation menu with
 * @param {NavItems} props.authNavItems - Items to fill the admin nav menu with
 * @param {React.JSX.Element} props.header - Element to be displayed as the header
 * @param {NavOptions} props.options - NavOptions for the navbar
 */
export default async function Navbar({
    navItems,
    authNavItems = undefined,
    header,
    options={},
}: {
    navItems: NavItems;
    authNavItems?: NavItems;
    header?: React.JSX.Element;
    options?: NavOptions;
}) {
    // Get the session
    const session = await getServerAuthSession();

    // Filter out the nav items the user is not allowed to see
    const allowedNavItems = filterUnauthorizedNavItems(navItems, session);
    const allowedAuthNavItems = filterUnauthorizedNavItems(authNavItems, session);

    // Add any custom options to the defaults
    const optionsToPass = { ...DEFAULT_OPTIONS, ...options };

    return (
        <div className="sticky-top-0 bg-background z-[1010] border-primary border-b-2">
            <MobileNavbar
                navItems={allowedNavItems}
                authNavItems={allowedAuthNavItems}
                header={header}
                options={optionsToPass}
            />
            <DesktopNavbar
                navItems={allowedNavItems}
                authNavItems={allowedAuthNavItems}
                header={header}
                options={optionsToPass}
            />
        </div>
    );
}
