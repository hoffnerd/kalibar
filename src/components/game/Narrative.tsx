"use client"

// Types ----------------------------------------------------------------------------
import { type SaveData } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { STORY_NARRATIVE } from "@/data/narrative";
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import TypingTextMany from "../typingText/TypingTextMany";
import { useEffect, useRef } from "react";
import TextMany from "../typingText/TextMany";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Narrative({ saveData }: Readonly<{ saveData: SaveData; }>){
    
    //______________________________________________________________________________________
    // ===== Reference =====
    const divScrollableRef = useRef<HTMLDivElement | null>(null);

    
    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!saveData.narrative) return;
        if(!divScrollableRef.current) return;
        divScrollableRef.current.scrollTo({ top:999999999999999, behavior:"smooth" })
    }, [saveData.narrative, divScrollableRef.current])
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <div ref={divScrollableRef} className="h-full overflow-auto p-3">
            {saveData.narrative.map((narrativeKey, i) => {
                const narrative = STORY_NARRATIVE[narrativeKey];
                return (
                    <div key={narrativeKey}>
                        {i !== 0 && <>
                            <div className="p-2"/>
                            <hr/>
                            <div className="p-2"/>
                        </>}
                        {i !== saveData.narrative.length-1 
                            ? <TextMany narrativeDisplayArray={narrative.display}/>
                            : (
                                <div className="relative">
                                    <div className="absolute" aria-hidden="true">
                                        <TypingTextMany narrativeDisplayArray={narrative.display} />
                                    </div>
                                    <div className="invisibleText">
                                        <TextMany narrativeDisplayArray={narrative.display}/>
                                    </div>
                                    {/* <div className="p-6"/> */}
                                </div>
                            )
                        }
                    </div>
                )
            })}
        </div>
    )
}