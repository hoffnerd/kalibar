"use client"


// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
import { useSuspenseQuery } from "@tanstack/react-query"
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile"
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import QueryHandler from "@/rQuery/components/QueryHandler"
import Panels from "./Panels"
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Game({ id }: { id: SaveFile["id"] }){
    
    //______________________________________________________________________________________
    // ===== Query =====
    const { isLoading, isError, data } = useSuspenseQuery(queryOptionsReadSaveFile(id));



    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <QueryHandler
            isLoading={isLoading}
            isError={isError || data?.error}
            isData={(data.data as SaveFile)?.id}
            messageError={data?.message}
            componentLoading={<Panels/>}
        >
            <Panels saveFile={data?.data} />
        </QueryHandler>
    )
}