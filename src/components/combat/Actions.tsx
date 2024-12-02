

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { useState } from "react";
import { HorizontalLine } from "../microComponents";
import { Button } from "../shadcn/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../shadcn/ui/menubar";
import Portal from "../Portal";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types/Interfaces =====

interface ActionItem {
    key: string;
    display?: string;
    description?: string | JSX.Element;
    onClick?: () => void;
}


//______________________________________________________________________________________
// ===== True Constants =====

const TEST_ACTIONS: Array<ActionItem> = [
    {
        key: "test",
        display: "Test",
        description: "Test Description",
        onClick: () => console.log("Test"),
    },
]

const ADDITIONAL_ACTIONS: Array<ActionItem> = [
    {
        key: "dodge",
        display: "Dodge",
        description: "Use your action to double your Evasion skill until the start of your next turn.",
        onClick: () => console.log("Dodge"),
    },
    {
        key: "hide",
        display: "Hide",
        description: "Use your action to make a Stealth skill check. On a success, your Aggro Rating (AR) will be 0%.",
        onClick: () => console.log("Hide"),
    },
    {
        key: "search",
        display: "Search",
        description: "Use your action to look for any additional loot you can pick up.",
        onClick: () => console.log("Search"),
    },
    {
        key: "swapEquipment",
        display: "Swap Equipment",
        description: "Use your action to swap your equipment for other pieces of equipment from your inventory.",
        onClick: () => console.log("Swap  Equipment"),
    },
    { key: "horizontalLine" },
    {
        key: "endTurn",
        display: "End Turn",
        description: "Don't do anything for your turn.",
        onClick: () => console.log("End Turn"),
    },
];



//______________________________________________________________________________________
// ===== Micro-Components =====

function ActionItem({
    children,
    className,
    title,
    onClick,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    title: string;
    onClick: () => void;
}>){
    return (
        <MenubarItem 
            className={`
                block border-2 border-slate-400 text-wrap max-w-80 m-1 neonEffect 
                hover:neBorder focus:neBorder hover:neBorderGlow focus:neBorderGlow 
                ${className}
            `}
            onClick={onClick}
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
    const handleOnClick = (key: string, onClick?: () => void) => {
        if(onClick) onClick();
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
                    {TEST_ACTIONS.map(({ key, display, description, onClick }) => key === "horizontalLine" 
                        ? <HorizontalLine key={key} className="py-2"/>
                        : <ActionItem key={key} title={display || key} onClick={() => handleOnClick(key, onClick)}>{description}</ActionItem>
                    )}
                </ActionBarContent>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorGreen">Items</ActionBarTrigger>
                <ActionBarContent className="neColorGreen">
                    {TEST_ACTIONS.map(({ key, display, description, onClick }) => key === "horizontalLine" 
                        ? <HorizontalLine key={key} className="py-2"/>
                        : <ActionItem key={key} title={display || key} onClick={() => handleOnClick(key, onClick)}>{description}</ActionItem>
                    )}
                </ActionBarContent>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorBlue">Additional Actions</ActionBarTrigger>
                <ActionBarContent className="neColorBlue">
                    {ADDITIONAL_ACTIONS.map(({ key, display, description, onClick }) => key === "horizontalLine" 
                        ? <HorizontalLine key={key} className="py-2"/>
                        : <ActionItem key={key} title={display || key} onClick={() => handleOnClick(key, onClick)}>{description}</ActionItem>
                    )}
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

