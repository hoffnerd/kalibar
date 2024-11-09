// Types ----------------------------------------------------------------------------
import { type NarrativeDisplayArray, type NarrativeDisplayComponent } from "@/data/narrative";
// Packages -------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import Text from "./Text";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function TextMany({
    narrativeDisplayArray,
    component="span",
    className,
    depth=0
}: Readonly<{ 
    narrativeDisplayArray: NarrativeDisplayArray;
    component?: NarrativeDisplayComponent["component"];
    className?: NarrativeDisplayComponent["className"];
    depth?: number
}>){


    //______________________________________________________________________________________
    // ===== Component Return =====
    return narrativeDisplayArray.map((narrative, i) => {
        if((narrative as NarrativeDisplayComponent)?.display){
            const narrativeDisplay = narrative as NarrativeDisplayComponent
            return (
                <TextMany
                    key={i}
                    narrativeDisplayArray={narrativeDisplay.display}
                    component={narrativeDisplay?.component}
                    className={narrativeDisplay?.className}
                    depth={depth++}
                />
            );
        }
        return <Text key={i} className={className} component={component}>{narrative as string}</Text>;
    })
}