// Types ----------------------------------------------------------------------------
import { type CharacterSaveData, type CombatEntity } from "@/typeDefs";
import { type SkillKey, type AbilityKey, type AbilityLevels, type SkillOptional } from "@/data/abilities";
import { type CombatStoreEntities, type FriendlyCharacterSaveData } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
import { ABILITY_POINTS_AT_LEVEL_0 } from "@/data/_config";
import { ABILITIES, SKILLS} from "@/data/abilities";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export type CalculatedSkillsOptional = {
    [key in SkillKey]?: number;
};

export type CalculatedSkills = {
    [key in SkillKey]?: number;
};



//______________________________________________________________________________________
// ===== Functions =====

const getTotalLevel = (abilityLevels:AbilityLevels, level?:number) => {
    if(level && level > 0) return level;
    let totalLevel = 0 - ABILITY_POINTS_AT_LEVEL_0;
    (Object.keys(abilityLevels) as Array<AbilityKey>).forEach(abilityKey => {
        const abilityLevel = abilityLevels[abilityKey];
        if(abilityLevel) totalLevel += abilityLevel;
    });
    return Math.floor(totalLevel > 0 ? totalLevel : 0);
}

const calculateSkill = ({
    totalLevel = 0,
    abilityLevel = 0,
    base = 0,
    perTotalLevel = 0,
    perAbilityLevel = 0,
    max = Infinity,
    calculationType = "raw",
    multiplierPercent = 0,
}: Readonly<{
    totalLevel?: number,
    abilityLevel?: number,
    base?: number,
    perTotalLevel?: number,
    perAbilityLevel?: number,
    max?: number,
    calculationType?: "round" | "floor" | "raw",
    multiplierPercent?: number,
}>) => {

    const totalLevelToUse = abilityLevel > 0 ? Math.max(0.5, totalLevel) : totalLevel;
    const multiplier = 1 + ( multiplierPercent / 100);

    const calcPerTotalLevel = (totalLevelToUse * perTotalLevel);
    const calcPerAbilityLevel = (abilityLevel * perAbilityLevel);
    const calcBasedOnLevels = (calcPerTotalLevel + calcPerAbilityLevel)

    let calculation = base + (calcBasedOnLevels * multiplier);
    if(calculation > max) calculation = max;
    
    if(calculationType === "round") return parseFloat(Number(calculation).toFixed(2));
    if(calculationType === "floor") return Math.floor(calculation);
    return calculation;
}

const calculateSkills = (character:CharacterSaveData) => {
    let skills: CalculatedSkillsOptional = {};
    SKILLS && (Object.keys(SKILLS) as Array<SkillKey>).forEach(skillKey => {
        const skill = SKILLS[skillKey];
        skills[skillKey] = calculateSkill({ 
            totalLevel: getTotalLevel(character.abilities), 
            abilityLevel: character.abilities[skill.abilityKey],
            base: skill.base,
            perTotalLevel: skill.perTotalLevel,
            perAbilityLevel: skill.perAbilityLevel,
            max: skill.max,
            calculationType: skill.calculationType,
            // multiplierPercent: Handle Equipment or Talent or other additional multiplierPercents,
        });
    });
    return skills as CalculatedSkills;
}

// const randomizeEntities = (entities, options) => {
//     const shownEntities = convertObjToArray({...entities}).filter(x => !x.isHidden)
//     if(isArray(shownEntities, options.show, true)) return { ...entities };

//     let newEntities = { ...entities }
//     const hiddenEntities = convertObjToArray({...newEntities}).filter(x => x.isHidden)
//     const hiddenEnemyIds = hiddenEntities.map(x => x.id);
//     const numberOfHiddenEntities = hiddenEnemyIds.length;
//     const randomIndex = Math.floor(Math.random() * numberOfHiddenEntities);
    
//     newEntities[ hiddenEnemyIds[randomIndex] ].isHidden = false;
//     return randomizeEntities(newEntities, options)
// }

// const configureEnemyEntities = () => {
//     if(encounterData?.settings?.randomize) return randomizeEntities(encounterData.enemies, encounterData.settings.randomize);
//     return isObj(enemies) ? { ...enemies } : {};
// }

const configureFriendlyEntities = ( friendlies:FriendlyCharacterSaveData ) => {
    let entities: CombatStoreEntities = {};
    friendlies && (Object.keys(friendlies) as Array<keyof FriendlyCharacterSaveData>).forEach(friendlyKey => {
        const friendly = friendlies[friendlyKey];
        if(!friendly) return;
        const friendlyEntity: CombatEntity = { 
            ...friendly,
            skills: friendly && calculateSkills(friendly) || {},
            isDead: false,
            isUnconscious: false,
            isHidden: false,
        };
        entities[friendlyKey] = friendlyEntity;
    })
    return entities;
}