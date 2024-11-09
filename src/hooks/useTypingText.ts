"use client"

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { sleep } from "@/utils";



//______________________________________________________________________________________
// ===== Types =====

//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_TYPING_INTERVAL = 25;




//______________________________________________________________________________________
// ===== Hook =====

export default function useTypingText({ text, forcedComplete=false }: Readonly<{ text: string; forcedComplete?: boolean }>){

    //______________________________________________________________________________________
    // ===== Reference =====
    const stage = useRef<"notStarted" | "running" | "completed">(forcedComplete ? "completed" : "notStarted");

    //______________________________________________________________________________________
    // ===== State =====
    const [typingText, setTypingText] = useState<string>("");

    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        if(forcedComplete) return;
        if(stage.current !== "notStarted") return;
        stage.current = "running";
        const updateTextArray = async () => {
            for (let i = 0; i < text.length; i++) {
                await sleep(DEFAULT_TYPING_INTERVAL);
                setTypingText(previousTypingText => {
                    const nextTextTyping = previousTypingText + text[i];
                    if(text === nextTextTyping) stage.current = "completed";
                    return nextTextTyping;
                });
            }
        }
        updateTextArray();
    }, [])

    //______________________________________________________________________________________
    // ===== Hook Return =====
    return { 
        typingText: forcedComplete ? text : typingText, 
        completed: forcedComplete || text === typingText,
    }
}