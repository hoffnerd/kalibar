

// Types ----------------------------------------------------------------------------
import { type Metadata } from "next";
// Packages -------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
import "@/styles/globals.css";
// Fonts ----------------------------------------------------------------------------
import { GeistSans } from "geist/font/sans";
// Data -----------------------------------------------------------------------------
import { PROJECT_DISPLAY_NAME, PROJECT_DESCRIPTION, NAVIGATION_MAIN, NAVIGATION_AUTH } from "@/data/_config";
// Components -----------------------------------------------------------------------
import Navbar from "@/components/navbar/Navbar";
import ClientProvider from "@/rQuery/components/ClientProvider";
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
            <body className="bg-gradient-to-b from-[#121212] to-[#15162c] h-full">
                <ClientProvider>
                    {children}
                </ClientProvider>
            </body>
        </html>
    );
}

