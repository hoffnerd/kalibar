// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type Role } from "@prisma/client";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { PROJECT_ERRORS, PROJECT_ROLE_MAPPER } from "@/data/_config";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Interfaces =====


//______________________________________________________________________________________
// ===== True Constants =====

const DEFAULT_OPTIONS_checkRoleAccessLevel = {
    exactMatch: false,
    inverse: false,
}



//______________________________________________________________________________________
// ===== Common Functions =====

/**
 * Takes a number of milliseconds as input and returns a promise that resolves after the specified time has elapsed.
 * @param milliseconds - int, represents the number of milliseconds for which the function will pause execution before resolving the promise.
 */
export const sleep = (milliseconds: number) => new Promise((r) => setTimeout(r, (milliseconds)));

/**
 * Checks if a given value is an array and has a length greater than a specified value.
 * @param array - variable that you want to check if it is an array.
 * @param lengthToCheckFor - optional int, default is `0`. Specifies the minimum length that the array should have.
 * @param exactLength - optional boolean, default is `false`. Determines whether the length of the 
 * array should be exactly equal to the specified `lengthToCheckFor` value.
 */
export const isArray = (
    array: any, 
    lengthToCheckFor: number = 0, 
    exactLength: boolean = false
): array is any[] => {
    if(!(array && Array.isArray(array))) return false;
    if (exactLength) return array.length === lengthToCheckFor;
    return array.length > lengthToCheckFor;
}

/**
 * Determines if a user has the required access level based on their role and session information.
 * @param requiredRole - the role that a user must have in order to access a certain feature or perform
 * a specific action. It is used to determine if a user has the  necessary permissions based on their role.
 * @param session - Session object containing user information, including their role. It is
 * optional as it may not be available in all contexts.
 * @param options - optional object that allows you change the behavior of the function. Options are:
 * @param options.exactMatch - optional bool, default is `false`. Set to `true` to make sure the user role
 * is an exact match on the given `requiredRole`.
 * @param options.inverse - optional bool, default is `false`. Set to `true` to make sure the user role is
 * BELOW the given `requiredRole`.
 */
export const checkRoleAccessLevel = (
    requiredRole: Role,
    session?: Session | null,
    options?: {
        exactMatch?: boolean;
        inverse?: boolean;
    },
): boolean => {
    const { exactMatch, inverse } = options ? { ...DEFAULT_OPTIONS_checkRoleAccessLevel, ...options } : { ...DEFAULT_OPTIONS_checkRoleAccessLevel}
    const userRole = session && session.user && session.user.role ? session.user.role : "UNAUTHORIZED";

    if(exactMatch) return userRole === requiredRole;

    const userAccessLevel = PROJECT_ROLE_MAPPER.indexOf(userRole);
    const requiredAccessLevel = PROJECT_ROLE_MAPPER.indexOf(requiredRole);

    if(inverse) return userAccessLevel < requiredAccessLevel;
    return userAccessLevel >= requiredAccessLevel;
};
