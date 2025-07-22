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
import { useState } from "react";
import { useProductVouchers } from "@/hooks/useProductVouchers";
import { useRewardVouchers } from "@/hooks/useRewardVouchers";

type RedemptionCandidate = {
  id: string;
  name: string;
  type: "product" | "reward";
};

interface ConfirmRedeemAlertDialogProps {
  redemptionCandidate: RedemptionCandidate | null;
  setRedemptionCandidate: (c: RedemptionCandidate | null) => void;
  setRedeemingId: (id: string | null) => void;
}

export default function ConfirmRedeemAlertDialog({
  redemptionCandidate,
  setRedemptionCandidate,
  setRedeemingId,
}: ConfirmRedeemAlertDialogProps) {
  const { createProductVoucher } = useProductVouchers();
  const { createRewardVoucher } = useRewardVouchers();
  const [redeeming, setRedeeming] = useState(false);

  const handleConfirmRedemption = async () => {
    if (!redemptionCandidate) return;
    setRedeeming(true);
    setRedeemingId(redemptionCandidate.id);
    try {
      if (redemptionCandidate.type === "product") {
        await createProductVoucher(redemptionCandidate.id);
      } else {
        await createRewardVoucher(redemptionCandidate.id);
      }
      setRedemptionCandidate(null);
    } finally {
      setRedeeming(false);
      setRedeemingId(null);
    }
  };

  return (
    <AlertDialog
      open={!!redemptionCandidate}
      onOpenChange={(open) => {
        if (!open) setRedemptionCandidate(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to redeem &quot;
            {redemptionCandidate?.name}&quot;?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={redeeming}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmRedemption}
            disabled={redeeming}
          >
            {redeeming ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
