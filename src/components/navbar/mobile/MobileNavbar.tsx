// Types ----------------------------------------------------------------------------
import { type NavItems, type NavOptions } from "@/interfaces";
// Packages -------------------------------------------------------------------------
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
// Components -----------------------------------------------------------------------
import MobileNavSheet from "./MobileNavSheet";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Components =====

/**
 * Navbar that will be shown on mobile screen sizes
 * @param {Object} props
 * @param {NavItems} props.navItems - Items to fill the navigation menu with
 * @param {NavItems} props.authNavItems - Items to fill the admin nav menu with
 * @param {React.JSX.Element} props.header - Element to be displayed as the header
 * @param {NavOptions} props.options - Options for the navbar
 */
export default function MobileNavbar({
    className,
    navItems,
    authNavItems,
    header = <div/>,
    options,
}: {
    className?: string;
    navItems: NavItems;
    authNavItems: NavItems;
    header?: React.JSX.Element;
    options?: NavOptions;
}) {
    return (
        <nav className={`flex justify-between p-2 ${className}`}>
            {header}
            <MobileNavSheet
                sheetTriggerElement={<button><HamburgerMenuIcon className="h-8 w-8"/></button>}
                sheetCloseElement={<Cross1Icon className="h-8 w-8"/>}
                navItems={navItems}
                authNavItems={authNavItems}
                options={options}
            />
        </nav>
    );
}
