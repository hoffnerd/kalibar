// Types ----------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
import { NAVIGATION_AUTH, NAVIGATION_MAIN } from "@/data/_config";
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import Navbar from "./Navbar";
import MobileNavbar from "./mobile/MobileNavbar";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====

export async function NavbarKit(){
    return <Navbar navItems={NAVIGATION_MAIN} authNavItems={NAVIGATION_AUTH}/>
}

export async function NavSheet() {
    return (
        <div className="absolute top-0 right-0">
            <MobileNavbar navItems={NAVIGATION_MAIN} authNavItems={NAVIGATION_AUTH}/>
        </div>
        
    )
}