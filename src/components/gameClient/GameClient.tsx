"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
// Context --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import SavingGameIcon from "./SavingGameIcon";
import InGameTime from "./InGameTime";
import NarrativeClient from "./NarrativeClient";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function GameClient({ saveFile }: Readonly<{ saveFile?: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!saveFile) return;
    return (
        <div className="overflow-hidden h-0 w-0">
            
            <SavingGameIcon/>
            <InGameTime saveFile={saveFile} />
            <NarrativeClient saveFile={saveFile} />
        </div>
    )
        
}