// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import Link from "next/link";
// Server ---------------------------------------------------------------------------
import { pageProtector } from "@/server/protector"
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/advanced.module.css";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default async function Page(){

    //______________________________________________________________________________________
    // ===== Session =====
    const session = await pageProtector({ requiredRole:"TESTER", redirectUnauthorized:"/waiting" });

    

    //______________________________________________________________________________________
    // ===== Component Return =====
    return(
        <main className="container m-auto">
            
            <h2 className="text-5xl font-black pt-10">My Save Files</h2>
            <div className="w-full border-2 neonEffect neBorder neBorderGlow neColorBlue"/>
            <div className="py-10">
                <button className={`${styles.saveFileButton} w-full`}>
                    <div className="w-full min-h-52 border-4 rounded-3xl transition-all neonEffect neBorder neBorderGlow neColorPurple">
                        <div className="neonEffect neText neTextGlow neColorBlue">
                            <div className="text-center text-[8.7rem]">+</div>
                        </div>
                    </div>
                </button>
                {/* <Dialog>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] neonBorder neonText neonTextGlow neonBoxShadowGlow purple">
                        <DialogHeader>
                            <DialogTitle>New Save File</DialogTitle>
                            <DialogDescription>What is your name?</DialogDescription>
                        </DialogHeader>
                        <NameForm />
                    </DialogContent>    
                </Dialog> */}
            </div>
        </main>
    )
}