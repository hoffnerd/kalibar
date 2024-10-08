import { PrismaAdapter } from "@auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
// import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
import { Role } from "@prisma/client";



//______________________________________________________________________________________
// ===== Types =====

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            role: Role;
            screenName?: string
        } & DefaultSession["user"];
    }

    interface User {
        role: Role;
        screenName?: string
    }
}



//______________________________________________________________________________________
// ===== Functions =====

/**
 * Extracts the screen name from an email address.
 * @param email - the email address so I
 */
const getScreenNameFromEmail = (email: string): string => {
    const reg = /(.+)@/;
    const extracted = reg.exec(email);
    if (extracted !== null && extracted[1]) return extracted[1];
    return email;
}




//______________________________________________________________________________________
// ===== Auth Options =====

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                role: user.role,
                screenName: user?.screenName || getScreenNameFromEmail(user.email)
            },
        }),
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        // DiscordProvider({
        //     clientId: env.DISCORD_CLIENT_ID,
        //     clientSecret: env.DISCORD_CLIENT_SECRET,
        // }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

