

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { Progress } from "./shadcn/ui/progress";
// Components -----------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Micro-Components =====

export default function ProgressBar({ className, indicatorClassName, value, max }: Readonly<{
    className?: string,
    indicatorClassName?: string,
    value: number,
    max: number,
}>){
    return (
        <div className="pl-1 w-full min-h-5 flex items-center justify-between">
            <Progress
                className={`h-2 ${className}`}
                indicatorClassName={`neonEffect neBackground neBorderGlow ${indicatorClassName}`}
                value={(value / max) * 100}
            />
        </div>
    )
}