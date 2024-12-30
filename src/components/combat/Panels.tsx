

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
import { BookIcon, ScrollTextIcon, SwordsIcon, UsersIcon } from "lucide-react";
// Stores ---------------------------------------------------------------------------
import { useMobilePanelsStore } from "@/stores/useMobilePanelsStore";
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import MobileNavButton from "../MobileNavButton";
import Initiative from "./initiative/Initiative";
import Actions from "./actions/Actions";
import Battlefield from "./Battlefield";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BORDER = "border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorPurple"



//______________________________________________________________________________________
// ===== Component =====

export default function Panels({ saveFile }: Readonly<{ saveFile?: SaveFile }>){

    //______________________________________________________________________________________
    // ===== Store State =====
    const activeCombatPanel = useMobilePanelsStore((state) => state.activeCombatPanel);

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-dvh lg:p-6">
            <div className="h-full grid grid-rows-5 sm-h:grid-rows-8 gap-3">
                <div className={`px-3 pt-3 row-span-4 sm-h:row-span-7 lg:p-0 lg:!row-span-8`}>

                    <div className={`
                        h-full grid grid-rows-4 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 lg:gap-6
                        ${(activeCombatPanel === "initiative" || activeCombatPanel === "narrative") && "!grid-rows-1"}
                    `}>

                        <div className={`grid h-full grid-rows-1 lg:grid-rows-2 gap-6 ${activeCombatPanel === "battlefield" && "pb-6 lg:pb-0"}`}>
                            <div className={`
                                h-full overflow-hidden row-span-2 lg:row-span-1 ${BORDER} 
                                ${(activeCombatPanel === "initiative" || activeCombatPanel === "battlefield") ? "" : "hidden lg:block"}
                            `}>
                                <Initiative/>
                            </div>
                            <div className={`
                                h-full overflow-hidden row-span-2 lg:row-span-1 ${BORDER} 
                                ${activeCombatPanel === "narrative" ? "" : "hidden lg:block"}
                            `}>
                                Narrative
                            </div>
                        </div>

                        <div className={`row-span-3 col-span-2 lg:row-span-1 ${activeCombatPanel !== "battlefield" && "hidden lg:block"}`}>
                            <div className="h-full grid grid-rows-5 gap-6 sm-h:grid-rows-6 md-h:grid-rows-9 lg:gap-6">
                                <div className={`overflow-hidden row-span-4 sm-h:row-span-5 md-h:row-span-8 ${BORDER}`}>
                                    <Battlefield/>
                                </div>
                                <div className={`overflow-hidden ${BORDER}`}>
                                    <Actions/>
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

