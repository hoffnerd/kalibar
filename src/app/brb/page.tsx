
// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Server ---------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page() {

    //______________________________________________________________________________________
    // ===== Session =====
    await pageProtection({ requiredRole:"ADMIN", redirectUnauthorized:"/" });

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <main className="flex h-[90%] flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                <h1 className="text-center text-8xl font-extrabold tracking-tight sm:text-[5rem]">
                    <span className="neonEffect neText neTextGlow neColorBlue">Be</span>
                    {` `}
                    <span className="neonEffect neText neTextGlow neColorPurple">Right</span>
                    {` `}
                    <span className="neonEffect neText neTextGlow neColorBlue">Back</span>
                </h1>
            </div>
        </main>
    );
}

