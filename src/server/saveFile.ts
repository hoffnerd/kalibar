"use server"

// Types ----------------------------------------------------------------------------
import { type SaveFileType } from "@prisma/client";
import { type SaveData, type SaveFile } from "@/typeDefs";
import { type ServerActionReturn } from "./actions";
import { DEFAULT_STORY_NARRATIVE, type Narrative, type NarrativeKey } from "@/data/narrative";
// Server ---------------------------------------------------------------------------
import { db } from "./db";
import { serverAction } from "./actions";
// Data -----------------------------------------------------------------------------
import { DEFAULT_SAVE_DATA, PROJECT_LOWEST_ROLE_FOR_PLAY } from "@/data/_config";
import { STORY_NARRATIVE } from "@/data/narrative";
// Other ----------------------------------------------------------------------------
import { handleError } from "@/utils/js-utils";



//______________________________________________________________________________________
// ===== Types & Interface =====


interface SaveFilesReturn extends Omit<ServerActionReturn, 'data'> {
    data?: Array<SaveFile>
}

export interface SaveFileReturn extends Omit<ServerActionReturn, 'data'> {
    data?: SaveFile
}



//______________________________________________________________________________________
// ===== Assist Functions =====

const findUniqueSaveFile = async ({ id, userId }: Readonly<{ id:SaveFile["id"]; userId?:SaveFile["userId"]; }>) => (
    await db.saveFile.findUnique({ where: { id, userId } })
)



//______________________________________________________________________________________
// ===== Reads =====

export const readSaveFiles = (): Promise<SaveFilesReturn> => serverAction(async ({session}) => {
    return await db.saveFile.findMany({ 
        where: { userId: session?.user.id }, 
        orderBy: [ { updatedAt:"desc" } ] 
    });
}, { trace:"readSaveFiles", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })

export const readSaveFile = (id: SaveFile["id"]): Promise<SaveFileReturn> => serverAction(async ({session}) => {
    return await findUniqueSaveFile({ id, userId: session?.user.id  });
}, { trace:"readSaveFile", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })



//______________________________________________________________________________________
// ===== Creates =====

export const createSaveFile = ({
    saveFileType,
}: Readonly<{ 
    saveFileType: SaveFileType 
}>) => serverAction(async ({session}) => {
    return await db.saveFile.create({
        data: { 
            userId: session?.user.id as string,
            type: saveFileType,
            saveData: DEFAULT_SAVE_DATA as any,
        }
    })
}, { trace:"createSaveFile", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })



//______________________________________________________________________________________
// ===== Updates =====

export const updateSaveDataReset = ({
    id,
    inGameTime,
}: Readonly<{ 
    id: SaveFile["id"];
    inGameTime: SaveFile["inGameTime"];
}>): Promise<SaveFileReturn> => serverAction(async ({session}) => {
    const saveFile = await findUniqueSaveFile({ id, userId: session?.user.id  })
    if(!saveFile) throw new Error("Can't find save file!");

    return await db.saveFile.update({
        where: { id },
        data: { 
            saveData: DEFAULT_SAVE_DATA as any,
            inGameTime: inGameTime > saveFile.inGameTime ? inGameTime : saveFile.inGameTime,
            updatedAt: new Date()
        }
    })
}, { trace:"updateSaveDataReset", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })

export const updateSaveDataAddNarrative = ({
    id,
    inGameTime,
    narrativeKey,
}: Readonly<{ 
    id: SaveFile["id"];
    inGameTime: SaveFile["inGameTime"];
    narrativeKey: NarrativeKey;
}>): Promise<SaveFileReturn> => serverAction(async ({session}) => {
    const saveFile = await findUniqueSaveFile({ id, userId: session?.user.id  })
    if(!saveFile) throw new Error("Can't find save file!");

    let saveData: SaveData = structuredClone(saveFile.saveData) as any;
    if(saveData.narrative.includes(narrativeKey)) throw new Error("You already made this choice!");

    const lastSavedNarrativeKey = saveData.narrative.length > 0 && saveData.narrative[ saveData.narrative.length-1 ];
    const lastSavedNarrativeObj: Narrative = lastSavedNarrativeKey 
        ? STORY_NARRATIVE[lastSavedNarrativeKey] 
        : DEFAULT_STORY_NARRATIVE
    
    let isPossibleKey = false;
    if(lastSavedNarrativeObj.nextNarrative && lastSavedNarrativeObj.nextNarrative === narrativeKey) isPossibleKey = true;
    if(lastSavedNarrativeObj.choices){
        const matchedChoice = lastSavedNarrativeObj.choices.find(choice => choice.key === narrativeKey);
        if(matchedChoice?.key) isPossibleKey = true;
    }
    if(!isPossibleKey) throw new Error("You are not allowed to make this choice!");

    saveData.narrative.push(narrativeKey);
    
    return await db.saveFile.update({
        where: { id },
        data: { 
            saveData: saveData as any,
            inGameTime: inGameTime > saveFile.inGameTime ? inGameTime : saveFile.inGameTime,
            updatedAt: new Date()
        }
    })
}, { trace:"updateSaveDataAddNarrative", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })