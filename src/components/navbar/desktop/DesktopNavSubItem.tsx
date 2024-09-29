// Types ----------------------------------------------------------------------------
import { type NavItem } from "@/interfaces";
// Packages -------------------------------------------------------------------------
// Shadcn ---------------------------------------------------------------------------
import { navigationMenuTriggerStyle } from "@/components/shadcn/ui/navigation-menu";
// Components -----------------------------------------------------------------------
import NavItemLinkWrapper from "../NavItemLinkWrapper";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function DesktopNavSubItem({subItem} : {subItem: NavItem}) {
	return <li key={subItem.key}>
		<NavItemLinkWrapper navItem={subItem} className={`${navigationMenuTriggerStyle()} !items-start !w-full flex flex-col h-full`}>
			<p className="text-xl">{subItem.display}</p>
			<p>{subItem?.subDisplay}</p>
		</NavItemLinkWrapper>
	</li>;
}
