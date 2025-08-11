import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { toast } from "sonner";
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
import { productsKeys } from "@/lib/query-keys";
import { productVouchersService } from "@/services/product-voucher.service";
import { rewardVouchersService } from "@/services/reward-voucher.service";
import type { RedemptionCandidate } from "..";

interface ConfirmRedeemAlertDialogProps {
  redemptionCandidate: RedemptionCandidate | null;
  onOpenChange: (open: boolean) => void;
  setRedeemingId: (id: string | null) => void;
}

export default function ConfirmRedeemAlertDialog({
  redemptionCandidate,
  onOpenChange,
  setRedeemingId,
}: ConfirmRedeemAlertDialogProps) {
  const routerContext = useRouteContext({ from: "/_authenticated/rewards/" });

  const {
    mutateAsync: createProductVoucherMutateAsync,
    isPending: createProductVoucherIsPending,
  } = useMutation({
    mutationFn: productVouchersService.create,
    onSuccess: () => {
      toast.success("Voucher Redeemed!", {
        description: `You have successfully redeemed ${redemptionCandidate?.name || "Unknown product"}.`,
      });
      onOpenChange(false);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Di malamang error";

      toast.error("Voucher Creation Failed", {
        description: errorMessage,
      });
    },
    onSettled: () => {
      routerContext.queryClient?.invalidateQueries({
        queryKey: productsKeys.all,
      });
      setRedeemingId(null);
    },
  });

  const {
    mutateAsync: createRewardVoucherMutateAsync,
    isPending: createRewardVoucherIsPending,
  } = useMutation({
    mutationFn: rewardVouchersService.create,
    onSuccess: () => {
      toast.success("Reward Voucher Created!", {
        description: `Successfully created voucher for ${redemptionCandidate?.name || "Unknown reward"}.`,
      });
      onOpenChange(false);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Di malamang error";

      toast.error("Voucher Creation Failed", {
        description: errorMessage,
      });
    },
    onSettled: () => {
      routerContext.queryClient?.invalidateQueries({
        queryKey: productsKeys.all,
      });
      setRedeemingId(null);
    },
  });

  const handleConfirmRedemption = async () => {
    if (!redemptionCandidate) return;
    setRedeemingId(redemptionCandidate.id);
    if (redemptionCandidate.type === "product") {
      await createProductVoucherMutateAsync({
        product_id: redemptionCandidate.id,
      });
    } else {
      await createRewardVoucherMutateAsync({
        reward_id: redemptionCandidate.id,
      });
    }
  };

  const isRedeeming =
    createRewardVoucherIsPending || createProductVoucherIsPending;

  return (
    <AlertDialog open={!!redemptionCandidate} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Redemption</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to redeem &quot;
            {redemptionCandidate?.name}&quot;?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full flex flex-row gap-3">
          <AlertDialogCancel className="flex-1" disabled={isRedeeming}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            onClick={handleConfirmRedemption}
            disabled={isRedeeming}
          >
            {isRedeeming ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
