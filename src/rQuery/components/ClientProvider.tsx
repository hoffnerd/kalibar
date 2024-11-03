"use client"

// Packages -------------------------------------------------------------------------
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "../getQueryClient";
// Other -------------------------------------------------------------------------




//______________________________________________________________________________________
// ===== Component =====

export default function ClientProvider({ children }: Readonly<{ children?: React.ReactNode }>) {

    const queryClient = getQueryClient();

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </SessionProvider>
    )
}