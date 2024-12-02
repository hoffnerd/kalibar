

// Types ----------------------------------------------------------------------------
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Styles ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { HorizontalLine } from "../microComponents";
import { Progress } from "../shadcn/ui/progress";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------




//______________________________________________________________________________________
// ===== Micro-Components =====

function ProgressBar({ className, indicatorClassName, value, max }: Readonly<{
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

function EntityCardFriendly(){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorBlue">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 w-full max-h-[104px] overflow-auto">
                    <div className="w-full flex items-center justify-between">
                        <div>Name</div>
                        <div>Lvl: 0</div>
                    </div>

                    <div className="flex flex-row">
                        <div className="text-nowrap">
                            <div>HP: 25/50</div>
                            <div>AR: 50%</div>
                        </div>
                        <div className="w-full">
                            <ProgressBar indicatorClassName="neColorGreen" value={25} max={50}/>
                            <ProgressBar indicatorClassName="neColorRed" value={50} max={100}/>
                        </div>
                    </div>

                    {/* <div className="flex">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

function EntityCardEnemy(){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorRed">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 w-full max-h-[104px] overflow-auto">
                    <div className="w-full flex items-center justify-between">
                        <div>Name</div>
                        <div>Lvl: 0</div>
                    </div>

                    <div className="flex flex-row">
                        <div className="text-nowrap">
                            <div>HP: 25/50</div>
                        </div>
                        <div className="w-full">
                            <ProgressBar indicatorClassName="neColorGreen" value={25} max={50}/>
                        </div>
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

            <EntityCardEnemy/>

            <HorizontalLine className="pb-6"/>

            <EntityCardFriendly/>
            <EntityCardFriendly/>
            <EntityCardFriendly/>
            <EntityCardFriendly/>
        </div>
    )
}

