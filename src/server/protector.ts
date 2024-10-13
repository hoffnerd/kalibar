import "server-only";

// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type Role } from "@prisma/client";
// Packages -------------------------------------------------------------------------
import { redirect } from "next/navigation";
// Lib ------------------------------------------------------------------------------
import { getServerAuthSession } from "./auth";
// Data -----------------------------------------------------------------------------
import { ROUTE_HOME, ROUTE_LOGIN } from "@/data/_config";
// Other ----------------------------------------------------------------------------
import { checkRoleAccessLevel } from "@/utils";



//______________________________________________________________________________________
// ===== Interfaces =====

/**
 * The options that are allowed for any of the protectors
 * - `requiredRole`
 * - `redirectNotLoggedIn`
 * - `redirectUnauthorized`
 */
interface Options {
    /** The required role for a user to access whatever these protectors are protecting. */
    requiredRole?: Role;

    /** The redirect location if a user is not signed in. */
    redirectNotLoggedIn?: string;

    /** The redirect location if a user goes to a page the are not authorized to access. */
    redirectUnauthorized?: string;

    
    exactMatch?: boolean;
    inverse?: boolean;
}



//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS: Options = {
    requiredRole: "ADMIN",
    redirectNotLoggedIn: ROUTE_LOGIN,
    redirectUnauthorized: ROUTE_HOME,
};



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Ensures access control based on user roles and authentication status.
 * @param options - optional object that controls how this function should behave.
 */
export const pageProtection = async (options: Options = {}): Promise<Session> => {
    const { requiredRole, redirectNotLoggedIn, redirectUnauthorized } = { ...DEFAULT_OPTIONS, ...options };
    const session = await getServerAuthSession();
    if (!session) return redirect(redirectNotLoggedIn ?? ROUTE_HOME);
    if (!checkRoleAccessLevel(requiredRole || "ADMIN", session, options)) return redirect(redirectUnauthorized ?? ROUTE_HOME);
    return session;
};

/**
 * Checks if a user is authorized based on their role and returns a message accordingly.
 * @param options - optional object that controls how this function should behave.
 */
export const actionProtection = async (
    options: Options = {},
): Promise<{
    authorized: boolean;
    error: boolean;
    message: string;
    session?: Session | null;
}> => {
    const { requiredRole } = { ...DEFAULT_OPTIONS, ...options };
    const session = await getServerAuthSession();
    if (!session) return { authorized: false, error: true, message: "Forbidden!", session };
    if (!checkRoleAccessLevel(requiredRole || "ADMIN", session, options)) {
        return { authorized: false, error: true, message: "Unauthorized!" };
    }
    return { authorized: true, error: false, message: "Success!", session };
};