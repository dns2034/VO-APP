import { useMutation } from "@tanstack/react-query";
import { redeemReward, transferVoucher } from "../../shared/services/rewards-service";

export const useRedeemRewardMutation = () =>
  useMutation({ mutationFn: redeemReward });

export const useTransferVoucherMutation = () =>
  useMutation({ mutationFn: transferVoucher });
