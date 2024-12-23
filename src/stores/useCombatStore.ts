"use client"

// Types ----------------------------------------------------------------------------
import { type CombatEntity, type CharacterSaveData} from '@/typeDefs';
import { type Encounter } from '@/data/combat/encounters';
import { type CharacterKey } from '@/data/characters';
import { INVENTORY_ITEMS, type InventoryItemKey } from '@/data/inventoryItems';
import { MANEUVERS, type ManeuverKey } from '@/data/maneuvers';
import { ADDITIONAL_ACTIONS, type AdditionalActionKey } from '@/data/combat/additionalActions';
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

interface CombatStoreActionSelected { 
    maneuverKey?: ManeuverKey, 
    inventoryItemKey?: InventoryItemKey, 
    additionalActionKey?: AdditionalActionKey 
}

type StoreKeys = keyof CombatStoreState;

export interface CombatStoreState {
    entities: CombatStoreEntities;
    initiativeOrder: Array<string>;
    startingEntityKey?: string | null;
    roundCount: number;
    turnCount: number;
    backgroundTurnCount: number;
    narrative: Array<any>;
    actionSelected: CombatStoreActionSelected | null;
    entitySelected: keyof CombatStoreEntities | null;
}

interface CombatStoreFunctions {
    resetStore: () => void;
    setStoreKeyValuePair: ( key:StoreKeys, value:any ) => void;

    initializeCombat: ( friendlies:FriendlyCharacterSaveData, encounter:Encounter ) => void;

    buffEffectsPhase: () => void;
    actionSelectPhase: (actionSelected: CombatStoreActionSelected) => void;
    entitySelectPhase: (entitySelected: keyof CombatStoreEntities) => void;
    executeActionPhase: () => void;
    nerfEffectsPhase: () => void;
    handleConditionsPhase: () => void;
    nextTurn: () => void;
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
    actionSelected: null,
    entitySelected: null,
}



//______________________________________________________________________________________
// ===== Functions =====

const getAction = (actionSelected: CombatStoreActionSelected) => {
    if(actionSelected.maneuverKey) return MANEUVERS[actionSelected.maneuverKey];
    if(actionSelected.inventoryItemKey) return INVENTORY_ITEMS[actionSelected.inventoryItemKey];
    if(actionSelected.additionalActionKey) return ADDITIONAL_ACTIONS[actionSelected.additionalActionKey];
    return null;
}



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
    }, 

    buffEffectsPhase: () => set((state) => {
        if(!state?.initiativeOrder?.[0]) return state;
        const entityKey = state.initiativeOrder[0];
        let entity = structuredClone(state.entities[entityKey]) as CombatEntity;

        // Standard HP Regen
        entity.hp += (entity.skills.regenHealth || 0);
        if(entity.hp > entity.skills.maxHealth) entity.hp = entity.skills.maxHealth;

        // Other Buffs...

        // Apply changes
        return { 
            entities: { ...state.entities, [entityKey]: { ...entity } } 
        }
    }),
    
    actionSelectPhase: (actionSelected) => set(()=>({ actionSelected })),

    entitySelectPhase: (entitySelected) => set(()=>({ entitySelected })),

    executeActionPhase: () => set((state) => {
        if(!state?.initiativeOrder?.[0]) return state;
        if(!state.actionSelected) return state;
        if(!state.entitySelected) return state;
        const action = getAction(state.actionSelected);
        let userEntity = structuredClone(state.entities[state.initiativeOrder[0]]) as CombatEntity;
        let targetEntity = structuredClone(state.entities[state.entitySelected]) as CombatEntity;
        
        // TODO: have `userEntity` and `action` effect the `targetEntity`

        return {
            entities: { 
                ...state.entities, 
                [state.initiativeOrder[0]]: userEntity,
                [state.entitySelected]: targetEntity,
            },
            actionSelected: null,
            entitySelected: null,
        }
    }),

    nerfEffectsPhase: () => set((state) => {
        if(!state?.initiativeOrder?.[0]) return state;
        const entityKey = state.initiativeOrder[0];
        let entity = structuredClone(state.entities[entityKey]) as CombatEntity;

        // TODO Nerfs...

        // Apply changes6
        return { 
            entities: { ...state.entities, [entityKey]: { ...entity } } 
        }
    }),

    handleConditionsPhase: () => set((state) => {
        let entities = structuredClone(state.entities);

        // TODO: Handle conditions

        return { entities }
    }),

    nextTurn: () => set((state) => {
        let initiativeOrder = structuredClone(state.initiativeOrder);
        const turnTakerEntityKey = initiativeOrder.shift() as string;
        initiativeOrder.push(turnTakerEntityKey);
        return { initiativeOrder }
    }),
}))