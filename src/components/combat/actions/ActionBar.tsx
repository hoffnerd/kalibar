

// Types ----------------------------------------------------------------------------
import { type ManeuverKey, type Maneuver } from "@/data/maneuvers";
import { InventoryItem, type InventoryItemKey } from "@/data/inventoryItems";
import { type AdditionalActionKey } from "@/data/combat/additionalActions";
import { getAction, type CombatStoreActionSelected } from "@/stores/useCombatStore";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
import { ADDITIONAL_ACTIONS } from "@/data/combat/additionalActions";
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../../shadcn/ui/button";
import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "../../shadcn/ui/menubar";
// Components -----------------------------------------------------------------------
import { HorizontalLine } from "../../microComponents";
import { useQuery } from "@tanstack/react-query";
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile";
import { useParams } from "next/navigation";
import { CharacterEquipmentKey, SaveFile } from "@/typeDefs";
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
    actionKeys,
    title,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    actionKeys: CombatStoreActionSelected;
    title: string;
}>){
    const actionSelectPhase = useCombatStore(state => state.actionSelectPhase);
    return (
        <MenubarItem 
            className={`
                block border-2 border-slate-400 text-wrap max-w-80 m-1 neonEffect 
                hover:neBorder focus:neBorder hover:neBorderGlow focus:neBorderGlow 
                ${className}
            `}
            onClick={() => actionSelectPhase(actionKeys)}
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



//______________________________________________________________________________________
// ===== Component =====

export default function ActionBar(){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const params = useParams();



    //______________________________________________________________________________________
    // ===== Query =====
    const { isLoading, isError, data } = params.id
        ? useQuery(queryOptionsReadSaveFile(params.id as string)) 
        : { isLoading:false, isError:false, data:null };
    const saveFile: SaveFile | undefined = data?.data;



    //______________________________________________________________________________________
    // ===== Store State =====
    const entities = useCombatStore(state => state.entities);
    const initiativeOrder = useCombatStore(state => state.initiativeOrder);
    const turnTakerEntityKey = initiativeOrder?.[0];
    const turnTakerEntity = turnTakerEntityKey && entities?.[turnTakerEntityKey];
    const turnTakerEntityEquipmentSlots = turnTakerEntity && Object.keys((entities[turnTakerEntityKey] as any).equipment) as Array<CharacterEquipmentKey>;
    const turnTakerEntityHasManeuvers = turnTakerEntity && turnTakerEntity.maneuvers && turnTakerEntity.maneuvers.length > 0;




    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Menubar className={`h-full grid grid-cols-3 p-0 space-x-0 border-0`}>
            <MenubarMenu>
                <ActionBarTrigger className="neColorOrange">Maneuvers</ActionBarTrigger>
                <ActionBarContent className="neColorOrange">
                    {turnTakerEntity
                        ? <>
                            {turnTakerEntityEquipmentSlots && turnTakerEntityEquipmentSlots.length > 0 && <>
                                <div className="px-3 pt-1">Equipment Maneuvers</div>
                                {turnTakerEntityEquipmentSlots.map((key) => {
                                    const inventoryItemKey: InventoryItemKey = (entities[turnTakerEntityKey] as any).equipment[key];
                                    const inventoryItemObj = getAction({ inventoryItemKey }) as InventoryItem;
                                    if(!inventoryItemObj?.maneuvers) return null;
                                    return inventoryItemObj?.maneuvers.map((maneuverKey) => {
                                        const maneuverObj = getAction({ inventoryItemKey }) as Maneuver;
                                        if(!maneuverObj) return null;
                                        return (
                                            <ActionItem 
                                                key={maneuverKey} 
                                                actionKeys={{ maneuverKey }}
                                                title={`${maneuverObj?.display || maneuverKey}`}
                                            >
                                                {maneuverObj?.description}
                                            </ActionItem>
                                        )
                                    })
                                })}
                            </>}
                            
                            {turnTakerEntityEquipmentSlots && turnTakerEntityEquipmentSlots.length > 0 && turnTakerEntityHasManeuvers && <HorizontalLine className="py-3"/>}

                            {turnTakerEntityHasManeuvers && <>
                                <div className="px-3">Personal Maneuvers</div>
                                {(turnTakerEntity.maneuvers as Array<ManeuverKey>).map((maneuverKey) => {
                                    const maneuverObj = getAction({ maneuverKey }) as Maneuver;
                                    if(!maneuverObj) return null;
                                    return (
                                        <ActionItem 
                                            key={maneuverKey} 
                                            actionKeys={{ maneuverKey }}
                                            title={`${maneuverObj?.display || maneuverKey}`}
                                        >
                                            {maneuverObj?.description}
                                        </ActionItem>
                                    )
                                })}
                            </>}
                            
                        </>
                        : <div className="text-center text-gray-400">No Maneuvers</div>
                    }


                </ActionBarContent>
            </MenubarMenu>
            <MenubarMenu>
                <ActionBarTrigger className="neColorGreen">Items</ActionBarTrigger>
                <ActionBarContent className="neColorGreen">
                    {saveFile?.saveData?.inventory 
                        ? (Object.keys(saveFile.saveData.inventory) as Array<InventoryItemKey>).map((key) => {
                            const inventoryItemObj = getAction({ inventoryItemKey: key }) as InventoryItem;
                            if(!inventoryItemObj) return null;
                            if(inventoryItemObj.type !== "consumable") return null;
                            return (
                                <ActionItem 
                                    key={key} 
                                    actionKeys={{ inventoryItemKey: key }} 
                                    title={`${inventoryItemObj?.display || key} x ${saveFile.saveData.inventory[key]}`}
                                >
                                    {inventoryItemObj?.description}
                                </ActionItem>
                            )
                        }) 
                        : <div className="text-center text-gray-400">No Items</div>
                    }
                </ActionBarContent>
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