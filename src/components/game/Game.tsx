"use client"


// Types ----------------------------------------------------------------------------
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

export default function Game({ type, saveFile }: Readonly<{ type?: "NARRATIVE" | "COMBAT", saveFile?: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Component Return ===== 
    if(!(type && saveFile)) return <NarrativePanels/>;
    switch (type) {
        case "NARRATIVE": return <NarrativePanels saveFile={saveFile} />;
        case "COMBAT": return <CombatPanels saveFile={saveFile} />;
        default: return (
            <div className="container">
                <Alert variant="neonEffectWithGlow" className="neColorRed">
                    This save file type is not set up yet.
                </Alert>
            </div>
        )
    }
    // if(!saveFile?.type) return <NarrativePanels/>;
    // switch (saveFile.type) {
    //     case "DEBUG_COMBAT":
    //     case "DEBUG_NARRATIVE": return <NarrativePanels saveFile={saveFile} />;
    //     // case "DEBUG_COMBAT": return <CombatPanels saveFile={saveFile} />;
    //     default: return (
    //         <div className="container">
    //             <Alert variant="neonEffectWithGlow" className="neColorRed">
    //                 This save file type is not set up yet.
    //             </Alert>
    //         </div>
    //     )
    // }
}