"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import Link from "next/link";
import { format } from "date-fns";
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// Components -----------------------------------------------------------------------
import Portal from "../Portal";
import SavingGameIcon from "./SavingGameIcon";
import InGameTime from "./InGameTime";
import { Button } from "../shadcn/ui/button";
import EncounterClient from "./EncounterClient";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function CombatClient({ saveFile, encounterKey }: Readonly<{ saveFile?: SaveFile, encounterKey?: string }>){

    //______________________________________________________________________________________
    // ===== Stores =====
    const combatStore = useCombatStore((state) => state);

    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!(saveFile && encounterKey)) return;
    return (
        <div className="overflow-hidden h-0 w-0">

            <Portal targetElementId="debuggerContent" childElementId="combatClient_saveFile.updatedAt">
                <ul id="combatClient_saveFile.updatedAt" className="list-disc ml-5">
                    <li><strong>saveFile.updatedAt: </strong> {format(new Date (saveFile.updatedAt), "P p")}</li>
                    <li><strong>activePhase: </strong> {combatStore?.activePhase}</li>
                    <li><strong>roundCount: </strong> {combatStore?.roundCount}</li>
                    <li><strong>turnCount: </strong> {combatStore?.turnCount}</li>
                </ul>
            </Portal>

            <Portal targetElementId="debuggerCommands" childElementId="combatClient_saveFile">
                <div id="combatClient_saveFile">
                    <Button variant="outline" onClick={()=>console.log({ trace:"CombatClient", saveFile })}>
                        Log Save File
                    </Button>
                    <Button variant="outline" onClick={()=>console.log({ trace:"CombatClient", combatStore })}>
                        Log Combat Store
                    </Button>
                    <Button variant="outline" onClick={()=>combatStore.resetStore()}>
                        Reset Combat Store
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/play/${saveFile.id}`}>Go back to Narrative</Link>
                    </Button>
                </div>
            </Portal>

            <SavingGameIcon/>
            <InGameTime saveFile={saveFile} />
            <EncounterClient saveFile={saveFile} encounterKey={encounterKey} />
        </div>
    )
        
}