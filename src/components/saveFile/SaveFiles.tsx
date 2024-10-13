"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFiles } from "@/rQuery/queryOptions/saveFile"
import QueryHandler from "@/rQuery/components/QueryHandler"
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { isArray } from "@/utils"



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
            {(data.data as SaveFile[]).map((saveFile, i) => (
                <div key={i} className="py-3">
                    <Link href={`/play/${saveFile.id}`}>Save {saveFile.id}</Link>
                </div>
            ))}
        </QueryHandler>
    )
}