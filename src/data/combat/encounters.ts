import { CharacterSaveData } from "@/typeDefs";
import { ENEMIES, Enemy } from "./enemies";



//______________________________________________________________________________________
// ===== Types & Interfaces =====

export interface EncounterSettings {
    randomize?:  {
        show?: number;
    };
}

export interface Encounter {
    settings?: EncounterSettings;
    enemies: Array<Enemy>;
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
            show: 2
        }
    },
    enemies: [
        { ...magicThug, isHidden: true },
        { ...trickyThug, isHidden: true },
        { ...fastThug, isHidden: true },
        { ...smartThug, isHidden: true },
        { ...strongThug, isHidden: true },
        { ...hardyThug, isHidden: true },
    ],
}



//______________________________________________________________________________________
// ===== Export =====

export type EncounterKey = keyof typeof ENCOUNTERS;
export const ENCOUNTERS = {
    test,
}