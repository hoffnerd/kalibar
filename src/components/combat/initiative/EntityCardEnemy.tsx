

// Types ----------------------------------------------------------------------------
import { type CombatEntity } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import ProgressBar from "@/components/ProgressBar";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { getTotalLevel } from "@/utils/combat";



//______________________________________________________________________________________
// ===== Component =====

export default function EntityCardEnemy({entity}:Readonly<{ entity:CombatEntity }>){
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
                </div>
                <div className="w-full">
                    <ProgressBar indicatorClassName="neColorGreen" value={entity.hp} max={entity.skills.maxHealth || 0}/>
                </div>
            </div>
        </div>
    </>

}