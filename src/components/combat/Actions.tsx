

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../shadcn/ui/button";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------






//______________________________________________________________________________________
// ===== Component =====

export default function Actions(){

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full grid grid-cols-4">
            <Button size="none" variant="neonEffect" className="neColorRed">Actions</Button>
            <Button size="none" variant="neonEffect" className="neColorBlue">Talents</Button>
            <Button size="none" variant="neonEffect" className="neColorGreen">Items</Button>
            <Button size="none" variant="neonEffect" className="neColorOrange">Adrenaline</Button>
        </div>
    )
}

