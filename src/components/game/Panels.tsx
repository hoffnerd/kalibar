"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { BookIcon, CastleIcon, ScrollTextIcon, UsersIcon } from "lucide-react";
// Stores ---------------------------------------------------------------------------
import { useMobilePanelsStore } from "@/stores/useMobilePanelsStore";
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import MobileNavButton from "../MobileNavButton";
import Choices from "./Choices";
import Narrative from "./Narrative";
import Party from "./Party";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorPurple"



//______________________________________________________________________________________
// ===== Component =====

export default function Panels({ saveFile }: Readonly<{ saveFile?: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Stores =====
    const activeNarrativePanel = useMobilePanelsStore((state) => state.activeNarrativePanel);

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-dvh lg:p-6">
            <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
                <div className={`px-3 pt-3 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

                    <div className={`h-full grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:gap-6`}>

                        <div className={`row-span-4 col-span-2 lg:row-span-1 ${activeNarrativePanel !== "narrative" && "hidden lg:block"}`}>
                            <div className="h-full grid grid-rows-5 gap-6 sm-h:grid-rows-6 md-h:grid-rows-9 lg:gap-6">
                                <div className={`overflow-hidden row-span-4 sm-h:row-span-5 md-h:row-span-8 ${BORDER}`}>
                                    {saveFile?.saveData && <Narrative saveData={saveFile.saveData} />}
                                </div>
                                <div className={`overflow-hidden ${BORDER}`}>
                                    <Choices saveData={saveFile?.saveData}/>
                                </div>
                            </div>
                        </div>

                        <div className={`
                            hidden h-full gap-6 grid-rows-1 row-span-4 lg:row-span-1 lg:grid lg:grid-rows-2
                            ${(activeNarrativePanel === "party" || activeNarrativePanel === "hq") && "xs:grid"}
                        `}>
                            <div className={`
                                h-full overflow-hidden row-span-2 lg:row-span-1 ${BORDER} 
                                ${activeNarrativePanel !== "party" && "hidden lg:block"}
                            `}>
                                <Party saveData={saveFile?.saveData}/>
                            </div>
                            <div className={`
                                h-full overflow-hidden row-span-2 lg:row-span-1 ${BORDER} 
                                ${activeNarrativePanel !== "hq" && "hidden lg:block"}
                            `}>
                                HQ
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

