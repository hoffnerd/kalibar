
// Types ----------------------------------------------------------------------------
import { type CharacterSaveData, type CharacterOptional } from "@/typeDefs"
// Data -----------------------------------------------------------------------------
import { DEFAULT_ABILITY_LEVELS } from "../abilities"
// Other -----------------------------------------------------------------------------
import { createCharacter } from "../characters";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface Enemy extends Omit<CharacterSaveData, "key" | "fullName" | "relation"> {
    key: string;
    relation: "enemy";
    isHidden?: boolean;
}



//______________________________________________________________________________________
// ===== Functions =====

const createEnemy = (enemyDetails: CharacterOptional) => {
    return createCharacter({ ...enemyDetails, relation: "enemy" }) as Enemy;
}



//______________________________________________________________________________________
// ===== Enemies =====

const magicThug = createEnemy({
    key: "magicThug",
    display: "Magic Thug",
    abilities: {
        arcana: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})

const trickyThug = createEnemy({
    key: "trickyThug",
    display: "Tricky Thug",
    abilities: {
        charisma: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})

const fastThug = createEnemy({
    key: "fastThug",
    display: "Fast Thug",
    abilities: {
        finesse: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})

const smartThug = createEnemy({
    key: "smartThug",
    display: "Smart Thug",
    abilities: {
        wit: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})

const strongThug = createEnemy({
    key: "strongThug",
    display: "Strong Thug",
    abilities: {
        physicality: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})

const hardyThug = createEnemy({
    key: "hardyThug",
    display: "Hardy Thug",
    abilities: {
        vitality: 5,
    },
    equipment: {
        rightHand: "debugPhysicalWeapon",
        leftHand: "debugMagicalWeapon",
    },
})



//______________________________________________________________________________________
// ===== Export =====

export const ENEMIES = {
    magicThug,
    trickyThug,
    fastThug,
    smartThug,
    strongThug,
    hardyThug,
}