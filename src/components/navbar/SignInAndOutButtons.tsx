"use client";

// Packages -------------------------------------------------------------------------
import { signIn, signOut } from "next-auth/react";
// Other -------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component: Sign Out =====

/**
 * @param props
 * @param props.className - Class name for styling the button
 * @param props.children - Children of the component
 */
export function SignOutButton({ className, children }: { className: string; children: React.ReactNode; }) {
    return (
        <button className={className} onClick={() => signOut()}>
            {children}
        </button>
    );
}



//______________________________________________________________________________________
// ===== Component: Sign In =====

/**
 * @param props
 * @param props.className - Class name for styling the button
 * @param props.children - Children of the component
 */
export function SignInButton({ className, children }: { className: string; children: React.ReactNode; }) {
    return (
        <button className={className} onClick={() => signIn()}>
            {children}
        </button>
    );
}
