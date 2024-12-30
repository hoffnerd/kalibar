

// Types ----------------------------------------------------------------------------
import { type CombatEntity } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import ProgressBar from "@/components/ProgressBar";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { getTotalLevel } from "@/utils/combat";



//______________________________________________________________________________________
// ===== Micro-Components ===== 





//______________________________________________________________________________________
// ===== Component =====

export default function EntityCardFriendly({entity}:Readonly<{ entity:CombatEntity }>){
    return <>
        <div className="p-3">
            <div className="w-20 h-20 bg-slate-600"/>
        </div>
        <div className="py-3 pr-3 w-full max-h-[104px] overflow-auto">
            <div className="w-full flex items-center justify-between">
                <div>{entity.display}</div>
                <div>Lvl: {getTotalLevel(entity.abilities)}</div>
            </div>

            <div className="flex flex-row">
                <div className="text-nowrap text-left">
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
    </>
}