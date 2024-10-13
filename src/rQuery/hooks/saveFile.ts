"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client";
// Packages -------------------------------------------------------------------------
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Server ---------------------------------------------------------------------------
import { createSaveFile, updateSaveFile, } from "@/server/saveFile";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Creates =====

const useCreateSaveFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSaveFile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['readSaveFiles'] }),
    })
}



//______________________________________________________________________________________
// ===== Updates =====

const useUpdateSaveFile = (id: SaveFile["id"]) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSaveFile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ `readSaveFile`, { id } ] }),
    })
}


//https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations