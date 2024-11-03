

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Component =====

function EntityCard({ className }: Readonly<{ className?: string; }>){
    return(
        <div className={`absolute ${className}`}>
            <div className="w-20 h-20 bg-slate-600">

            </div>
        </div>
    )
}



//______________________________________________________________________________________
// ===== Component =====

export default function Battlefield(){

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="p-6 w-full h-full">
            <div className="relative w-full h-full">

                <EntityCard className="top-0 left-0" />
                <EntityCard className="bottom-0 left-0" />
                <EntityCard className="top-1/4 left-1/4" />
                <EntityCard className="bottom-1/4 left-1/4" />

                <EntityCard className="top-1/4 right-0" />
                <EntityCard className="bottom-1/4 right-0" />
                <EntityCard className="top-1/2 right-1/4" />

            </div>
        </div>
    )
}

