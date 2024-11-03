

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { Progress } from "../shadcn/ui/progress";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------




//______________________________________________________________________________________
// ===== Micro-Components =====

function EntityCard(){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorBlue">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 grid grid-rows-4 w-full">
                    <div className="w-full flex items-center justify-between">
                        <div>Name</div>
                        <div>Lvl: 0</div>
                    </div>
                    <div>HP: 50/50</div>
                    <div className="flex items-center justify-between">
                        <Progress
                            className="h-2"
                            indicatorClassName="neonEffect neBackground neBorderGlow neColorGreen" 
                            value={50} 
                        />
                    </div>
                    <div className="flex">
                        <div>AP:</div>
                        <div className={`
                            ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600
                            neonEffect neBackground neBorderGlow neColorYellow
                        `}/>
                        <div className={`
                            ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600
                            neonEffect neBackground neBorderGlow neColorYellow
                        `}/>
                        <div className={`
                            ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600
                            neonEffect neBackground neBorderGlow neColorYellow
                        `}/>
                        <div className={`ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600`}/>
                        <div className={`ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600`}/>
                        <div className={`ml-2 mt-[0.125rem] max-w-4 max-h-4 w-full h-full rounded-2xl bg-slate-600`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}




//______________________________________________________________________________________
// ===== Component =====

export default function Initiative(){

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full overflow-auto">
            <div className="pt-6"/>

            <EntityCard/>

            <div className="px-3 pb-6">
                <div className="border-2 rounded-3xl neonEffect neBorder neBorderGlow neColorWhite"/>
            </div>
            <EntityCard/>
            <EntityCard/>
            <EntityCard/>
            <EntityCard/>
        </div>
    )
}

