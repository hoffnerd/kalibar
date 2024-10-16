// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Server ---------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// rQuery ---------------------------------------------------------------------------
import { queryOptionsReadSaveFiles } from "@/rQuery/queryOptions/saveFile";
import QueryPrefetch from "@/rQuery/components/QueryPrefetch";
// Data -----------------------------------------------------------------------------
import { PROJECT_BACKGROUND, PROJECT_LOWEST_ROLE_FOR_PLAY } from "@/data/_config";
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { NavbarKit } from "@/components/navbar/NavbarKit";
import NewSaveFile from "@/components/saveFile/NewSaveFile";
import SaveFiles from "@/components/saveFile/SaveFiles";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====

function Loading(){
    return <h3 className="text-2xl sm:text-4xl font-black text-center">...Loading Saves...</h3>;
}



//______________________________________________________________________________________
// ===== Component =====

export default async function Page(){

    //______________________________________________________________________________________
    // ===== Protector =====
    await pageProtection({ requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY, redirectUnauthorized:"/waiting" });



    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <NavbarKit/>
        <div className={PROJECT_BACKGROUND}>
            <main className="container m-auto sm:px-0 px-4">
                <h2 className="text-3xl sm:text-5xl font-black pt-10">Save Files</h2>
                <div className="w-full border-2 neonEffect neBorder neBorderGlow neColorBlue"/>
                <div className="py-10">
                    <NewSaveFile/>
                    <QueryPrefetch fallback={<Loading/>} queryOptions={queryOptionsReadSaveFiles()}>
                        <SaveFiles fallback={<Loading/>} />
                    </QueryPrefetch>
                </div>
            </main>

        </div>
    </>
}