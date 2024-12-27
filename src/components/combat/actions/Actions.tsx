

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { useState } from "react";
// Stores ---------------------------------------------------------------------------
import { getAction, useCombatStore } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../../shadcn/ui/button";
// Components -----------------------------------------------------------------------
import Portal from "../../Portal";
import ActionBar from "./ActionBar";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====

function ActionBarEndCombat(){
    return (
        <div className={`h-full grid grid-cols-2 p-0 space-x-0 border-0`}>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap neColorOrange`} onClick={() => console.log("Kill Unconscious")}>
                Leave Without Killing the Unconscious
            </Button>
            <Button size="none" variant="neonEffect" className={`h-full text-wrap neColorRed`} onClick={() => console.log("Kill Unconscious")}>
                Kill Enemies that are Unconscious
            </Button>
        </div>
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function Actions(){

    //______________________________________________________________________________________
    // ===== Store State =====
    const activePhase = useCombatStore(state => state.activePhase);
    const actionSelected = useCombatStore(state => state.actionSelected);
    const actionObj = actionSelected && getAction(actionSelected);
    console.log({ activePhase, actionSelected, actionObj });


    //______________________________________________________________________________________
    // ===== Store Functions =====
    const clearActionSelected = useCombatStore(state => state.clearActionSelected);

    

    //______________________________________________________________________________________
    // ===== State =====
    const [allUnconscious, setAllUnconscious] = useState<boolean>(false);


    
    //______________________________________________________________________________________
    // ===== Component Return =====

    if(activePhase === "actionSelect") return (
        <>
            <Portal targetElementId="debuggerCommands" childElementId="combatActions">
                <Button 
                    id="combatActions"
                    variant="outline"
                    onClick={()=>setAllUnconscious((previousAllUnconscious) => !previousAllUnconscious)}
                >
                    Toggle All Unconscious
                </Button>
            </Portal>

            {allUnconscious
                ? <ActionBarEndCombat/>
                : <ActionBar/>
            }
        </>
    )

    if(activePhase === "entitySelect") return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="w-3/4 px-4 py-2 overflow-auto h-full md:h-auto">
                <div className="text-sm md:text-sm text-gray-50">
                    {actionObj?.display}
                    {actionObj?.targetType && " | Target: "}
                    {actionObj?.targetAmount && <span className="capitalize">{actionObj.targetAmount}&nbsp;</span>}
                    {actionObj?.targetType && actionObj?.targetAmount !== "self" && <span className="capitalize">{actionObj.targetType}</span>}
                </div>
                <div className="text-sm text-gray-400">{actionObj?.description}</div>
            </div>
            <Button 
                variant="neonEffectWithGlow"
                className="neColorRed h-full w-1/4"
                onClick={()=>clearActionSelected()}
            >
                <span className="block md:hidden">X</span>
                <span className="hidden md:block">Cancel</span>
            </Button>
        </div>
    )
    
    return (
        <div className="h-full w-full flex items-center justify-center text-center">
            <span className="text-xl text-gray-400">Nothing to do...</span>
        </div>
    );
}

