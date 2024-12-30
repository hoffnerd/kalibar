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
import { calculateSkill, configureEnemyEntities, configureFriendlyEntities, getInitiativeOrder, getTotalLevel } from '@/utils/combat';
import { SKILLS } from '@/data/abilities';



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

export interface CombatStoreActionSelected { 
    maneuverKey?: ManeuverKey, 
    inventoryItemKey?: InventoryItemKey, 
    additionalActionKey?: AdditionalActionKey 
}

type StoreKeys = keyof CombatStoreState;

export interface CombatStoreState {
    activePhase: "initializeCombat" | "buffEffects" | "actionSelect" | "entitySelect" | "executeAction" | "nerfEffects" | "handleConditions" | "nextTurn";
    entities: CombatStoreEntities;
    initiativeOrder: Array<string>;
    startingEntityKey?: string | null;
    roundCount: number;
    turnCount: number;
    narrative: Array<any>;
    actionSelected: CombatStoreActionSelected | null;
    entitySelected: keyof CombatStoreEntities | null;
}

interface CombatStoreFunctions {
    resetStore: () => void;
    setStoreKeyValuePair: ( key:StoreKeys, value:any ) => void;
    incrementRoundCount: () => void;
    incrementTurnCount: () => void;

    initializeCombat: ( friendlies:FriendlyCharacterSaveData, encounter:Encounter ) => void;

