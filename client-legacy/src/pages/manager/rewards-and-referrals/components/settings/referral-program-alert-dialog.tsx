import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export default function ReferralProgramAlertDialog({
  open,
  setCancel,
  setClose,
  enabled,
}: {
  open: boolean;
  setCancel: () => void;
  setClose: () => void;
  enabled: boolean;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you want {enabled ? "disable" : "enable"} Referral Program?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will{" "}
            {enabled
              ? "prevent users from referring others."
              : "allow users to participate and earn rewards."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={setCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={setClose}
            className={cn(
              enabled
                ? "bg-emerald-400 hover:bg-emerald-500"
                : "bg-red-500 hover:bg-red-600",
              "text-white"
            )}
          >
            {!enabled ? "Disable" : "Enable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
