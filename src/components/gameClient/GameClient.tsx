"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { format } from "date-fns";
import Link from "next/link";
// rQuery ---------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import Portal from "../Portal";
import SavingGameIcon from "./SavingGameIcon";
import InGameTime from "./InGameTime";
import NarrativeClient from "./NarrativeClient";
import { Button } from "../shadcn/ui/button";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function GameClient({ saveFile }: Readonly<{ saveFile?: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!saveFile) return;
    return (
        <div className="overflow-hidden h-0 w-0">

            <Portal targetElementId="debuggerContent" childElementId="gameClient_saveFile.updatedAt">
                <ul id="gameClient_saveFile.updatedAt" className="list-disc ml-5">
                    <li>
                        <strong>saveFile.updatedAt: </strong>
                        {format(new Date (saveFile.updatedAt), "P p")}
                    </li>
                </ul>
            </Portal>

            <Portal targetElementId="debuggerCommands" childElementId="gameClient_saveFile">
                <div id="gameClient_saveFile">
                    <Button 
                        variant="outline"
                        onClick={()=>console.log({ trace:"GameClient", saveFile })}
                    >
                        Log Save File
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/play/${saveFile.id}/test`}>Go to test encounter</Link>
                    </Button>
                </div> 
            </Portal>

            <SavingGameIcon/>
            <InGameTime saveFile={saveFile} />
            <NarrativeClient saveFile={saveFile} />
        </div>
    )
        
}