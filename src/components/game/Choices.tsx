

// Types ----------------------------------------------------------------------------
import { type SaveData } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Hooks ----------------------------------------------------------------------------
import useSaveGame from "@/hooks/useSaveGame";
// Data -----------------------------------------------------------------------------
import { STORY_NARRATIVE } from "@/data/narrative";
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "../shadcn/ui/button";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const BUTTON_CLASSES = "neonEffect neBorder neColorPurple hover:neBackground hover:text-primary-foreground focus:neBackground focus:text-primary-foreground"
const GRID_COLS = [
    "",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
];



//______________________________________________________________________________________
// ===== Micro-Components =====

function SoloGridButton({ 
    children, 
    disabled=false,
    onClick=undefined,
}: Readonly<{ 
    children?: React.ReactNode;
    disabled?: boolean; 
    onClick?: ()=>void;
}>){
    return (
        <div className="h-full grid grid-cols-1">
            <Button size="none" variant="none" className={`${BUTTON_CLASSES}`} onClick={onClick} disabled={disabled}>
                {children}
            </Button>
        </div>
    )
}

function NoChoices(){
    return <SoloGridButton disabled>No Choices to make currently...</SoloGridButton>
}



//______________________________________________________________________________________
// ===== Component =====

export default function Choices({ saveData }: Readonly<{ saveData?: SaveData; }>){

    //______________________________________________________________________________________
    // ===== Constants =====
    const recentNarrativeKey = saveData?.narrative ? saveData.narrative[ saveData.narrative.length-1 ] : null;
    const recentNarrative = recentNarrativeKey ? STORY_NARRATIVE[recentNarrativeKey] : null;
    


    //______________________________________________________________________________________
    // ===== Hooks =====
    const { addNarrative } = useSaveGame();


    
    //______________________________________________________________________________________
    // ===== Component Return =====

    if(!saveData?.narrative) return <NoChoices/>

    if(recentNarrative?.nextNarrative) return (
        <SoloGridButton onClick={() => addNarrative(recentNarrative.nextNarrative)}>
            Continue
        </SoloGridButton>
    )

    if(recentNarrative?.choices) return (
        <div className={`h-full grid ${GRID_COLS[recentNarrative.choices.length]}`}>
            {recentNarrative.choices.map((choice, i) => {
                let borderClassName = "border-x-2";
                if(i === 0) borderClassName = "border-r-2";
                if(i === (recentNarrative.choices?.length || 1) - 1) borderClassName = "border-l-2";
                return (
                    <Button 
                        key={choice.key}
                        size="none"
                        variant="none"
                        className={`${borderClassName} ${BUTTON_CLASSES}`}
                        onClick={() => addNarrative(choice.key)}
                    >
                        {choice.display}
                    </Button>
                );
            })}
        </div>
    ) 

    return <NoChoices/>;
}

