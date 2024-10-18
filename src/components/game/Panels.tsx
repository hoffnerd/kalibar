"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
import { BookIcon, CastleIcon, ScrollTextIcon, UsersIcon } from "lucide-react";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useMobilePanelsStore } from "@/stores/useMobilePanelsStore";
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import MobileNavButton from "../MobileNavButton";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorPurple"



//______________________________________________________________________________________
// ===== Component =====

export default function Panels({ saveFile }: { saveFile?: SaveFile }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const activeNarrativePanel = useMobilePanelsStore((state) => state.activeNarrativePanel);

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-dvh lg:p-6">
            <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
                <div className={`p-6 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

                    <div className="h-full grid gap-6 grid-cols-1 lg:grid-cols-3">

                        <div className={`col-span-2 ${activeNarrativePanel !== "narrative" && "hidden lg:block"}`}>
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
                            ${(activeNarrativePanel === "party" || activeNarrativePanel === "hq") && "xs:grid"}
                        `}>
                            <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${activeNarrativePanel !== "party" && "hidden lg:block"}`}>
                                party
                            </div>
                            <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${activeNarrativePanel !== "hq" && "hidden lg:block"}`}>
                                hq
                            </div>
                        </div>

                    </div>

                </div>
                <div className="lg:hidden w-full h-full">
                    <MobileNavButton type="narrative" panelKey="narrative"><ScrollTextIcon/></MobileNavButton>
                    <MobileNavButton type="narrative" panelKey="party"><UsersIcon/></MobileNavButton>
                    <MobileNavButton type="narrative" panelKey="hq"><CastleIcon/></MobileNavButton>
                    <MobileNavButton type="narrative" panelKey="other"><BookIcon/></MobileNavButton>
                </div>
            </div>
        </div>
    )
}

