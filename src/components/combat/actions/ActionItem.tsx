

// Types ----------------------------------------------------------------------------
import { type CombatStoreActionSelected } from "@/stores/useCombatStore";
// Packages -------------------------------------------------------------------------
// rQuery ---------------------------------------------------------------------------
// Stores ---------------------------------------------------------------------------
import { useCombatStore } from "@/stores/useCombatStore";
// Data -----------------------------------------------------------------------------
// ShadcnUI -------------------------------------------------------------------------
import { MenubarItem } from "../../shadcn/ui/menubar";
// Components -----------------------------------------------------------------------
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function ActionItem({
    children,
    className,
    actionKeys,
    title,
}: Readonly<{
    children?: React.ReactNode;
    className?: string;
    actionKeys: CombatStoreActionSelected;
    title: string;
}>){

    //______________________________________________________________________________________
    // ===== Store Functions =====
    const actionSelectPhase = useCombatStore(state => state.actionSelectPhase);

    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <MenubarItem 
            className={`
                block border-2 border-slate-400 text-wrap max-w-80 m-1 neonEffect 
                hover:neBorder focus:neBorder hover:neBorderGlow focus:neBorderGlow 
                ${className}
            `}
            onClick={() => actionSelectPhase(actionKeys)}
        >
            <div>{title}</div>
            <div className="text-xs text-slate-400 ">{children}</div>
        </MenubarItem>
    )
}