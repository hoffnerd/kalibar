// Types ----------------------------------------------------------------------------
import { type NavItems, type NavOptions } from "@/interfaces";
// Shadcn-ui ------------------------------------------------------------------------
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// Components -----------------------------------------------------------------------
import NavItemLinkWrapper from "../NavItemLinkWrapper";
import MobileNavItem from "./MobileNavItem";
import MobileAuthNavSheet from "./MobileAuthNavSheet";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

/**
 * Sheet that will open and display the mobile navigation menu
 * @param props
 * @param props.sheetTriggerElement - Element that will serve as the button to open the sheet
 * @param props.sheetCloseElement - Element that will serve as the button to close the sheet
 * @param props.authNavItems - Items to fill the auth nav menu with
 * @param props.navItems - Items to fill the navigation menu with
 * @param props.options - Options for the navbar
 */
export default async function MobileNavSheet({
    sheetTriggerElement,
    sheetCloseElement,
    navItems,
    authNavItems,
    options,
}: {
    sheetTriggerElement?: React.JSX.Element;
    sheetCloseElement?: React.JSX.Element;
    authNavItems?: NavItems;
    navItems: NavItems;
    options?: NavOptions;
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>{sheetTriggerElement}</SheetTrigger>
            <SheetContent className="overflow-auto z-[1011]">
                <SheetHeader className="flex !flex-row justify-between">
                    {/* SheetTitle is used for browser semantics/accessability, VisuallyHidden is to hide it according to the radix docs */}
                    <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                    <MobileAuthNavSheet authNavItems={authNavItems} options={options} />
                    <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                        {sheetCloseElement}
                        <span className="sr-only">Close</span>
                    </SheetClose>
                </SheetHeader>
                <ul className="flex flex-col pt-8">
                    {navItems.map((item, index) => (
                        <li key={item.key}>
                            {index !== 0 && <div className="h-[1px] bg-secondary" />}
                            <NavItemLinkWrapper navItem={item}>
                                <MobileNavItem navItem={item} options={options} />
                            </NavItemLinkWrapper>
                        </li>
                    ))}
                </ul>
            </SheetContent>
        </Sheet>
    );
}
