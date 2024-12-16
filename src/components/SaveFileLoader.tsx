"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { useSuspenseQuery } from "@tanstack/react-query"
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile"
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import QueryHandler from "@/rQuery/components/QueryHandler";
import Panels from "./game/Panels";
import Game from "./game/Game";
import GameClient from "./gameClient/GameClient";
import CombatClient from "./gameClient/CombatClient";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function SaveFileLoader({
    params,
    type,
}: Readonly<{
    params: { id: string; encounterKey?: string };
    type?: "NARRATIVE" | "COMBAT";
}>) {
    
    //______________________________________________________________________________________
    // ===== Query =====
    const { isLoading, isError, data } = useSuspenseQuery(queryOptionsReadSaveFile(params.id));



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
            {type === "COMBAT" 
                ? <CombatClient saveFile={data?.data} encounterKey={params.encounterKey} />
                : <GameClient saveFile={data?.data} />
            } 
            <Game type={type} saveFile={data?.data} />
        </QueryHandler>
    )
}