
// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
import { type Role } from "@prisma/client";
// Packages -------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { PROJECT_ROLE_MAPPER } from "@/data/_config";
// Other ----------------------------------------------------------------------------


//______________________________________________________________________________________
// ===== Common Functions =====

/**
 * Determines if a user has the required access level based on their role and session information.
 * @param requiredRole - the role that a user must have in order to access a certain feature or perform
 * a specific action. It is used to determine if a user has the  necessary permissions based on their role.
 * @param session - Session object containing user information, including their role. It is
 * optional as it may not be available in all contexts.
 */
export const checkRoleAccessLevel = (requiredRole: Role | string, session?: Session | null): boolean => {
    const userRole = session && session.user && session.user.role ? session.user.role : "UNAUTHORIZED";
    const userAccessLevel = PROJECT_ROLE_MAPPER.indexOf(userRole);
    const requiredAccessLevel = PROJECT_ROLE_MAPPER.indexOf(requiredRole);
    return userAccessLevel >= requiredAccessLevel;
}