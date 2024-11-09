
// Types ----------------------------------------------------------------------------
import { type NarrativeDisplayComponent } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
// Hooks ---------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function Text({
    children,
    component="span",
    className,
}: Readonly<{ 
    children?: React.ReactNode; 
    component?: NarrativeDisplayComponent["component"];
    className?: NarrativeDisplayComponent["className"];
}>) {

    //______________________________________________________________________________________
    // ===== Constants =====
    const Comp = component;


    //______________________________________________________________________________________
    // ===== Component Return =====

    switch (Comp) {
        case "br": return <br/>;
        case "hr": return <hr/>;
        default: return (
            <Comp className={className}>
                {children}
            </Comp>
        );
    }
}