
// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Server ---------------------------------------------------------------------------
import { pageProtection } from "@/server/protector";
// Data -----------------------------------------------------------------------------
import { PROJECT_LOWEST_ROLE_FOR_PLAY } from "@/data/_config";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page() {

    //______________________________________________________________________________________
    // ===== Protector =====
    await pageProtection({ requiredRole:PROJECT_LOWEST_ROLE_FOR_PLAY, redirectUnauthorized:"/play", inverse:true });


    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center text-center px-4 py-16">
                <h2 className="text-2xl sm:text-4xl ">You have joined the wait list!</h2>
                <p className="py-5">You will be emailed when the game is ready to play!</p>
                <p className="py-5"><Link href="/about" className="neonEffect neText neTextGlow neColorBlue">Click Here to learn more about the game</Link></p>
                <p className="py-5"><Link href="/about/how" className="neonEffect neText neTextGlow neColorBlue">Click Here to learn how to play</Link></p>
                <p className="text-center py-5">
                    Still have questions? Reach out! I am
                    {` `}
                    <a className="neonEffect neText neTextGlow neColorBlue" href="https://nextgenscripts.vercel.app" target="_blank">@NextGenScripts</a>
                    {` `}
                    on all major social platforms.
                </p>
            </div>
        </main>
    );
}

