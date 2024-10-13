

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client";
// Packages -------------------------------------------------------------------------
import { queryOptions } from "@tanstack/react-query";
// Server ---------------------------------------------------------------------------
import { readSaveFiles, readSaveFile } from "@/server/saveFile";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Query Options =====

export const queryOptionsReadSaveFiles = () => queryOptions({
    queryKey: [ "readSaveFiles" ],
    queryFn: () => readSaveFiles(),
})

export const queryOptionsReadSaveFile = (id: SaveFile["id"]) => queryOptions({
    queryKey: [ `readSaveFiles`, { id } ],
    queryFn: () => readSaveFile(id),
})