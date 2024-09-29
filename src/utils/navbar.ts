// Types ----------------------------------------------------------------------------
import { type Session } from "next-auth";
// Packages -------------------------------------------------------------------------
// Actions --------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Takes a `Session` object and returns the initials of the user's name, screen name, or email, or a default initial if no user information is available.
 * @param session - object, expected to have a `user` property which may contain `name`, `screenName`, or `email` properties.
 */
export const getInitials = (session: Session) => {
    const defaultInitial = "A";
    if (!(session && session.user)) return defaultInitial;

	if(session.user.name){
		// Split the first and last name into separate strings
		const [firstName, lastName] = session.user.name.split(" ");

        if (!firstName) return defaultInitial;

		// If there is no last name, just return the first initial
		if (!lastName) return firstName.charAt(0);

		// Return the first initial concatenated with the last initial
		return firstName.charAt(0).concat(lastName.charAt(0));
	}

    if(session.user.screenName){
        return session.user.screenName.charAt(0);
    }

    if(session.user.email){
        return session.user.email.charAt(0);
    }

    return defaultInitial;
};