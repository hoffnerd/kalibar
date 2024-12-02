import { CharacterSaveData } from "@/typeDefs";
import { ENEMIES } from "../combat/enemies";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface EncounterSettings {
    randomize?:  {
        show?: number;
    };
}

export interface Encounter {
    settings?: EncounterSettings;
    enemies: Array<CharacterSaveData>;
}



//______________________________________________________________________________________
// ===== Enemies =====

const { 
    magicThug,
    trickyThug,
    fastThug,
    smartThug,
    strongThug,
    hardyThug,
} = ENEMIES;



//______________________________________________________________________________________
// ===== Encounters =====

export const test: Encounter = {
    settings: {
        randomize:  {
            show: 3
        }
    },
    enemies: [
        magicThug,
        trickyThug,
        fastThug,
        smartThug,
        strongThug,
        hardyThug,
    ],
}



//______________________________________________________________________________________
// ===== Export =====

export type EncounterKey = keyof typeof ENCOUNTERS;
export const ENCOUNTERS = {
    test,
}