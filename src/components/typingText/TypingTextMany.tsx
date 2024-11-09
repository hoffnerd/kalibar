"use client";

// Types ----------------------------------------------------------------------------
import { type NarrativeDisplayArray, type NarrativeDisplayComponent } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useState } from "react";
// Hooks ---------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import TypingText from "./TypingText";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function TypingTextMany({
    forcedComplete=false,
    narrativeDisplayArray,
    component="span",
    className,
    depth=0,
    upperGetCompleted=undefined
}: Readonly<{ 
    forcedComplete?: boolean;
    narrativeDisplayArray: NarrativeDisplayArray;
    component?: NarrativeDisplayComponent["component"];
    className?: NarrativeDisplayComponent["className"];
    depth?: number;
    upperGetCompleted?: (completed:boolean)=>void;
}>){

    //______________________________________________________________________________________
    // ===== State =====
    const [indexesCompleted, setIndexesCompleted] = useState<Array<boolean>>([])



    //______________________________________________________________________________________
    // ===== Functions =====

    const getCompleted = ( completed:boolean ) => {
        if(!completed) return;
        let newIndexesCompleted = [ ...indexesCompleted, true ];
        setIndexesCompleted(newIndexesCompleted);

        if(!upperGetCompleted) return;
        upperGetCompleted(newIndexesCompleted.length === narrativeDisplayArray.length);
    }
    


    //______________________________________________________________________________________
    // ===== Component Return =====
    return narrativeDisplayArray.map((narrative, i) => {
        if(i === 0 || indexesCompleted[ i-1 ]) {
            // console.log({ trace:`TypingTextMany > ${i}`, narrative, forcedComplete })
            if((narrative as NarrativeDisplayComponent)?.display){
                const narrativeDisplay = narrative as NarrativeDisplayComponent
                return (
                    <TypingTextMany
                        key={i}
                        forcedComplete={forcedComplete}
                        narrativeDisplayArray={narrativeDisplay.display}
                        component={narrativeDisplay?.component}
                        className={narrativeDisplay?.className}
                        depth={depth++}
                        upperGetCompleted={getCompleted}
                    />
                );
            }
            return (
                <TypingText
                    key={i}
                    forcedComplete={forcedComplete}
                    text={narrative as string}
                    component={component}
                    className={className} 
                    getCompleted={getCompleted}
                />
            );
        } else {
            return;
        }
    })
}