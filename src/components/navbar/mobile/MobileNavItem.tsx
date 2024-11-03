// Types ----------------------------------------------------------------------------
import { type NavItem, type NavOptions } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { ChevronRightIcon, ChevronLeftIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
// Components -----------------------------------------------------------------------
import MobileNavSheet from "./MobileNavSheet";



//______________________________________________________________________________________
// ===== Micro Component =====

/**
 * @param props
 * @param props.item - The item to display
 */
function ItemDisplay ({item}: { item: NavItem; }){
	return (
        <div className="flex justify-between align-middle w-full text-xl py-2">
            <p>{item.display}</p>
            {item.itemType === "superItem" && <span><ChevronRightIcon className="h-6 w-6"/></span>}
            {item.itemType === "externalLink" && <span><ExternalLinkIcon className="h-6 w-6"/></span>}
        </div>
    );
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * Render a single mobile nav item
 * @param props
 * @param props.navItem - The item to render
 * @param props.options - Options for the navigation menu
 */
export default function MobileNavItem({navItem, options}: { navItem: NavItem; options?: NavOptions; }) {
	return navItem.itemType === "superItem" ? (
		<MobileNavSheet
			sheetTriggerElement={<button className="w-full"><ItemDisplay item={navItem} /></button>}
			sheetCloseElement={<ChevronLeftIcon className="h-8 w-8"/>}
			navItems={navItem.subItems}
		/>
	) : (
		<ItemDisplay item={navItem} />
	);
}
