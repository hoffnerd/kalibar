"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
import { format } from "date-fns";
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFiles } from "@/rQuery/queryOptions/saveFile"
import QueryHandler from "@/rQuery/components/QueryHandler"
// Data -----------------------------------------------------------------------------
import { SAVE_FILE_TYPE_MAPPER } from "@/data/_config"
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/advanced.module.css";
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { ReadableTime } from "../microComponents";
// Other ----------------------------------------------------------------------------
import { isArray } from "@/utils"



//______________________________________________________________________________________
// ===== Micro-Component =====

function SaveFileDisplay({ saveFile }: Readonly<{ saveFile: SaveFile }>){
    const saveFileTypeObj = SAVE_FILE_TYPE_MAPPER.find(x => x.key === saveFile.type);
    return (
        <Link className={`${styles.saveFileButton} w-full`} href={`/play/${saveFile.id}`}>
            <div className="w-full h-52 overflow-hidden border-4 rounded-3xl transition-all neonEffect neBorder neBorderGlow neColorPurple">
                <div className="grid grid-cols-1 sm:grid-cols-2 neonEffect neText neTextGlow neColorBlue">
                    <div/>
                    <div className="h-48 flex flex-row items-center justify-center sm:justify-end px-3">
                        <div className="text-nowrap">
                            <div>Game Mode:&nbsp;&nbsp;</div>
                            <div>In Game Time:&nbsp;&nbsp;</div>
                            <div>Last Saved At:&nbsp;&nbsp;</div>
                            <div>Created At:&nbsp;&nbsp;</div>
                        </div>
                        <div className="overflow-hidden text-nowrap">
                            <div>{saveFileTypeObj?.display || saveFile.type}</div>
                            <div><ReadableTime timeInSeconds={saveFile.inGameTime}/></div>
                            <div>{format(saveFile.updatedAt, "Pp")}</div>
                            <div>{format(saveFile.createdAt, "Pp")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFiles({ fallback }: Readonly<{ fallback?: React.ReactNode }>){
    
    //______________________________________________________________________________________
    // ===== Query =====
    const { isLoading, isError, data } = useSuspenseQuery(queryOptionsReadSaveFiles())



    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <QueryHandler
            isLoading={isLoading}
            isError={isError || data?.error}
            isData={isArray(data?.data)}
            messageError={data?.message}
            messageData="Looks like you don't have any save files. Click the plus button to start the game!"
            componentLoading={fallback}
        >
            {(data.data as SaveFile[]).map(saveFile => (
                <div key={saveFile.id} className="pt-10">
                    <SaveFileDisplay saveFile={saveFile} />
                </div>
            ))}
        </QueryHandler>
    )
}