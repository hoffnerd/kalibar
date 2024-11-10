"use client"

// Types ----------------------------------------------------------------------------
import { type SaveData } from "@/typeDefs";
import { type NarrativeCharacterDetails, type NarrativeDisplayArray } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
// Hooks ----------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { STORY_NARRATIVE } from "@/data/narrative";
import { CHARACTERS } from "@/data/characters";
// Components -----------------------------------------------------------------------
import TypingTextMany from "../typingText/TypingTextMany";
import TextMany from "../typingText/TextMany";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow"



//______________________________________________________________________________________
// ===== Micro-Component =====

function NarrativeText({
    narrativeDisplayArray,
    forcedComplete=false,
}: Readonly<{ 
    narrativeDisplayArray: NarrativeDisplayArray;
    forcedComplete?: boolean;
}>){
    if(forcedComplete) return <TextMany narrativeDisplayArray={narrativeDisplayArray}/>;
    return (
        <div className="relative">
            <div className="absolute w-full" aria-hidden="true">
                <TypingTextMany narrativeDisplayArray={narrativeDisplayArray} />
            </div>
            <div className="invisibleText w-full">
                <TextMany narrativeDisplayArray={narrativeDisplayArray}/>
            </div>
            {/* <div className="p-6"/> */}
        </div>
    )
}

function ChatBubbleDetails({
    className,
    display,
}: Readonly<{ 
    className: string;
    display: string;
}>){
    return (
        <div className={`neonEffect neText neTextGlow ${className}`}>
            <h3 className="text-center">&nbsp;</h3>
            <div className="w-20 h-20 bg-slate-600"/>
            <h3 className="text-center">{display}</h3>
        </div>
    )
}

function ChatBubble({
    narrativeDisplayArray,
    characterDetails,
    forcedComplete=false,
}: Readonly<{ 
    narrativeDisplayArray: NarrativeDisplayArray;
    characterDetails: NarrativeCharacterDetails;
    forcedComplete?: boolean;
}>){
    const { key, display, relation } = { ...CHARACTERS[characterDetails.key], ...characterDetails };
    const bubbleColor = relation === "friendly" ? "neColorBlue" : relation === "enemy" ? "neColorRed" : "neColorWhite";
    console.log({ key, display, relation, bubbleColor, "CHARACTERS[characterDetails.key]":CHARACTERS[characterDetails.key], characterDetails })
    return (
        <div className={`w-full ${key === "dante" && "flex place-content-end"}`}>
            <div className={`p-3 w-11/12`}>
                <div className={`${BORDER} ${bubbleColor} p-3 flex`}>
                    {key !== "dante" && <ChatBubbleDetails className={`hidden sm:block pr-3 ${bubbleColor}`} display={display} />}
                    <div>
                        <h3 className={`block sm:hidden neonEffect neText neTextGlow ${bubbleColor}`}>{display}:</h3>
                        <NarrativeText narrativeDisplayArray={narrativeDisplayArray} forcedComplete={forcedComplete} />
                    </div>
                    {key === "dante" && <ChatBubbleDetails className={`hidden sm:block pl-3 ${bubbleColor}`} display={display} />}
                </div>
            </div>
        </div>
    )
}




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
    // ===== Render Functions =====


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
                        
                        {narrative.type === "character" && narrative.characterDetails?.key
                            ? (
                                <ChatBubble
                                    narrativeDisplayArray={narrative.display}
                                    characterDetails={narrative.characterDetails}
                                    forcedComplete={i !== saveData.narrative.length-1}
                                />
                            )
                            : (
                                <div className="text-center">
                                    <NarrativeText
                                        narrativeDisplayArray={narrative.display}
                                        forcedComplete={i !== saveData.narrative.length-1}
                                    />
                                </div>
                            )
                        }

                    </div>
                )
            })}
        </div>
    )
}