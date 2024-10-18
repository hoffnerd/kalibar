"use client"


// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
import { useSuspenseQuery } from "@tanstack/react-query"
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile"
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import QueryHandler from "@/rQuery/components/QueryHandler"
import NarrativePanels from "./Panels"
import CombatPanels from "../combat/Panels"
import { Alert } from "../microComponents"
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Game({ saveFile }: { saveFile: SaveFile }){
    
    //______________________________________________________________________________________
    // ===== Constants =====

    const { type } = saveFile;
    


    //______________________________________________________________________________________
    // ===== Component Return =====

    
    switch (type) {
        case "DEBUG_NARRATIVE": return <NarrativePanels saveFile={saveFile} />;
        case "DEBUG_COMBAT": return <CombatPanels saveFile={saveFile} />;
        default: return (
            <div className="container">
                <Alert variant="neonEffectWithGlow" className="neColorRed">
                    This save file type is not set up yet.
                </Alert>
            </div>
        )
    }
}