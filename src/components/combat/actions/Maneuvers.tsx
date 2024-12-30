

// Types ----------------------------------------------------------------------------
import { type ManeuverKey, type Maneuver } from "@/data/maneuvers";
import { type InventoryItem, type InventoryItemKey } from "@/data/inventoryItems";
import { type CharacterEquipmentKey } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { getAction, useCombatStore } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { HorizontalLine } from "../../microComponents";
import ActionBarContent from "./ActionBarContent";
import ActionItem from "./ActionItem";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Maneuvers(){

    //______________________________________________________________________________________
    // ===== Store State =====
    const entities = useCombatStore(state => state.entities);
    const initiativeOrder = useCombatStore(state => state.initiativeOrder);

    //______________________________________________________________________________________
    // ===== Constants =====
    const turnTakerEntityKey = initiativeOrder?.[0];
    const turnTakerEntity = turnTakerEntityKey && entities?.[turnTakerEntityKey];
    const turnTakerEntityEquipmentSlots = turnTakerEntity && Object.keys((entities[turnTakerEntityKey] as any).equipment) as Array<CharacterEquipmentKey>;
    const turnTakerEntityHasManeuvers = turnTakerEntity && turnTakerEntity.maneuvers && turnTakerEntity.maneuvers.length > 0;

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
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
                            })
                        })}
                    </>}
                    
                    {turnTakerEntityEquipmentSlots && turnTakerEntityEquipmentSlots.length > 0 && turnTakerEntityHasManeuvers && (
                        <HorizontalLine className="py-3"/>
                    )}

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
    )
}