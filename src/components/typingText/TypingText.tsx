"use client";

// Types ----------------------------------------------------------------------------
import { type NarrativeDisplayComponent } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useEffect } from "react";
// Hooks ---------------------------------------------------------------------------
import useTypingText from "@/hooks/useTypingText";
// Data -----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import Text from "./Text";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function TypingText({
    forcedComplete,
    text,
    component="span",
    className,
    getCompleted,
}: Readonly<{ 
    forcedComplete?: boolean;
    text: string; 
    component?: NarrativeDisplayComponent["component"];
    className?: NarrativeDisplayComponent["className"];
    getCompleted: ( completed:boolean ) => void;
}>) {

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { typingText, completed } = useTypingText({ text, forcedComplete });

    //______________________________________________________________________________________
    // ===== Use Effects =====
    useEffect(() => {
        getCompleted(completed);
    }, [completed])
    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return <Text className={className} component={component}>{typingText}</Text>
}