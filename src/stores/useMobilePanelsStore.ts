"use client"

// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types =====

export interface MobilePanelsStoreState {
    activeNarrativePanel: "narrative" | "party" | "hq" | "other";
    activeCombatPanel: "battlefield" | "initiative" | "narrative" | "other";
}

interface MobilePanelsStoreFunctions {
    setActiveNarrativePanel: ( value: MobilePanelsStoreState["activeNarrativePanel"] ) => void;
    setActiveCombatPanel: ( value: MobilePanelsStoreState["activeCombatPanel"] ) => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: MobilePanelsStoreState = {
    activeNarrativePanel: "narrative",
    activeCombatPanel: "battlefield",
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useMobilePanelsStore = create<MobilePanelsStoreState & MobilePanelsStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    setActiveNarrativePanel: (value) => set((state) => ({ activeNarrativePanel:value })),
    setActiveCombatPanel: (value) => set((state) => ({ activeCombatPanel:value })),
}))