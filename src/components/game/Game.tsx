"use client"


// Types ----------------------------------------------------------------------------
import { type SaveFileType } from "@prisma/client";
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import NarrativePanels from "./Panels"
import CombatPanels from "../combat/Panels"
import { Alert } from "../microComponents"
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Game({ saveFileType }: Readonly<{ saveFileType?: SaveFileType }>){

    //______________________________________________________________________________________
    // ===== Component Return =====

    switch (saveFileType) {
        case "DEBUG_NARRATIVE": return <NarrativePanels/>;
        case "DEBUG_COMBAT": return <CombatPanels/>;
        default: return (
            <div className="container">
                <Alert variant="neonEffectWithGlow" className="neColorRed">
                    This save file type is not set up yet.
                </Alert>
            </div>
        )
    }
}