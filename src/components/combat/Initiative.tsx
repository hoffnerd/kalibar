

// Types ----------------------------------------------------------------------------
import { type CombatEntity } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// ShadcnUI -------------------------------------------------------------------------
import { Progress } from "../shadcn/ui/progress";
// Components -----------------------------------------------------------------------
import { HorizontalLine } from "../microComponents";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { getTotalLevel } from "@/utils/combat";




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

function EntityCardFriendly({entity}:Readonly<{ entity:CombatEntity }>){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorBlue">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 w-full max-h-[104px] overflow-auto">
                    <div className="w-full flex items-center justify-between">
                        <div>{entity.display}</div>
                        <div>Lvl: {getTotalLevel(entity.abilities)}</div>
                    </div>

                    <div className="flex flex-row">
                        <div className="text-nowrap">
                            <div>HP: {entity.hp}/{entity.skills.maxHealth}</div>
                            <div>AR: {entity.aggro}%</div>
                        </div>
                        <div className="w-full">
                            <ProgressBar indicatorClassName="neColorGreen" value={entity.hp} max={entity.skills.maxHealth || 0}/>
                            <ProgressBar indicatorClassName="neColorRed" value={entity.aggro || 0} max={100}/>
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

function EntityCardEnemy({entity}:Readonly<{ entity:CombatEntity }>){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorRed">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 w-full max-h-[104px] overflow-auto">
                    <div className="w-full flex items-center justify-between">
                        <div>{entity.display}</div>
                        <div>Lvl: {getTotalLevel(entity.abilities)}</div>
                    </div>

                    <div className="flex flex-row">
                        <div className="text-nowrap">
                            <div>HP: {entity.hp}/{entity.skills.maxHealth}</div>
                        </div>
                        <div className="w-full">
                            <ProgressBar indicatorClassName="neColorGreen" value={entity.hp} max={entity.skills.maxHealth || 0}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InitiativeCard({ index, entity }: Readonly<{ index:number, entity:CombatEntity }>){
    const startingEntityKey = useCombatStore(state => state.startingEntityKey);
    return <>
        {index !== 0 && entity.key === startingEntityKey && <HorizontalLine className="pb-6"/>}
        {entity.relation === "enemy" && <EntityCardEnemy entity={entity} />}
        {entity.relation === "friendly" && <EntityCardFriendly entity={entity}/>}
    </>;
} 




//______________________________________________________________________________________
// ===== Component =====

export default function Initiative(){

    //______________________________________________________________________________________
    // ===== Stores =====
    const entities = useCombatStore(state => state.entities);
    const initiativeOrder = useCombatStore(state => state.initiativeOrder);

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full overflow-auto">
            <div className="pt-6"/>
            {initiativeOrder.map((entityKey, index) => {
                const entity = entities[entityKey];
                if(!entity) return;
                return <InitiativeCard key={entityKey} index={index} entity={entity}/>
            })}
        </div>
    )
}

