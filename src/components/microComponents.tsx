// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
import { Terminal } from "lucide-react";
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { Alert as ShadcnAlert, AlertTitle, AlertDescription } from "./shadcn/ui/alert";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====

export function Alert({
    children,
    className,
    variant="none",
    title,
}: Readonly<{ 
    children?: React.ReactNode;
    className?: string;
    title?: string;
    variant?: "none" | "default" | "destructive" | "neonEffect" | "neonEffectWithGlow";
 }>) {
    return (
        <ShadcnAlert className={className} variant={variant} >
            <Terminal className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{children}</AlertDescription>
        </ShadcnAlert>
    );
}
