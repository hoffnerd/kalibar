
// Types ----------------------------------------------------------------------------
import { type CharacterOptional, type AbilityLevels } from "@/typeDefs"
// Data -----------------------------------------------------------------------------
import { DEFAULT_ABILITY_LEVELS } from "../abilities"
// Other -----------------------------------------------------------------------------
import { createCharacter } from "../characters";



//______________________________________________________________________________________
// ===== Types & Interfaces =====



//______________________________________________________________________________________
// ===== Functions =====

const createEnemy = (enemyDetails: CharacterOptional) => {
    return createCharacter({ ...enemyDetails, relation: "enemy" });
}



//______________________________________________________________________________________
// ===== Enemies =====

const magicThug = createEnemy({
    key: "magicThug",
    display: "Magic Thug",
    abilities: {
        arcana: 5,
    }
})

const trickyThug = createEnemy({
    key: "trickyThug",
    display: "Tricky Thug",
    abilities: {
        charisma: 5,
    }
})

const fastThug = createEnemy({
    key: "fastThug",
    display: "Fast Thug",
    abilities: {
        finesse: 5,
    }
})

const smartThug = createEnemy({
    key: "smartThug",
    display: "Smart Thug",
    abilities: {
        wit: 5,
    }
})

const strongThug = createEnemy({
    key: "strongThug",
    display: "Strong Thug",
    abilities: {
        physicality: 5,
    }
})



//______________________________________________________________________________________
// ===== Export =====

export type EnemyKey = keyof typeof ENEMIES;
export const ENEMIES = {
    magicThug,
    trickyThug,
    fastThug,
    smartThug,
    strongThug,
}