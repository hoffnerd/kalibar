

// Types ----------------------------------------------------------------------------
import { type ReactNode } from "react";
import { type CombatEntity } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import { HorizontalLine, MotionDiv } from "../../microComponents";
import EntityCardEnemy from "./EntityCardEnemy";
import EntityCardFriendly from "./EntityCardFriendly";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== True Constants =====

const CLASS_NAME="w-full flex overflow-hidden text-sm border-4 rounded-3xl bg-slate-950 neonEffect neBorder neBorderGlow"



//______________________________________________________________________________________
// ===== Micro-Components =====

function EntityCard({entity}:Readonly<{ entity:CombatEntity }>){
    if(entity.relation === "enemy") return <EntityCardEnemy entity={entity} />
    if(entity.relation === "friendly") return <EntityCardFriendly entity={entity} />
    return <div/>
}



//______________________________________________________________________________________
// ===== Component =====

export default function InitiativeCard({
    index,
    startingEntityKey,
    entity,
    isEntityTargetable,
}: Readonly<{
    index: number;
    startingEntityKey?: string | null;
    entity: CombatEntity;
    isEntityTargetable?: boolean;
}>) {
    console.log({ 
        "entity.key": entity.key, 
        startingEntityKey, 
        index, 
        iDoesNotEqual0: index !== 0,
        eKeyEqualsSEKey: entity.key === startingEntityKey,
        con: index !== 0 && entity.key === startingEntityKey
    });

    //______________________________________________________________________________________
    // ===== Constants =====
    const className = `${CLASS_NAME} ${entity.relation === "enemy" ? "neColorRed" : "neColorBlue"}`;
    const shouldRender = !entity.isDead && !entity.isHidden;
    
    //______________________________________________________________________________________
    // ===== Store Functions =====
    const entitySelectPhase = useCombatStore(state => state.entitySelectPhase);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return <>
        {index !== 0 && entity.key === startingEntityKey && (
            <MotionDiv>
                <HorizontalLine className="pb-6"/>
            </MotionDiv>
        )}
        {shouldRender && (
            <MotionDiv className="px-6 pb-6">
                {isEntityTargetable 
                    ? (
                        <button className={`${className} hover:neBackgroundHover`} onClick={() => entitySelectPhase(entity.key)}>
                            <EntityCard entity={entity} />
                        </button>
                    )
                    : (
                        <div className={className}>
                            <EntityCard entity={entity} />
                        </div>
                    )
                }
            </MotionDiv>
        )}
    </>
} 