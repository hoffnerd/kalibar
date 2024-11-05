

// Types ----------------------------------------------------------------------------
import { type Metadata } from "next";
// Packages -------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import "@/styles/globals.css";
// Fonts ----------------------------------------------------------------------------
import { GeistSans } from "geist/font/sans";
// Data -----------------------------------------------------------------------------
import { PROJECT_DISPLAY_NAME, PROJECT_DESCRIPTION, PROJECT_BACKGROUND } from "@/data/_config";
// Components -----------------------------------------------------------------------
import ClientProvider from "@/rQuery/components/ClientProvider";
import { Debugger } from "@/components/debug/Debugger";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Meta Data =====

export const metadata: Metadata = {
    title: PROJECT_DISPLAY_NAME,
    description: PROJECT_DESCRIPTION,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};



//______________________________________________________________________________________
// ===== Component =====

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} neonEffect neScrollBar neColorPurple h-full`}>
            <body className={`${PROJECT_BACKGROUND} min h-full`}>
                <ClientProvider>
                    <Debugger/>
                    {children}
                </ClientProvider>
            </body>
        </html>
    );
}

