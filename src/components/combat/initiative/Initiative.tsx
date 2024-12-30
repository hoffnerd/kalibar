

// Types ----------------------------------------------------------------------------
import { type CombatEntity } from "@/typeDefs";
import { type CombatStoreActionSelected } from "@/stores/useCombatStore";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { getAction, useCombatStore } from "@/stores/useCombatStore";
// ShadcnUI -------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
import InitiativeCard from "./InitiativeCard";
// Data -----------------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Pure Functions =====

const getIsEntityTargetable = (entity?: CombatEntity, turnTakerEntity?: CombatEntity, actionSelected?: CombatStoreActionSelected | null) => {
    const actionSelectedObj = actionSelected && getAction(actionSelected);
    if(!(entity && turnTakerEntity && actionSelectedObj)) return false;
    if(actionSelectedObj.targetAmount === "self") return entity.key === turnTakerEntity.key;
    if(actionSelectedObj.targetType === "ally") return entity.relation === turnTakerEntity.relation;
    if(actionSelectedObj.targetType === "opponent") return entity.relation !== turnTakerEntity.relation;    
    return false;
}



//______________________________________________________________________________________
// ===== Component =====

export default function Initiative(){

    //______________________________________________________________________________________
    // ===== Stores =====
    const entities = useCombatStore(state => state.entities);
    const initiativeOrder = useCombatStore(state => state.initiativeOrder);
    const actionSelected = useCombatStore(state => state.actionSelected);
    


    //______________________________________________________________________________________
    // ===== Constants =====
    const turnTakerEntityKey = initiativeOrder?.[0];
    const turnTakerEntity = turnTakerEntityKey ? entities?.[turnTakerEntityKey] : undefined;



    //______________________________________________________________________________________
    // ===== Render Functions =====

    const renderInitiativeCards = () => {
        let initiativeOrderToRender: Array<{ key:string, entity:CombatEntity, isEntityTargetable?:boolean }> = [];
        initiativeOrder.forEach(key => {
            const entity = entities[key];
            if(!entity) return;
            if(entity.isDead || entity.isUnconscious || entity.isHidden) return;
            const isEntityTargetable = getIsEntityTargetable(entity, turnTakerEntity, actionSelected);
            initiativeOrderToRender.push({ key, entity, isEntityTargetable });
        });

        return initiativeOrderToRender.map(({ key, entity, isEntityTargetable }, index) =>  (
            <InitiativeCard
                key={key}
                index={index}
                startingEntityKey={initiativeOrderToRender[0]?.key}
                entity={entity}
                isEntityTargetable={isEntityTargetable}
            />
        ));
    }



    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full overflow-auto">
            <div className="pt-6"/>
            {renderInitiativeCards()}
        </div>
    )
}

