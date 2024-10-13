// Packages--------------------------------------------------------------------------
// Components------------------------------------------------------------------------
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
// Other-----------------------------------------------------------------------------



//______________________________________________________________________________________
// ===== Constants =====

const DEFAULT_OPTIONS = {
    integratedFooter: true,
    integratedCloseButton: true,
    closeButtonText: "Close",
};



//______________________________________________________________________________________
// ===== Component =====

/**
 * Creates a dialog component with customizable title, description, action buttons, and trigger text.
 * @param props
 * @param props.children - any valid jsx, used as the main content of the dialog
 * @param props.classNames - optional object where each key is a different location to add classNames too
 * @param props.title - optional string, used to specify the title of the dialog box that will be displayed
 * to the user. If not given, title of the dialog will be left empty.
 * @param props.description - optional string, used to provide a description or additional information that will
 * be displayed within the dialog component. It helps to provide context or instructions related to the
 * content of the dialog. If not given, description of the dialog will be left empty.
 * @param props.actionButtons - optional jsx, used to specify the buttons or actions that will be
 * displayed in the dialog's footer. These buttons typically represent actions that the user can take within the dialog,
 * such as confirming, canceling, submitting a form, or anything else.
 * @param props.triggerText - optional string, default is "Open". Represents the text displayed on the button
 * that triggers the dialog to open.
 * @param props.customTrigger - optional jsx, default is `null`. Used to provide a custom trigger element
 * that will open the dialog when clicked or interacted with.
 * @param props.options - optional object, that contains a number of options for the dialog.
 * It can contain the following properties:
 * @param props.options.integratedCloseButton - optional boolean, default is true. Set to false if you want to
 * hide the close button. Helpful when you want to give the user the actions in within `actionButtons`.
 * @param props.options.closeButtonText - optional string, default is "Close". This is the text shown on the close button.
 */
export default function DialogCapsule({
    children,
    classNames,
    title,
    description,
    actionButtons,
    triggerText = "Open",
    customTrigger = null,
    options,
}: {
    children?: React.ReactNode;
    classNames?: {
        dialogContent?: string
        dialogHeader?: string
    }
    title?: string;
    description?: string;
    actionButtons?: React.JSX.Element | null;
    triggerText?: string | "Open";
    customTrigger?: React.JSX.Element | null;
    options?: {
        integratedFooter?: boolean | true;
        integratedCloseButton?: boolean | true;
        closeButtonText?: string | "Close";
    };
}) {

    //______________________________________________________________________________________
    // ===== Options =====
    const { integratedFooter, integratedCloseButton, closeButtonText } = options ? { ...DEFAULT_OPTIONS, ...options } : { ...DEFAULT_OPTIONS };


    
    //______________________________________________________________________________________
    // ===== Component Return =====
    return (
        <Dialog>
            <DialogTrigger asChild>
                {customTrigger || <Button variant="outline">{triggerText}</Button>}
            </DialogTrigger>
            <DialogContent className={classNames?.dialogContent ?? "sm:tw-max-w-[425px]"}>
                <DialogHeader className={classNames?.dialogHeader}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                {integratedFooter && (
                    <DialogFooter>
                        {integratedCloseButton && (
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">{closeButtonText}</Button>
                            </DialogClose>
                        )}
                        {actionButtons}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
