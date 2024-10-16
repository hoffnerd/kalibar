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
// ===== Functions =====

const readableIncrement = (time: number) => time < 10 ? `0${time}` : time;




//______________________________________________________________________________________
// ===== Micro-Components =====

/**
 * Renders an alert component with specified variant, title, and children.
 */
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

/**
 * Converts a given time in seconds into a readable format of hours, minutes, and seconds (HH:MM:SS).
 */
export function ReadableTime({ timeInSeconds }: Readonly<{ timeInSeconds: number }>){
    const hours = Math.floor(timeInSeconds / (60 * 60));

    const divisorForMinutes = timeInSeconds % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);


    return `${readableIncrement(hours)}:${readableIncrement(minutes)}:${readableIncrement(seconds)}`
}