

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client"
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useMobilePanelsStore } from "@/stores/useMobilePanelsStore";
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import MobileNavButton from "../MobileNavButton";
import { BookIcon, ScrollTextIcon, SwordsIcon, UsersIcon } from "lucide-react";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorPurple"



//______________________________________________________________________________________
// ===== Component =====

export default function Panels({ saveFile }: { saveFile?: SaveFile }){

    //______________________________________________________________________________________
    // ===== Stores =====
    const activeCombatPanel = useMobilePanelsStore((state) => state.activeCombatPanel);

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-dvh lg:p-6">
            <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
                <div className={`p-6 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

                    <div className={`
                        h-full grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:gap-6
                        ${(activeCombatPanel === "initiative" || activeCombatPanel === "narrative") && "!grid-rows-1"}
                    `}>

                        <div className={`grid h-full grid-rows-1 lg:grid-rows-2 gap-6 ${activeCombatPanel === "battlefield" && "pb-6 lg:pb-0"}`}>
                            <div className={`
                                h-full row-span-2 lg:row-span-1 ${BORDER} 
                                ${(activeCombatPanel === "initiative" || activeCombatPanel === "battlefield") ? "" : "hidden lg:block"}
                            `}>
                                Initiative
                            </div>
                            <div className={`h-full row-span-2 lg:row-span-1 ${BORDER} ${activeCombatPanel === "narrative" ? "" : "hidden lg:block"}`}>
                                Narrative
                            </div>
                        </div>

                        <div className={`row-span-3 col-span-2 lg:row-span-1 ${activeCombatPanel !== "battlefield" && "hidden lg:block"}`}>
                            <div className=" h-full grid grid-rows-4 gap-6 sm-h:grid-rows-6 lg:grid-rows-8 lg:gap-6">
                                <div className={`row-span-3 sm-h:row-span-5 lg:row-span-7 ${BORDER}`}>
                                    Battlefield
                                </div>
                                <div className={BORDER}>
                                    Actions
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="lg:hidden w-full h-full">
                    <MobileNavButton type="combat" panelKey="battlefield"><SwordsIcon/></MobileNavButton>
                    <MobileNavButton type="combat" panelKey="initiative"><UsersIcon/></MobileNavButton>
                    <MobileNavButton type="combat" panelKey="narrative"><ScrollTextIcon/></MobileNavButton>
                    <MobileNavButton type="combat" panelKey="other"><BookIcon/></MobileNavButton>
                </div>
            </div>
        </div>
    )
}