    buffEffectsPhase: () => void;
    actionSelectPhase: (actionSelected: CombatStoreActionSelected) => void;
    clearActionSelected: () => void;
    entitySelectPhase: (entitySelected: keyof CombatStoreEntities) => void;
    clearEntitySelected: () => void;
    executeActionPhase: () => void;
    nerfEffectsPhase: () => void;
    handleConditionsPhase: () => void;
    nextTurn: () => void;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_STORE: CombatStoreState = {
    activePhase: "initializeCombat",
    entities: {},
    initiativeOrder: [],
    startingEntityKey: null,
    roundCount: 0,
    turnCount: 0,
    narrative: [],
    actionSelected: null,
    entitySelected: null,
}



//______________________________________________________________________________________
// ===== Functions =====

export const getAction = (actionSelected: CombatStoreActionSelected) => {
    if(actionSelected.maneuverKey) return MANEUVERS[actionSelected.maneuverKey];
    if(actionSelected.inventoryItemKey) return INVENTORY_ITEMS[actionSelected.inventoryItemKey];
    if(actionSelected.additionalActionKey) return ADDITIONAL_ACTIONS[actionSelected.additionalActionKey];
    return null;
}

export const getActionAndType = (actionSelected: CombatStoreActionSelected) => {
    if(actionSelected.maneuverKey) return { action: MANEUVERS[actionSelected.maneuverKey], type: "maneuver" };
    if(actionSelected.inventoryItemKey) return { action: INVENTORY_ITEMS[actionSelected.inventoryItemKey], type: "inventoryItem" };
    if(actionSelected.additionalActionKey) return { action: ADDITIONAL_ACTIONS[actionSelected.additionalActionKey], type: "additionalAction" };
    return { action: null, type: null };
}

const handleNextTurn = ( initiativeOrder:Array<string>, entities:CombatStoreEntities, depth:number = 0 ) => {
    if(depth > 100) return initiativeOrder;
    if(!initiativeOrder?.[0]) return initiativeOrder;
    let initiativeOrderCloned = structuredClone(initiativeOrder);
    const turnTakerEntityKey = initiativeOrderCloned.shift() as string;
    initiativeOrderCloned.push(turnTakerEntityKey);
    
    let newTurnTakerEntityKey = initiativeOrderCloned[0];
    const newTurnTakerEntity = newTurnTakerEntityKey && entities[newTurnTakerEntityKey];
    if(newTurnTakerEntity && (newTurnTakerEntity?.isDead || newTurnTakerEntity?.isUnconscious || newTurnTakerEntity?.isHidden)){
        return handleNextTurn(initiativeOrderCloned, entities, depth + 1);
    }
    return initiativeOrderCloned;
}



//______________________________________________________________________________________
// ===== Store =====

export const useCombatStore = create<CombatStoreState & CombatStoreFunctions>()((set) => ({
    ...DEFAULT_STORE,

    resetStore: () => set(() => DEFAULT_STORE), 
    setStoreKeyValuePair: (key, value) => set(() => ({ [key]:value })),
    incrementRoundCount: () => set((state) => ({ roundCount: state.roundCount + 1 })),
    incrementTurnCount: () => set((state) => ({ turnCount: state.turnCount + 1 })),

    initializeCombat: (friendlies, encounter) => {
        const entities = structuredClone({ ...configureFriendlyEntities(friendlies), ...configureEnemyEntities(encounter) });
        const initiativeOrder = getInitiativeOrder(entities);
        set(() => ({
            activePhase: "buffEffects",
            entities, 
            initiativeOrder, 
            startingEntityKey: initiativeOrder[0] 
        }));
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
            activePhase: "actionSelect",
            entities: { ...state.entities, [entityKey]: { ...entity } } 
        }
    }),
    
    actionSelectPhase: (actionSelected) => set(()=>({ activePhase: "entitySelect", actionSelected })),
    clearActionSelected: () => set(()=>({ activePhase: "actionSelect", actionSelected:null })),

    entitySelectPhase: (entitySelected) => set(()=>({ activePhase: "executeAction", entitySelected })),
    clearEntitySelected: () => set(()=>({ activePhase: "entitySelect", entitySelected:null })),

    executeActionPhase: () => set((state) => {
        if(!state?.initiativeOrder?.[0]) return state;
        if(!state.actionSelected) return state;
        if(!state.entitySelected) return state;
        const { action, type } = getActionAndType(state.actionSelected);
        const skill = action?.skill && SKILLS[action.skill];
        let turnTakerEntity = structuredClone(state.entities[state.initiativeOrder[0]]) as CombatEntity;
        let targetEntity = structuredClone(state.entities[state.entitySelected]) as CombatEntity;

        const actionValue = !skill ? 0 : calculateSkill({ 
            totalLevel: getTotalLevel(turnTakerEntity.abilities), 
            abilityLevel: turnTakerEntity.abilities[skill.abilityKey],
            base: action?.base || skill.base,
            perTotalLevel: action?.perAbilityLevel || skill.perTotalLevel,
            perAbilityLevel: action?.perAbilityLevel || skill.perAbilityLevel,
            max: action?.max || skill.max,
            calculationType: action?.calculationType || skill.calculationType,
            // multiplierPercent: Handle Equipment or Talent or other additional multiplierPercents,
        });

        if(action?.targetMath === "add") targetEntity.hp += actionValue;
        if(action?.targetMath === "subtract") targetEntity.hp -= actionValue;

        
        // TODO: any "thorns" effects?

        if(targetEntity.hp > targetEntity.skills.maxHealth) targetEntity.hp = targetEntity.skills.maxHealth;
        if(targetEntity.hp <= 0){
            targetEntity.hp = 0;
            if(targetEntity.relation === "enemy") targetEntity.isDead = true;
            if(targetEntity.relation === "friendly") targetEntity.isUnconscious = true;
        }

        return {
            activePhase: "nerfEffects",
            entities: { 
                ...state.entities, 
                [state.initiativeOrder[0]]: turnTakerEntity,
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

        // Apply changes
        return { 
            activePhase: "handleConditions",
            entities: { ...state.entities, [entityKey]: { ...entity } } 
        }
    }),

    handleConditionsPhase: () => set((state) => {
        let entities = structuredClone(state.entities);

        // TODO: Handle conditions

        return { activePhase: "nextTurn", entities }
    }),

    nextTurn: () => set((state) => {
        const initiativeOrder = handleNextTurn(state.initiativeOrder, state.entities);
        return {  activePhase: "buffEffects", initiativeOrder }
    }),
}))