
// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Data -----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { NavbarKit } from "@/components/navbar/NavbarKit";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Page() {

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        <NavbarKit/>
        <main className="flex h-[90%] flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Project <span className="neonEffect neText neTextGlow neColorYellow">Kalibar</span>
                </h1>
                <h2 className="text-center text-2xl sm:text-4xl ">
                    A game developed by the <span className="neonEffect neText neTextGlow neColorBlue">NextGenScripts</span> team.
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
                    <Link
                        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4  hover:bg-white/20 focus:bg-white/20 border-2 neonEffect neBorder neBorderGlow neColorRed"
                        href="/play"
                    >
                        <h3 className="text-2xl font-bold neonEffect neText neTextGlow">Play →</h3>
                        <div className="text-lg">
                            If you are logged in to a tester account, takes you to your save files. Otherwise, asks you to login.
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    </>
}

