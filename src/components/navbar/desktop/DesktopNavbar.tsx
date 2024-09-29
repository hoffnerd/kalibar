// Types ----------------------------------------------------------------------------
import { type NavItems, type NavOptions } from "@/interfaces";
// Packages -------------------------------------------------------------------------
// Shadcn ---------------------------------------------------------------------------
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";
// Components -----------------------------------------------------------------------
import NavItemLinkWrapper from "../NavItemLinkWrapper";
import DesktopNavSubItem from "./DesktopNavSubItem";
import DesktopAuthNav from "./DesktopAuthNav";
// Others ---------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

/**
 * Navbar that will be shown on desktop screen sizes
 * @param props
 * @param props.navItems - Items to fill the navigation menu with
 * @param props.authNavItems - Items to fill the admin nav menu with
 * @param props.header - Element to be displayed as the header
 * @param props.options - Options for the navbar
 */
export default function DesktopNavbar({
    navItems,
    authNavItems,
    header,
    options,
}: {
    navItems: NavItems;
    authNavItems: NavItems;
    header?: React.JSX.Element;
    options?: NavOptions;
}) {
    return (
        <NavigationMenu className="hiddenOnMobile hiddenOnTablet px-4 py-2 flex">
            {header && <div className="h-12 pr-6">{header}</div>}
            <NavigationMenuList>
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.key}>
                        {item.itemType === "superItem" ? <>
                            <NavigationMenuTrigger>{item.display}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="container m-auto">
                                    <ul className="grid grid-cols-3 gap-3 p-6">
                                        {item.subItems.map((subItem) => <DesktopNavSubItem key={subItem.key} subItem={subItem} />)}
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </> : (
                            <NavItemLinkWrapper navItem={item} className={`${navigationMenuTriggerStyle()} text-lg`}>
                                {item.display}
                            </NavItemLinkWrapper>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>

            {/* Blank div that will take up any extra space */}
            <div className="flex-grow" />
            
            {/* Auth nav */}
            {authNavItems && <DesktopAuthNav authNavItems={authNavItems} options={options} />}
        </NavigationMenu>
    );
}
