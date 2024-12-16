// Types ----------------------------------------------------------------------------
import { type CharacterSaveData, type CombatEntity } from "@/typeDefs";
import { type SkillKey, type AbilityKey, type AbilityLevels, type SkillOptional } from "@/data/abilities";
import { type CombatStoreEntities, type FriendlyCharacterSaveData } from "@/stores/useCombatStore";
import { EncounterSettings, type Encounter } from "@/data/combat/encounters";
// Data -----------------------------------------------------------------------------
import { ABILITY_POINTS_AT_LEVEL_0 } from "@/data/_config";
import { ABILITIES, SKILLS} from "@/data/abilities";
import { Enemy } from "@/data/combat/enemies";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export type CalculatedSkillsOptional = {
    [key in SkillKey]?: number;
};

export type CalculatedSkills = {
    [key in SkillKey]?: number;
};



//______________________________________________________________________________________
// ===== Level and Skill Functions =====

export const getTotalLevel = (abilityLevels:AbilityLevels, level?:number) => {
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



//______________________________________________________________________________________
// ===== Entity Functions =====

const createEnemyEntities = ( enemies:Array<Enemy> ) => {
    let entities: CombatStoreEntities = {};
    enemies && enemies.forEach(enemy => {
        if(!enemy) return;
        const skills = calculateSkills(enemy);
        const enemyEntity: CombatEntity = { 
            ...enemy,
            skills,
            hp: skills.maxHealth || 0,
            isDead: false,
            isUnconscious: false,
            isHidden: enemy?.isHidden || false,
        };
        entities[enemy.key] = enemyEntity;
    })
    return entities;
}

const randomizeEntities = (settings:EncounterSettings, enemiesHidden:CombatStoreEntities, enemiesShown?:CombatStoreEntities) => {
    const enemiesHiddenKeys = Object.keys(enemiesHidden || {});
    const enemiesShownKeys = Object.keys(enemiesShown || {});
    if(settings?.randomize?.show && settings.randomize.show <= enemiesShownKeys.length) return enemiesShown;

    const randomIndex = Math.floor(Math.random() * enemiesHiddenKeys.length);
    const randomEnemyHiddenKey = enemiesHiddenKeys?.[randomIndex] || "";
    const randomEnemyEntity = enemiesHidden[randomEnemyHiddenKey] as CombatEntity;

    let newEnemiesHidden = structuredClone(enemiesHidden);
    delete newEnemiesHidden[randomEnemyHiddenKey];
    let newEnemiesShown = structuredClone(enemiesShown || {});
    newEnemiesShown[randomEnemyHiddenKey] = randomEnemyEntity;

    return randomizeEntities(settings, newEnemiesHidden, newEnemiesShown);
}

export const configureEnemyEntities = ( encounter:Encounter ) => {
    if(encounter?.settings?.randomize) {
        return randomizeEntities(
            encounter.settings, 
            createEnemyEntities(encounter.enemies.filter(enemy => enemy.isHidden)), 
            createEnemyEntities(encounter.enemies.filter(enemy => !enemy.isHidden))
        );
    }
    return createEnemyEntities(encounter.enemies);
}

export const configureFriendlyEntities = ( friendlies:FriendlyCharacterSaveData ) => {
    let entities: CombatStoreEntities = {};
    friendlies && (Object.keys(friendlies) as Array<keyof FriendlyCharacterSaveData>).forEach(friendlyKey => {
        const friendly = friendlies[friendlyKey];
        if(!friendly) return;
        const skills = calculateSkills(friendly);
        const friendlyEntity: CombatEntity = { 
            ...friendly,
            skills,
            hp: skills.maxHealth || 0,
            aggro: 50,
            isDead: false,
            isUnconscious: false,
            isHidden: false,
        };
        entities[friendlyKey] = friendlyEntity;
    })
    return entities;
}



//______________________________________________________________________________________
// ===== Initiative Functions =====

const compareObjectsWithInitiative = (a:{ initiative:number }, b:{ initiative:number }) => {
    const { initiative:aInitiative } = a;
    const { initiative:bInitiative } = b;

    if (aInitiative < bInitiative) return -1;
    if (aInitiative > bInitiative) return 1;
    return 0;
}

export const getInitiativeOrder = ( entities:CombatStoreEntities ) => {
    let entityKeyWithInitiative: Array<{ key:string, initiative:number }> = [];
    Object.keys(entities).forEach(entityKey => {
        const entity = entities[entityKey];
        if(!entity) return;
        const initiative = Math.floor(Math.random() * 100) + (entity.skills.initiative as number);
        entityKeyWithInitiative.push({ key:entityKey, initiative });
    });
    entityKeyWithInitiative.sort(compareObjectsWithInitiative);
    return entityKeyWithInitiative.map(entityKeyInitiative => entityKeyInitiative.key);
}