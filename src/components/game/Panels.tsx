

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorPurple"



//______________________________________________________________________________________
// ===== Component =====

export default function Panels({ saveFile }: { saveFile?: SaveFile }){
    // const fakeState: string = "battlefield" // battlefield | initiative | narrative
    // return (
    //     <div className="h-dvh lg:p-6">
    //         <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
    //             <div className={`p-6 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

    //                 <div className="h-full grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:gap-6">

    //                     <div className={`grid h-full grid-rows-1 lg:grid-rows-2 gap-6 ${fakeState === "battlefield" && "pb-6 lg:pb-0"}`}>
    //                         <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${(fakeState === "initiative" || fakeState === "battlefield") ? "" : "hidden lg:block"}`}>
    //                             Initiative
    //                         </div>
    //                         <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${fakeState === "narrative" ? "" : "hidden lg:block"}`}>
    //                             Narrative
    //                         </div>
    //                     </div>

    //                     <div className={`row-span-3 col-span-2 lg:row-span-1 ${fakeState !== "battlefield" && "hidden lg:block"}`}>
    //                         <div className=" h-full grid grid-rows-4 gap-6 sm-h:grid-rows-6 lg:grid-rows-8 lg:gap-6">
    //                             <div className={`row-span-3 sm-h:row-span-5 lg:row-span-7 ${BORDER}`}>
    //                                 Battlefield
    //                             </div>
    //                             <div className={BORDER}>
    //                                 Actions
    //                             </div>
    //                         </div>
    //                     </div>

    //                 </div>

    //             </div>
    //             <div className={`lg:hidden ${BORDER}`}>
    //                 Mobile Buttons
    //             </div>
    //         </div>
    //     </div>
    // )


    
    const fakeState: string = "party" // narrative | party | hq | other
    return (
        <div className="h-dvh lg:p-6">
            <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
                <div className={`p-6 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

                    <div className="h-full grid gap-6 grid-cols-1 lg:grid-cols-3">

                        <div className={`col-span-2 ${fakeState !== "narrative" && "hidden lg:block"}`}>
                            <div className=" h-full grid grid-rows-4 gap-6 sm-h:grid-rows-6 lg:grid-rows-8 lg:gap-6">
                                <div className={`row-span-3 sm-h:row-span-5 lg:row-span-7 ${BORDER}`}>
                                    narrative
                                </div>
                                <div className={BORDER}>
                                    choices
                                </div>
                            </div>
                        </div>

                        <div className={`
                            hidden h-full grid-rows-2 gap-6 lg:grid 
                            ${(fakeState === "party" || fakeState === "hq") && "xs:grid"}
                        `}>
                            <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${fakeState !== "party" && "hidden lg:block"}`}>
                                party
                            </div>
                            <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${fakeState !== "hq" && "hidden lg:block"}`}>
                                hq
                            </div>
                        </div>

                    </div>

                </div>
                <div className={`lg:hidden ${BORDER}`}>
                    Mobile Buttons
                </div>
            </div>
        </div>
    )
}

