// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Server ---------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFile } from "@/rQuery/queryOptions/saveFile";
import QueryPrefetch from "@/rQuery/components/QueryPrefetch";
// Data -----------------------------------------------------------------------------
import { PROJECT_LOWEST_ROLE_FOR_PLAY } from "@/data/_config";
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { NavSheet } from "@/components/navbar/NavbarKit";
import SaveFileLoader from "@/components/SaveFileLoader";
import Panels from "@/components/game/Panels";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page({ params }: { params: { id: string } }){

    //______________________________________________________________________________________
    // ===== Protector =====
    await pageProtection({ requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY, redirectUnauthorized:"/waiting" });



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <NavSheet/>
        <main>
            <QueryPrefetch fallback={<Panels/>} queryOptions={queryOptionsReadSaveFile(params.id)}>
                <SaveFileLoader id={params.id}/>
            </QueryPrefetch>
        </main>
    </>
}