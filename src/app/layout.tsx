

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
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <Navbar navItems={NAVIGATION_MAIN} authNavItems={NAVIGATION_AUTH}/>
                {children}
            </body>
        </html>
    );
}

