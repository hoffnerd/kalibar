"use client"

// Types ----------------------------------------------------------------------------
import { type Encounter } from '@/data/encounters/test';
import { type SaveFile } from '@/typeDefs';
// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Types & Interfaces =====

type StoreKeys = keyof CombatStoreState;
// type StoreValues = boolean;

export interface CombatStoreState {
    entities: object;
    initiativeOrder: Array<string>;
    startingEntityKey?: string | null;
    roundCount: number;
    turnCount: number;
    backgroundTurnCount: number;
    narrative: Array<any>;
    attackSelected: null;
}

interface CombatStoreFunctions {
    setStoreKeyValuePair: ( key:StoreKeys, value:any ) => void;
    initializeCombat: ( saveFile:SaveFile, encounter:Encounter ) => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: CombatStoreState = {
    entities: {},
    initiativeOrder: [],
    startingEntityKey: null,
    roundCount: 0,
    turnCount: 0,
    backgroundTurnCount: 0,
    narrative: [],
    attackSelected: null,
}



//______________________________________________________________________________________
// ===== Functions =====



//______________________________________________________________________________________
// ===== Store =====

export const useCombatStore = create<CombatStoreState & CombatStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    setStoreKeyValuePair: (key, value) => set(() => ({ [key]:value })),
    initializeCombat: (saveFile, encounter) => {

    }
}))