

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { MenubarContent } from "../../shadcn/ui/menubar";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function ActionBarContent({ children, className }: Readonly<{ children?: React.ReactNode, className?: string }>){
    return (
        <MenubarContent className={`max-h-[75dvh] overflow-auto neonEffect neBorder neBorderGlow ${className}`}>
            {children}
        </MenubarContent>
    )
}