

// Types ----------------------------------------------------------------------------
import { Maneuver } from "@/data/maneuvers";
// Packages -------------------------------------------------------------------------
import { useState } from "react";
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { ADDITIONAL_ACTIONS } from "@/data/combat/additionalActions";
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../shadcn/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../shadcn/ui/menubar";
// Components -----------------------------------------------------------------------
import Portal from "../Portal";
import { HorizontalLine } from "../microComponents";
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== True Constants =====

const TEST_ACTIONS: Array<Maneuver> = [
    {
        key: "test",
        display: "Test",
        description: "Test Description",
        action: () => console.log("Test"),
    },
]

const ADDITIONAL_ACTIONS_ARRAY: Array<Maneuver> = [
    ADDITIONAL_ACTIONS.dodge,
    ADDITIONAL_ACTIONS.hide,
    ADDITIONAL_ACTIONS.search,
    ADDITIONAL_ACTIONS.swapEquipment,
];



//______________________________________________________________________________________
// ===== Micro-Components =====

function ActionItem({
    children,
    className,
    title,
    action,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    title: string;
    action: Maneuver["action"];
}>){
    return (
        <MenubarItem 
            className={`
                block border-2 border-slate-400 text-wrap max-w-80 m-1 neonEffect 
                hover:neBorder focus:neBorder hover:neBorderGlow focus:neBorderGlow 
                ${className}
            `}
            onClick={() => action()}
        >
            <div>{title}</div>
            <div className="text-xs text-slate-400 ">{children}</div>
        </MenubarItem>
    )
}

function ActionBarContent({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>){
    return (
        <MenubarContent className={`max-h-[75dvh] overflow-auto neonEffect neBorder neBorderGlow ${className}`}>
            {children}
        </MenubarContent>
    )
}

function ActionBarTrigger({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>){
    return (
        <MenubarTrigger asChild>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap ${className}`}>
                {children}
            </Button>
        </MenubarTrigger>
    )
}

function ActionBar(){
    const handleOnClick = (key: string, action?: Maneuver["action"]) => {
        if(action) action();
        switch(key){
            // case "":
            //     break;
            default:
                console.log("Unknown Action");
                break;
        }
    };
    return (
        <Menubar className={`h-full grid grid-cols-3 p-0 space-x-0 border-0`}>
            <MenubarMenu>
                <ActionBarTrigger className="neColorOrange">Maneuvers</ActionBarTrigger>
                <ActionBarContent className="neColorOrange">
                    {TEST_ACTIONS.map(({ key, display, description, action }) => (
                        <ActionItem key={key} title={display || key} action={() => handleOnClick(key, action)}>{description}</ActionItem>
                    ))}
                </ActionBarContent>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorGreen">Items</ActionBarTrigger>
                <ActionBarContent className="neColorGreen">
                    {TEST_ACTIONS.map(({ key, display, description, action }) => (
                        <ActionItem key={key} title={display || key} action={() => handleOnClick(key, action)}>{description}</ActionItem>
                    ))}
                </ActionBarContent>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorBlue">Additional Actions</ActionBarTrigger>
                <ActionBarContent className="neColorBlue">
                    {ADDITIONAL_ACTIONS_ARRAY.map(({ key, display, description, action }) => (
                        <ActionItem key={key} title={display || key} action={() => handleOnClick(key, action)}>{description}</ActionItem>
                    ))}
                    <HorizontalLine className="py-2"/>
                    <ActionItem 
                        title={ADDITIONAL_ACTIONS.endTurn?.display}
                        action={() => handleOnClick(ADDITIONAL_ACTIONS.endTurn.key, ADDITIONAL_ACTIONS.endTurn.action)}
                    >
                        {ADDITIONAL_ACTIONS.endTurn.description}
                    </ActionItem>
                </ActionBarContent>
            </MenubarMenu>
        </Menubar>
    )
}

function ActionBarEndCombat(){
    return (
        <div className={`h-full grid grid-cols-2 p-0 space-x-0 border-0`}>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap neColorOrange`} onClick={() => console.log("Kill Unconscious")}>
                Leave Without Killing the Unconscious
            </Button>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap neColorRed`} onClick={() => console.log("Kill Unconscious")}>
                Kill Enemies that are Unconscious
            </Button>
        </div>
    )
}


//______________________________________________________________________________________
// ===== Component =====

export default function Actions(){

    //______________________________________________________________________________________
    // ===== State =====
    const [allUnconscious, setAllUnconscious] = useState<boolean>(false);

    

    //______________________________________________________________________________________
    // ===== Component Return =====
    
    return <>
        <Portal targetElementId="debuggerCommands" childElementId="combatActions">
            <Button 
                id="combatActions"
                variant="outline"
                onClick={()=>setAllUnconscious((previousAllUnconscious) => !previousAllUnconscious)}
            >
                Toggle All Unconscious
            </Button>
        </Portal>

        {allUnconscious
            ? <ActionBarEndCombat/>
            : <ActionBar/>
        }
    </>
}

