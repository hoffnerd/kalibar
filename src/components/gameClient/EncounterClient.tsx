"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile, type SaveData, type CombatEntity } from "@/typeDefs";
import { type FriendlyCharacterSaveData } from "@/stores/useCombatStore";
// Packages -------------------------------------------------------------------------
import { useEffect } from "react";
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
import { ENCOUNTERS } from "@/data/combat/encounters";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Pure Functions =====

const getPartyCharacterSaveData = ( saveData: SaveData ) => {
    if(!saveData.party) return {} as FriendlyCharacterSaveData;
    const friendlies: FriendlyCharacterSaveData = {};
    saveData.party.forEach(characterKey => friendlies[characterKey] = saveData.crew[characterKey]);
    return friendlies;
}


//______________________________________________________________________________________
// ===== Component =====
export default function EncounterClient({ saveFile, encounterKey }: Readonly<{ saveFile: SaveFile, encounterKey: string }>){

    //______________________________________________________________________________________
    // ===== Constants =====
    const encounter = ENCOUNTERS[encounterKey as keyof typeof ENCOUNTERS];
    const friendlies = getPartyCharacterSaveData(saveFile.saveData);



    //______________________________________________________________________________________
    // ===== Store State =====
    const activePhase = useCombatStore(state => state.activePhase);
    const entities = useCombatStore(state => state.entities);
    const initiativeOrder = useCombatStore(state => state.initiativeOrder);
    const startingEntityKey = useCombatStore(state => state.startingEntityKey);



    //______________________________________________________________________________________
    // ===== Store Functions =====
    const initializeCombat = useCombatStore(state => state.initializeCombat);
    const buffEffectsPhase = useCombatStore(state => state.buffEffectsPhase);
    const executeActionPhase = useCombatStore(state => state.executeActionPhase);
    const nerfEffectsPhase = useCombatStore(state => state.nerfEffectsPhase);
    const handleConditionsPhase = useCombatStore(state => state.handleConditionsPhase);
    const nextTurn = useCombatStore(state => state.nextTurn);
    const incrementRoundCount = useCombatStore(state => state.incrementRoundCount);
    const incrementTurnCount = useCombatStore(state => state.incrementTurnCount);




    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        switch(activePhase){
            case "buffEffects":
                buffEffectsPhase();
                break;
            case "executeAction":
                executeActionPhase();
                break;
            case "nerfEffects":
                nerfEffectsPhase();
                break;
            case "handleConditions":
                handleConditionsPhase();
                break;
            case "nextTurn":
                nextTurn();
                break;
        }
    }, [activePhase])

    useEffect(() => {
        if(Object.keys(entities).length > 0) return;
        initializeCombat(friendlies, encounter);
    }, [entities])

    useEffect(() => {
        if(!startingEntityKey) return;
        if(initiativeOrder[0] === startingEntityKey) incrementRoundCount();
        const turnTakerEntityKey = initiativeOrder[0];
        const turnTakerEntity = turnTakerEntityKey && entities[turnTakerEntityKey] as CombatEntity;
        if(!(turnTakerEntity && (turnTakerEntity?.isDead || turnTakerEntity?.isUnconscious || turnTakerEntity?.isHidden))){
            incrementTurnCount();
        }
    }, [startingEntityKey, initiativeOrder])



    //______________________________________________________________________________________
    // ===== Component Return =====

    return <div/>;
}