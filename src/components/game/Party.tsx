

// Types ----------------------------------------------------------------------------
import { ABILITIES, AbilityKey } from "@/data/abilities";
import { type Character } from "@/data/characters";
import { type SaveData } from "@/typeDefs";
// Packages -------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
// Data -----------------------------------------------------------------------------
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------
import { calculateLevel } from "@/utils";




//______________________________________________________________________________________
// ===== Micro-Components =====

function EntityCard({ character }: Readonly<{ character?: Character; }>){
    return (
        <div className="px-6 pb-6">
            <div className="w-full flex overflow-hidden text-sm border-4 rounded-3xl neonEffect neBorder neBorderGlow neColorBlue">
                <div className="p-3">
                    <div className="w-20 h-20 bg-slate-600"/>
                </div>
                <div className="py-3 pr-3 grid grid-rows-3 w-full">
                    <div className="w-full flex items-center justify-between">
                        <div>{character?.display}</div>
                        <div>Lvl: {character?.abilities ? calculateLevel(character.abilities) : 0}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center">
                        {(Object.keys(ABILITIES) as Array<AbilityKey>).map(abilityKey => (
                            <div key={abilityKey}>
                                <div className="hidden 3xl:block">{ABILITIES[abilityKey].display}</div>
                                <div className="uppercase hidden 0.5xl:block 3xl:hidden">{ABILITIES[abilityKey].short}</div>
                                <div className="uppercase hidden lg:block 0.5xl:hidden">{ABILITIES[abilityKey].short[0]}</div>
                                <div className="hidden 0.5sm:block lg:!hidden">{ABILITIES[abilityKey].display}</div>
                                <div className="uppercase hidden 0.25sm:block 0.5sm:hidden">{ABILITIES[abilityKey].short}</div>
                                <div className="uppercase block 0.25sm:hidden">{ABILITIES[abilityKey].short[0]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center">
                        {(Object.keys(ABILITIES) as Array<AbilityKey>).map(abilityKey => (
                            <div key={abilityKey}>{character?.abilities?.[abilityKey] || 0}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}




//______________________________________________________________________________________
// ===== Component =====

export default function Party({ saveData }: Readonly<{ saveData?: SaveData; }>){

    //______________________________________________________________________________________
    // ===== Component Return =====

    return (
        <div className="h-full overflow-auto">
            <div className="pt-6"/>
            {saveData?.party.map(characterKey => {
                const character = characterKey !== "???" && saveData.crew[characterKey];
                if(!character) return;
                return <EntityCard key={characterKey} character={character} />
            })}
        </div>
    )
}

