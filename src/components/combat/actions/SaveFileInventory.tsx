"use client"

// Types ----------------------------------------------------------------------------
import { type InventoryItem, type InventoryItemKey } from "@/data/inventoryItems";
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile";
// Stores ---------------------------------------------------------------------------
import { getAction } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import ActionBarContent from "./ActionBarContent";
import ActionItem from "./ActionItem";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFileInventory(){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const params = useParams();



    //______________________________________________________________________________________
    // ===== Query =====
    const { isLoading, isError, data } = params?.id
        ? useQuery(queryOptionsReadSaveFile(params.id as string)) 
        : { isLoading:false, isError:false, data:null };
    const saveFile: SaveFile | undefined = data?.data;



    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
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
    )
}