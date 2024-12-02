"use client";

// Packages --------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { BugOffIcon } from "lucide-react";
// Stores ----------------------------------------------------------------------------
// Hooks -----------------------------------------------------------------------------
import useDrag from "@/hooks/useDrag";
// Components ------------------------------------------------------------------------
import { Button } from "../shadcn/ui/button";
// Other -----------------------------------------------------------------------------

//______________________________________________________________________________________
// ===== Component =====

export function Debugger({
    children,
}: Readonly<{ 
    children?: React.ReactNode 
}>) {

    //______________________________________________________________________________________
    // ===== References =====
    const ref = useRef(null);

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data: session, status } = useSession();
    const { position, handleMouseDown } = useDrag({ ref });

    //______________________________________________________________________________________
    // ===== State =====
    const [openDebugger, setOpenDebugger] = useState<boolean>(false);
    const [openCommands, setOpenCommands] = useState<boolean>(false);

    //______________________________________________________________________________________
    // ===== Component Return =====
    if (session?.user?.role !== "ADMIN") return;
    return (
        <div
            ref={ref}
            className={`fixed right-3 top-3 z-50 max-w-64 overflow-hidden border-2 border-slate-100 ${(!openDebugger) && "w-14"}`}
            style={{ top: position.y, left: position.x }}
        >
            <div
                className="cursor-move border-b border-slate-100 bg-slate-950"
                onMouseDown={handleMouseDown}
            >
                <div className="flex w-full">
                    <Button
                        variant="ghost"
                        className="float-right *:h-5 *:w-5"
                        onClick={()=>setOpenDebugger(previousOpen => !previousOpen)}
                    >
                        <BugOffIcon />
                    </Button>
                </div>
            </div>
            <div
                id="debuggerContent"
                className={`relative overflow-auto ${openDebugger ? "bg-slate-950 p-4" : "hidden"}`}
            >  
                <Button variant="outline" className="full-w" onClick={()=>setOpenCommands(previousOpen => !previousOpen)}>
                    {openCommands ? "Close" : "Open"} Commands
                </Button>
                <div className={`absolute top-14 left-0 p-3 bg-slate-800 border-2 border-slate-100 w-64 ${(!openCommands) && "hidden"}`}>
                    <div id="debuggerCommands"/>
                </div>
                <br />
                <br />
                {children}
            </div>
        </div>
    );
}
