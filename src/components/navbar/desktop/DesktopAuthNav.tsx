// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type NavItems, type NavOptions } from "@/interfaces";
// Packages -------------------------------------------------------------------------
// Actions --------------------------------------------------------------------------
import { getServerAuthSession } from "@/server/auth";
// Shadcn-ui ------------------------------------------------------------------------
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/ui/avatar";
// Components -----------------------------------------------------------------------
import DesktopNavSubItem from "./DesktopNavSubItem";
import { SignInButton, SignOutButton } from "../SignInAndOutButtons";
// Other ----------------------------------------------------------------------------
import { getInitials } from "@/utils/navbar";



//______________________________________________________________________________________
// ===== Component =====

/**
 * The auth section of the navbar on desktop
 * @param props
 * @param props.authNavItems - Items to fill the auth nav menu with
 * @param props.options - Options for the navbar
 */
export default async function DesktopAuthNav({
    authNavItems,
    options,
}: {
    authNavItems: NavItems;
    options?: NavOptions;
}) {
    // Get the session
    const session = await getServerAuthSession();

    // If the user is not logged in
    if (!(session && session.user)) {
        // If we are not showing the sign in button, return early
        if (!(options && options.showSignInButtonWhenLoggedOut)) return;

        // Show the sign in button
        return (
            <NavigationMenuList>
                <NavigationMenuItem>
                    <SignInButton className={` ${navigationMenuTriggerStyle()} !w-full flex flex-col !items-start h-full`}>
                        Sign In
                    </SignInButton>
                </NavigationMenuItem>
            </NavigationMenuList>
        );
    }

    // If the user is logged in, show the auth nav menu
    return (
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger className="h-full">
                    <Avatar>
                        <AvatarImage src={session.user.image || undefined} alt={`Avatar of user ${session.user.screenName || session.user.email}`}/>
                        <AvatarFallback>{getInitials(session)}</AvatarFallback>
                    </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <div className="container m-auto">
                        <ul className="grid grid-cols-2 gap-3 p-6">

                            {/* Show the auth nav items */}
                            {authNavItems.map((item) => <DesktopNavSubItem key={item.key} subItem={item} /> )}

                            {((authNavItems.length && !(authNavItems.length%2)) || authNavItems.length === 0) && <li></li>}

                            {/* Sign out button is the last thing in the auth menu */}
                            <li>
                                <SignOutButton className={`${navigationMenuTriggerStyle()} !w-full flex flex-col !items-start h-full`}>
                                    <p className="text-xl">Sign Out</p>
                                </SignOutButton>
                            </li>
                        </ul>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    );
}
