"use client";

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
import { type NarrativeKey } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useRef } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// rQuery ---------------------------------------------------------------------------
import { getQueryClient } from "@/rQuery/getQueryClient";
// Actions --------------------------------------------------------------------------
import { updateSaveDataAddNarrative, updateSaveDataReset } from "@/server/saveFile";
// Stores ---------------------------------------------------------------------------
import { useGameStore } from "@/stores/useGameStore";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Interfaces =====

interface Options {
    trace?: string;
    narrativeKey?: NarrativeKey;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: Options = {
    trace: "saveGameBase",
    narrativeKey: undefined,
}



//______________________________________________________________________________________
// ===== Hooks =====

export default function useSaveGame(){

    //______________________________________________________________________________________
    // ===== Params =====
    const { id } = useParams();



    //______________________________________________________________________________________
    // ===== Use Refs =====
    const isSaving = useRef<boolean | any>(false);



    //______________________________________________________________________________________
    // ===== Stores =====
    const isGameSaving = useGameStore((state) => state.isGameSaving);
    const inGameTime = useGameStore((state) => state.inGameTime);
    const setStoreKeyValuePair = useGameStore((state) => state.setStoreKeyValuePair);



    //______________________________________________________________________________________
    // ===== Query =====

    const queryClient = getQueryClient();

    const { mutateAsync: updateSaveDataResetMutation } = useMutation({
        mutationFn: updateSaveDataReset,
        onSuccess: ({ error, message, data:updatedSaveFile }) => {
            queryClient.invalidateQueries({ queryKey: ['readSaveFiles'] })
            if(updatedSaveFile?.updatedAt) setStoreKeyValuePair("lastSavedTime", updatedSaveFile.updatedAt);
        },
        // onError: (error) => setErrorMessage(error?.message || "Something went wrong trying to create a save file!")
    })

    const { mutateAsync: updateSaveDataAddNarrativeMutation } = useMutation({
        mutationFn: updateSaveDataAddNarrative,
        onSuccess: ({ error, message, data:updatedSaveFile }) => {
            queryClient.invalidateQueries({ queryKey: ['readSaveFiles'] })
            if(updatedSaveFile?.updatedAt) setStoreKeyValuePair("lastSavedTime", updatedSaveFile.updatedAt);
        },
        // onError: (error) => setErrorMessage(error?.message || "Something went wrong trying to create a save file!")
    })



    //______________________________________________________________________________________
    // ===== Assist Functions =====

    const saveGameBase = async (
        callback: ( options: Readonly<Options> ) => Promise<any>, 
        options: Options={}
    ) => {
        const optionsToUse = { ...DEFAULT_OPTIONS, ...options };
        const { trace, narrativeKey } = optionsToUse;

        if(isSaving.current) return;
        if(isGameSaving) return;

        isSaving.current = true;
        setStoreKeyValuePair("isGameSaving", true);

        await callback({ ...optionsToUse });
        
        isSaving.current = false;
        setStoreKeyValuePair("isGameSaving", false);
    }


    //______________________________________________________________________________________
    // ===== Functions that are returned =====

    const resetGame = () => saveGameBase(async () => {
        return await updateSaveDataResetMutation({ id: id as SaveFile["id"], inGameTime });
    }, { trace: "resetGame" });

    const addNarrative = (narrativeKey?: NarrativeKey) => saveGameBase(async ({ narrativeKey }) => {
        if(!narrativeKey) return;
        return await updateSaveDataAddNarrativeMutation({ id: id as SaveFile["id"], inGameTime, narrativeKey });
    }, { trace: "addNarrative", narrativeKey });
    


    //______________________________________________________________________________________
    // ===== Hook Return =====
    return {
        resetGame,
        addNarrative,
    };
}

