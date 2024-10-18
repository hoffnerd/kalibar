"use client"

// Types ----------------------------------------------------------------------------
import { type MobilePanelsStoreState } from "@/stores/useMobilePanelsStore"
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useMobilePanelsStore } from "@/stores/useMobilePanelsStore"
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import { Button } from "./shadcn/ui/button";
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Components =====

export default function MobileNavButton({
    children,
    type,
    panelKey,
}: {
    children?: React.ReactNode;
    type: "narrative" | "combat"
    panelKey: MobilePanelsStoreState["activeNarrativePanel"] | MobilePanelsStoreState["activeCombatPanel"];
}) {

    //______________________________________________________________________________________
    // ===== Stores =====
    const setActiveNarrativePanel = useMobilePanelsStore((state) => state.setActiveNarrativePanel);
    const setActiveCombatPanel = useMobilePanelsStore((state) => state.setActiveCombatPanel);

    //______________________________________________________________________________________
    // ===== Functions =====
    const onClick = () => {
        if(type === "narrative") setActiveNarrativePanel(panelKey as MobilePanelsStoreState["activeNarrativePanel"]);
        if(type === "combat") setActiveCombatPanel(panelKey as MobilePanelsStoreState["activeCombatPanel"]);
    }

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <Button variant="ghost" className="w-1/4 h-full *:w-1/2 *:h-1/2" onClick={onClick}>{children}</Button>;
}
