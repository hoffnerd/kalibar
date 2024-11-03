// Types ----------------------------------------------------------------------------
import { type NavItems, type NavOptions } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { ChevronLeftIcon } from '@radix-ui/react-icons'
// Actions --------------------------------------------------------------------------
import { getServerAuthSession } from "@/server/auth";
// Shadcn-ui ------------------------------------------------------------------------
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/shadcn/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// Components -----------------------------------------------------------------------
import { SignInButton, SignOutButton } from "../SignInAndOutButtons";
import NavItemLinkWrapper from "../NavItemLinkWrapper";
import MobileNavItem from "./MobileNavItem";
// Other ----------------------------------------------------------------------------
import { getInitials } from "@/utils/navbar";



//______________________________________________________________________________________
// ===== Components =====

/**
 * Auth section for the navigation on mobile
 * @param props
 * @param props.authNavItems - Items to fill the auth nav menu with
 * @param props.options - Options for the navbar
 */
export default async function MobileAuthNavSheet({authNavItems, options}: { authNavItems?: NavItems; options?: NavOptions; }) {
	// Get the session
    const session = await getServerAuthSession();

	// If the user is not logged in
	if (!(session && session.user)) {
		// If we are not showing the sign in button, return early
		if (!(options && options.showSignInButtonWhenLoggedOut)) return;

		// Show the sign in button
		return <SignInButton className="text-xl border-2 rounded border-secondary p-2">Sign In</SignInButton>;
	}

	// If the user is logged in, show the auth nav menu
	return <Sheet>
		<SheetTrigger asChild>
			{/* Button here for accessability/semantic reasons */}
			<button>
				<Avatar className="text-foreground">
                    <AvatarImage src={session.user.image || undefined} alt={`Avatar of user ${session.user.screenName || session.user.email}`}/>
                    <AvatarFallback>{getInitials(session)}</AvatarFallback>
				</Avatar>
			</button>
		</SheetTrigger>
		<SheetContent className="overflow-auto z-[1011]">
			<SheetHeader className="flex !flex-row justify-end">
				{/* SheetTitle is used for browser semantics/accessability, VisuallyHidden is to hide it according to the radix docs */}
				<VisuallyHidden>
					<SheetTitle>Navigation Menu</SheetTitle>
				</VisuallyHidden>
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <ChevronLeftIcon className="h-8 w-8" />
                    <span className="sr-only">Go back a menu</span>
                </SheetClose>
			</SheetHeader>
			<ul className="flex flex-col pt-8">
				{authNavItems && authNavItems.map((item, index) => {
					return <li key={item.key}>
						{index !== 0 && <div className="h-[1px] bg-secondary" />}
						<NavItemLinkWrapper navItem={item}>
							<MobileNavItem navItem={item} options={options} />
						</NavItemLinkWrapper>
					</li>;
				})}
				<div className="h-[1px] bg-secondary" />
				<SignOutButton className="flex justify-between align-middle w-full text-xl py-2">Sign Out</SignOutButton>
			</ul>
		</SheetContent>
	</Sheet>;
}
