"use client"

// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types & Interfaces =====

type StoreKeys = "isGameSaving" | "inGameTime" | "lastSavedTime";
type StoreValues = number | boolean | Date;

export interface GameStoreState {
    isGameSaving: boolean;
    inGameTime: number;
    lastSavedTime: Date;
}

interface GameStoreFunctions {
    setStoreKeyValuePair: ( key:StoreKeys, value:StoreValues ) => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: GameStoreState = {
    isGameSaving: false,
    inGameTime: 0,
    lastSavedTime: new Date(),
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useGameStore = create<GameStoreState & GameStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    setStoreKeyValuePair: (key, value) => set(() => ({ [key]:value })),
}))