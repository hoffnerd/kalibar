"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile, type SaveData } from "@/typeDefs";
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
    const entities = useCombatStore(state => state.entities);



    //______________________________________________________________________________________
    // ===== Store Functions =====
    const initializeCombat = useCombatStore(state => state.initializeCombat);



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(Object.keys(entities).length > 0) return;
        initializeCombat(friendlies, encounter);
    }, [entities])
    


    //______________________________________________________________________________________
    // ===== Component Return =====

    return <div/>;
}