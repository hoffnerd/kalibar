"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { format } from "date-fns";
// Stores ---------------------------------------------------------------------------
import { useGameStore } from "@/stores/useGameStore";
// Data -----------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
import useTimer from "@/hooks/useTimer";
// Components -----------------------------------------------------------------------
import Portal from "../Portal";
import { ReadableTime } from "../microComponents";
import { Button } from "../shadcn/ui/button";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function InGameTime({ saveFile }: Readonly<{ saveFile: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Stores =====
    const setStoreKeyValuePair = useGameStore((state) => state.setStoreKeyValuePair);

    //______________________________________________________________________________________
    // ===== Hooks =====
    const [ seconds ] = useTimer(1000, { initialCycles: (saveFile.inGameTime || 0) });

    //______________________________________________________________________________________
    // ===== Use Effect =====
    useEffect(() => {
        setStoreKeyValuePair("inGameTime", seconds)
    }, [seconds])

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Portal targetElementId="debuggerContent" childElementId="inGameTime_seconds">
            <ul id="inGameTime_seconds" className="list-disc ml-5">
                <li>
                    <strong>In Game Time: </strong>
                    <ReadableTime timeInSeconds={seconds} />
                </li>
            </ul>
        </Portal>
    );
}
