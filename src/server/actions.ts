import "server-only";

// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type Role } from "@prisma/client";
// Server ----------------------------------------------------------------------------
import { actionProtection } from "./protector";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { handleError } from "@/utils/js-utils";



//______________________________________________________________________________________
// ===== Interfaces =====

interface Options {
    trace?: string;
    requiredRole?: Role | false;
}

export interface ServerActionReturn {
    error: boolean;
    message?: string;
    data: any;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: Options = {
    trace: "serverAction",
    requiredRole: "ADMIN",
}



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Handles server-side actions with optional role-based protection and error handling.
 * Examples of how to best use this function are provided in this file below this function's declaration.
 * - NOTE: Do not not use this if your server action needs to do a redirect. Redirects count as a 301 error
 * code, which will be caught within the try/catch block and will return an error to you.
 * @param callback - async function, will be executed within the try/catch block of this function. 
 * Takes an object as an argument, which includes a `session` object and the `options` object that were used. 
 * @param options - optional object that changes the behavior of this function. 
 * Can contain the following properties:
 * @param options.trace - optional string, default is "serverAction". Can be anything that helps
 * the dev know where the server action was called. Recommend to just be the function name of the server 
 * action the dev is creating. 
 * @param options.requiredRole - optional user role, string, or `false`, default is "ADMIN". Should
 * be the user role that is required to run this server action. Set to `false` to allow anyone.
 */
export const serverAction = async (
    callback: ( props: { 
        session?: Session | null; 
        options: Options; 
    }) => Promise<any>, 
    options: Options={}
): Promise<ServerActionReturn> => {

    // get any options, defaulted or passed in
    const optionsToUse = { ...DEFAULT_OPTIONS, ...options }
    const { trace, requiredRole } = optionsToUse;
    let session, error = null;

    // check auth, if `requiredRole` is set to a falsy value, will NOT error out
    if(requiredRole){
        const protection = await actionProtection({ requiredRole });
        session = protection.session;
        error = protection.error;
        if(error) return handleError({ trace, message:protection.message, session });
    }
    
    try {
        // try to run the given `callback` function, gracefully fails if any errors are thrown
        const data = await callback({ session, options: optionsToUse });

        // send back the data in a normalized way
        return { error: false, message: "Success!", data };
    } catch (e: any) {
        return handleError({ trace, message: e?.message || "Unknown Error!", session });
    }
}