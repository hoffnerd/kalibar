"use client"

// Packages --------------------------------------------------------------------------
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { BugOffIcon } from "lucide-react";
// Stores ----------------------------------------------------------------------------
import { useDebugStore } from "@/stores/useDebugStore";
// Hooks -----------------------------------------------------------------------------
import useDrag from "@/hooks/useDrag";
// Components ------------------------------------------------------------------------
import { Button } from "./shadcn/ui/button";
// Other -----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export function Debugger({ children }: Readonly<{ children?: React.ReactNode; }>){
    
    //______________________________________________________________________________________
    // ===== References =====
    const ref = useRef(null);

    //______________________________________________________________________________________
    // ===== Hooks =====
    const { data: session, status} = useSession();
    const { position, handleMouseDown } = useDrag({ ref });

    //______________________________________________________________________________________
    // ===== Stores =====
    const debugMode = useDebugStore((state) => state.debugMode);
    const toggleDebugMode = useDebugStore((state) => state.toggleDebugMode);

    //______________________________________________________________________________________
    // ===== Component Return =====
    if(session?.user?.role !== "ADMIN") return;
    return (
        <div 
            ref={ref} 
            className="fixed top-3 right-3 max-w-64 overflow-hidden border-2 border-slate-100"
            style={{ top:position.y, left:position.x }}
        >
            <div
                className="cursor-move border-b bg-slate-950 border-slate-100" 
                onMouseDown={handleMouseDown}
            >
                <div className="flex w-full">
                    <Button variant="ghost" className="float-right *:w-5 *:h-5" onClick={toggleDebugMode}>
                        <BugOffIcon/>
                    </Button>
                </div>
            </div>
           <div id="debuggerContent" className={debugMode ? "p-4 bg-slate-950" : "hidden"}>
                content
                {children}
            </div>
        </div>
    )
}