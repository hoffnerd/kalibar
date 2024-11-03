"use client"

import useTimer from "@/hooks/useTimer";
// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Portal({
    children,
    targetElementId,
}: Readonly<{ 
    children: React.ReactNode; 
    targetElementId: string 
}>){

    //______________________________________________________________________________________
    // ===== Use Ref =====
    const targetElement = useRef<Element | any>(null);



    //______________________________________________________________________________________
    // ===== Hooks =====
    const [ seconds, stopTimer ] = useTimer(1000);



    //______________________________________________________________________________________
    // ===== Use Effect =====

    // useEffect(() => {
    //     targetElement.current = window.document.getElementById(targetElementId);
    // }, [])

    useEffect(() => {
        console.log({ trace:`Portal > ${targetElementId}`, "targetElement.current": targetElement.current })
        if(targetElement.current){
            stopTimer();
            return;
        }
        targetElement.current = window.document.getElementById(targetElementId);
    }, [seconds, targetElement.current])



    //______________________________________________________________________________________
    // ===== Component Return =====
    if(!targetElement.current) return;
    return createPortal(children, targetElement.current);
}
