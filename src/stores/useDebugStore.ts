"use client"

// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types & Interfaces =====

type StoreKeys = "debugMode";
type StoreValues = boolean;

export interface DebugStoreState {
    debugMode: boolean;
}

interface DebugStoreFunctions {
    toggleDebugMode: () => void;
    setStoreKeyValuePair: ( key:StoreKeys, value:StoreValues ) => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: DebugStoreState = {
    debugMode: false,
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useDebugStore = create<DebugStoreState & DebugStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
    setStoreKeyValuePair: (key, value) => set(() => ({ [key]:value })),
}))