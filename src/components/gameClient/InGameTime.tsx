"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { useEffect } from "react";
// Stores ---------------------------------------------------------------------------
import { useGameStore } from "@/stores/useGameStore";
// Data -----------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
import useTimer from "@/hooks/useTimer";
// Components -----------------------------------------------------------------------
import Portal from "../Portal";
import { ReadableTime } from "../microComponents";
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
    return <>
        <Portal targetElementId="debuggerContent">
            <ReadableTime timeInSeconds={seconds} />
        </Portal>
    </>
}
