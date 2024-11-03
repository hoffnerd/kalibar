"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@/typeDefs";
import { type StoryNarrativeKey } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
// rQuery ---------------------------------------------------------------------------
import { getQueryClient } from "@/rQuery/getQueryClient";
import { updateSaveDataAddNarrative } from "@/server/saveFile";
import { useGameStore } from "@/stores/useGameStore";
// Context --------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====
export default function NarrativeClient({ saveFile }: Readonly<{ saveFile: SaveFile }>){

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
    const { mutateAsync: updateSaveDataAddNarrativeMutation } = useMutation({
        mutationFn: updateSaveDataAddNarrative,
        onSuccess: ({ error, message, data:updatedSaveFile }) => {
            queryClient.invalidateQueries({ queryKey: ['readSaveFiles'] })
            if(updatedSaveFile?.updatedAt) setStoreKeyValuePair("lastSavedTime", updatedSaveFile.updatedAt);
        },
        // onError: (error) => setErrorMessage(error?.message || "Something went wrong trying to create a save file!")
    })



    //______________________________________________________________________________________
    // ===== Use Effects =====

    useEffect(() => {
        if(!saveFile) return;
        if(saveFile.saveData.narrative.length > 0) return;
        addNarrative("beta_1");
    }, [saveFile])
    


    //______________________________________________________________________________________
    // ===== On Click Functions =====

    const addNarrative = async (narrativeKey: StoryNarrativeKey) => {
        if(isSaving.current) return;
        if(isGameSaving) return;

        isSaving.current = true;
        setStoreKeyValuePair("isGameSaving", true);

        await updateSaveDataAddNarrativeMutation({ id: saveFile.id, inGameTime, narrativeKey });
        isSaving.current = false;
        setStoreKeyValuePair("isGameSaving", false);
    }



    //______________________________________________________________________________________
    // ===== Component Return =====

    return <></>;
}