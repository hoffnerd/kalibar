"use client"

// Types ----------------------------------------------------------------------------
import { type CombatEntity, type CharacterSaveData} from '@/typeDefs';
import { type Encounter } from '@/data/combat/encounters';
import { type CharacterKey } from '@/data/characters';
// Packages -------------------------------------------------------------------------
import { create } from 'zustand'
// Actions --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { configureEnemyEntities, configureFriendlyEntities, getInitiativeOrder } from '@/utils/combat';



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export type FriendlyCharacterSaveData = {
    [key in CharacterKey]?: CharacterSaveData;
}

type FriendlyEntities = {
    [key in CharacterKey]?: CombatEntity;
}

type EnemyEntities = {
    [key: string]: CombatEntity;
}

export type CombatStoreEntities = FriendlyEntities & EnemyEntities

type StoreKeys = keyof CombatStoreState;

export interface CombatStoreState {
    entities: CombatStoreEntities;
    initiativeOrder: Array<string>;
    startingEntityKey?: string | null;
    roundCount: number;
    turnCount: number;
    backgroundTurnCount: number;
    narrative: Array<any>;
    attackSelected: null;
}

interface CombatStoreFunctions {
    resetStore: () => void;
    setStoreKeyValuePair: ( key:StoreKeys, value:any ) => void;
    initializeCombat: ( friendlies:FriendlyCharacterSaveData, encounter:Encounter ) => void;
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

    resetStore: () => set(() => DEFAULT_STORE),
    setStoreKeyValuePair: (key, value) => set(() => ({ [key]:value })),
    initializeCombat: (friendlies, encounter) => {
        const entities = structuredClone({ ...configureFriendlyEntities(friendlies), ...configureEnemyEntities(encounter) });
        const initiativeOrder = getInitiativeOrder(entities);
        set(() => ({ entities, initiativeOrder, startingEntityKey: initiativeOrder[0] }));
    }
}))