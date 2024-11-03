

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
// ===== True Constants =====

const BUTTON_CLASSES = "neonEffect neBorder neColorPurple hover:neBackground hover:text-primary-foreground focus:neBackground focus:text-primary-foreground"



//______________________________________________________________________________________
// ===== Component =====

export default function Choices(){

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full grid grid-cols-1">
            <Button size="none" variant="none" className={`${BUTTON_CLASSES}`} disabled>No Choices to make currently...</Button>
        </div>
    )
    return (
        <div className="h-full grid grid-cols-2">
            <Button size="none" variant="none" className={`border-r-2 ${BUTTON_CLASSES}`}>Choice 1</Button>
            <Button size="none" variant="none" className={`border-l-2 ${BUTTON_CLASSES}`}>Choice 2</Button>
        </div>
    )
    return (
        <div className="h-full grid grid-cols-3">
            <Button size="none" variant="none" className={`border-r-2 ${BUTTON_CLASSES}`}>Choice 1</Button>
            <Button size="none" variant="none" className={`border-x-2 ${BUTTON_CLASSES}`}>Choice 2</Button>
            <Button size="none" variant="none" className={`border-l-2 ${BUTTON_CLASSES}`}>Choice 3</Button>
        </div>
    )
    return (
        <div className="h-full grid grid-cols-4">
            <Button size="none" variant="none" className={`border-r-2 ${BUTTON_CLASSES}`}>Choice 1</Button>
            <Button size="none" variant="none" className={`border-x-2 ${BUTTON_CLASSES}`}>Choice 2</Button>
            <Button size="none" variant="none" className={`border-x-2 ${BUTTON_CLASSES}`}>Choice 3</Button>
            <Button size="none" variant="none" className={`border-l-2 ${BUTTON_CLASSES}`}>Choice 4</Button>
        </div>
    )
}

