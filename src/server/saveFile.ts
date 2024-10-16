"use server"

// Types ----------------------------------------------------------------------------
import { type SaveFile } from "@prisma/client";
import { type SaveFileType } from "@prisma/client";
// Server ---------------------------------------------------------------------------
import { db } from "./db";
import { actionProtection } from "./protector"
import { serverAction } from "./actions";
// Data -----------------------------------------------------------------------------
import { PROJECT_LOWEST_ROLE_FOR_PLAY } from "@/data/_config";
// Other ----------------------------------------------------------------------------
import { sleep } from "@/utils";
import { handleError } from "@/utils/js-utils";




//______________________________________________________________________________________
// ===== Reads =====

export const readSaveFiles = () => serverAction(async ({session}) => {
    return await db.saveFile.findMany({ 
        where: { userId: session?.user.id }, 
        orderBy: [ { updatedAt:"desc" } ] 
    });
}, { trace:"readSaveFiles", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })

export const readSaveFile = (id: SaveFile["id"]) => serverAction(async ({session}) => {
    await sleep(5)
    return await db.saveFile.findUnique({ where: { id, userId: session?.user.id } });
}, { trace:"readSaveFile", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })



//______________________________________________________________________________________
// ===== Creates =====

export const createSaveFile = ({ saveFileType }: { saveFileType: SaveFileType; }) => serverAction(async ({session}) => {
    return await db.saveFile.create({
        data: { 
            userId: (session?.user.id) as string,
            type: saveFileType,
        }
    })
}, { trace:"createSaveFile", requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY })



//______________________________________________________________________________________
// ===== Updates =====

export const updateSaveFile = async () => {
    const trace = "updateSaveFile";
    const { authorized, session } = await actionProtection({ requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY });
    if(!session) return handleError({ trace, message:"e_unauthorized" });
    if(!authorized) return handleError({ trace, message:"e_forbidden", session });

    try {
        // return db.saveFile.create({
        //     data: { 
        //         userId: session.user.id,
        //         type: saveFileType,
        //     }
        // })
        return true
    } catch (error: any) {
        return handleError({ trace:"createSaveFile", message:error?.message, session });
    }
}