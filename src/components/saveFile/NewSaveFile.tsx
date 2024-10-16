"use client"

// Types ----------------------------------------------------------------------------
import { type SaveFileType } from "@prisma/client";
// Packages -------------------------------------------------------------------------
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
// Server ---------------------------------------------------------------------------
import { createSaveFile } from "@/server/saveFile";
// rQuery ---------------------------------------------------------------------------
import { getQueryClient } from "@/rQuery/getQueryClient";
// Data -----------------------------------------------------------------------------
import { SAVE_FILE_TYPE_MAPPER } from "@/data/_config";
// Styles ---------------------------------------------------------------------------
import styles from "@/styles/advanced.module.css";
// ShadcnUI -------------------------------------------------------------------------
import { Button } from "@/components/shadcn/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
// Components -----------------------------------------------------------------------
import DialogCapsule from "@/components/shadcn/DialogCapsule";
// Other ----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Component =====

export default function NewSaveFile(){

    //______________________________________________________________________________________
    // ===== Hooks =====
    const router = useRouter();


    //______________________________________________________________________________________
    // ===== Query =====
    const queryClient = getQueryClient();
    const { mutateAsync: createSaveFileMutation } = useMutation({
        mutationFn: createSaveFile,
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ['readSaveFiles'] });
            router.push(`/play/${data?.id}`);
        },
        onError: (error) => setErrorMessage(error?.message || "Something went wrong trying to create a save file!")
    })



    //______________________________________________________________________________________
    // ===== State =====
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [saveFileType, setSaveFileType] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");



    //______________________________________________________________________________________
    // ===== On Click Functions =====

    const onClickStartGame = async () => {
        if(isSaving) return;
        setIsSaving(true);

        if(!saveFileType) {
            setIsSaving(false);
            setErrorMessage("You must select a game type!");
            return;
        }

        await createSaveFileMutation({ saveFileType: (saveFileType as SaveFileType) });
        setIsSaving(false);
    }


    //______________________________________________________________________________________
    // ===== Component Return =====
    return(
        <DialogCapsule
            customTrigger={
                <button className={`${styles.saveFileButton} w-full`}>
                    <div className="w-full h-52 overflow-hidden border-4 rounded-3xl transition-all neonEffect neBorder neBorderGlow neColorPurple">
                        <div className="neonEffect neText neTextGlow neColorBlue">
                            <div className="text-center text-[8.7rem]">+</div>
                        </div>
                    </div>
                </button>
            }
            classNames={{
                dialogContent: "sm:max-w-[425px] neonEffect neBorder neBorderGlow neText neTextGlow neColorPurple",
                dialogHeader: "neonEffect neText neTextGlow neColorBlue"
            }}
            title="New Save File"
            description="How do you want to play the game?"
            actionButtons={
                <Button
                    className="text-primary-foreground neonEffect neBackground neBackgroundHover neColorPurple"
                    onClick={() => onClickStartGame()}
                >
                    Start Game
                </Button>
            }
        >
            <div className="neonEffect neText neTextGlow neColorBlue">
                <Select 
                    value={saveFileType} 
                    onValueChange={(value) => {
                        setErrorMessage("");
                        setSaveFileType(value);
                    }}
                    disabled={isSaving}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gameplay Mode" />
                    </SelectTrigger>
                    <SelectContent>
                        {SAVE_FILE_TYPE_MAPPER.map(x => (!x.invisible) && (
                            <SelectItem key={x.key} value={x.key} disabled={x?.disabled}>{x?.display ?? x.key} Mode</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {errorMessage && <div className="neonEffect neText neTextGlow neColorRed">Error: {errorMessage}</div>}
        </DialogCapsule>
    )
}