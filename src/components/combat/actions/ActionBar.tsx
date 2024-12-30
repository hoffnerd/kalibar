

// Types ----------------------------------------------------------------------------
import { type Maneuver } from "@/data/maneuvers";
import { type AdditionalActionKey } from "@/data/combat/additionalActions";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { ADDITIONAL_ACTIONS } from "@/data/combat/additionalActions";
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../../shadcn/ui/button";
import { Menubar,  MenubarMenu, MenubarTrigger } from "../../shadcn/ui/menubar";
// Components -----------------------------------------------------------------------
import { HorizontalLine } from "../../microComponents";
import ActionBarContent from "./ActionBarContent";
import ActionItem from "./ActionItem";
import SaveFileInventory from "./SaveFileInventory";
import Maneuvers from "./Maneuvers";
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== True Constants =====

const ADDITIONAL_ACTIONS_ARRAY: Array<Maneuver> = [
    ADDITIONAL_ACTIONS.dodge,
    ADDITIONAL_ACTIONS.hide,
    ADDITIONAL_ACTIONS.search,
    ADDITIONAL_ACTIONS.swapEquipment,
];



//______________________________________________________________________________________
// ===== Micro-Components =====

function ActionBarTrigger({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>){
    return (
        <MenubarTrigger asChild>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap ${className}`}>
                {children}
            </Button>
        </MenubarTrigger>
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function ActionBar(){

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Menubar className={`h-full grid grid-cols-3 p-0 space-x-0 border-0`}>
            <MenubarMenu>
                <ActionBarTrigger className="neColorOrange">Maneuvers</ActionBarTrigger>
                <Maneuvers/>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorGreen">Items</ActionBarTrigger>
                <SaveFileInventory/>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorBlue">Additional Actions</ActionBarTrigger>
                <ActionBarContent className="neColorBlue">
                    {ADDITIONAL_ACTIONS_ARRAY.map(({ key, display, description }) => (
                        <ActionItem key={key} actionKeys={{ additionalActionKey: key as AdditionalActionKey }} title={display || key}>
                            {description}
                        </ActionItem>
                    ))}
                    <HorizontalLine className="py-2"/>
                    <ActionItem 
                        actionKeys={{ additionalActionKey: ADDITIONAL_ACTIONS.endTurn.key as AdditionalActionKey }}
                        title={ADDITIONAL_ACTIONS.endTurn?.display}
                    >   
                        {ADDITIONAL_ACTIONS.endTurn.description}
                    </ActionItem>
                </ActionBarContent>
            </MenubarMenu>
        </Menubar>
    )
}