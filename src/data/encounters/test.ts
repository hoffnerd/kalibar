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
    enemies: object;
}



//______________________________________________________________________________________
// ===== Enemies =====

const { 
    magicThug, 
    strongThug, 
    trickyThug, 
    fastThug, 
    smartThug,
} = ENEMIES;



//______________________________________________________________________________________
// ===== Encounters =====

export const test: Encounter = {
    settings: {
        randomize:  {
            show: 2
        }
    },
    enemies: {
        magicThug,
        strongThug,
        trickyThug,
        fastThug,
        smartThug,
    },
}



//______________________________________________________________________________________
// ===== Export =====

export type EncounterKey = keyof typeof ENCOUNTERS;
export const ENCOUNTERS = {
    test,
}