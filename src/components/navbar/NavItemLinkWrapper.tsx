// Types ----------------------------------------------------------------------------// Types ----------------------------------------------------------------------------
import { type NavItem } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

/**
 * Wrap a nav item with a link if appropriate
 * @param props
 * @param props.navItem - object that will tell us whether to wrap the children with a link and the href for that link
 * @param props.className - React className prop that will be passed to the link
 * @param props.children - Children of this component
 */
export default function NavItemLinkWrapper({
    navItem,
    className,
    children,
}: {
    navItem: NavItem;
    className?: string;
    children: React.ReactNode;
}) {
    switch (navItem.itemType) {
        // Don't wrap super items with a link
        case "superItem": return children;

        // Wrap internal links with a Next link
        case "internalLink": return <Link href={navItem.link} className={className}>{children}</Link>;

        // Wrap external links with an a tag
        case "externalLink": return <a href={navItem.link} className={className}>{children}</a>;

        // If the item type is not one of the allowed types, throw an error
        default: 
            console.error(`The navigation item is missing a valid itemType attribute.`, navItem);
            return <div/>;
    }
}
