// @ts-nocheck

// Types ----------------------------------------------------------------------------
import { Session } from "next-auth";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { PROJECT_ERRORS } from "@/data/_config";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Common Functions =====

/**
    error: boolean;
    message?: string;
    data: any;
 * Logs an error message and returns an object indicating an error along with optional message, session, and data.
 * @param {object} params
 * @param {string} [params.trace] - string, where this function was called
 * @param {string} [params.message] - optional string, the message or error type that has occurred.
 * @param {Session | null} [params.session] - optional session / user data.
 * @param {any} [params.data] - optional object, any additional data to send back.
 * @returns {{ error: boolean; message?: string; data: any; }}
 */
export const handleError = ({ trace, message, session, data }) => {
    console.error({ trace, rawMessage: message, messageProjectErrors: message && PROJECT_ERRORS?.[message], session, data });
    return { error: true, message: (message && PROJECT_ERRORS?.[message]) || message, data }
};