"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
import { type NarrativeKey } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useEffect } from "react";
// rQuery ---------------------------------------------------------------------------
import useSaveGame from "@/hooks/useSaveGame";
// Data --------------------------------------------------------------------------
import { STORY_NARRATIVE } from "@/data/narrative";
import Portal from "../Portal";
import { Button } from "../shadcn/ui/button";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function NarrativeClient({ saveFile }: Readonly<{ saveFile: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { resetGame, addNarrative } = useSaveGame();



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!saveFile) return;
        if(saveFile.saveData.narrative.length > 0) return;
        const firstNarrativeKey = Object.keys(STORY_NARRATIVE)[0] as NarrativeKey;
        addNarrative(firstNarrativeKey);
    }, [saveFile])
    


    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <Portal targetElementId="debuggerCommands" childElementId="NarrativeClient_resetGame">
            <Button id="NarrativeClient_resetGame" variant="outline" onClick={()=>resetGame()}>
                Reset Game
            </Button>
        </Portal>
    );
}