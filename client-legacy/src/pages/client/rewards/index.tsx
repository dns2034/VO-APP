import { RewardCard } from "@/pages/client/rewards/components/reward-card";
import { RewardsHeader } from "@/pages/client/rewards/components/reward-header";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { type FC, useState } from "react";
import { Outlet } from "react-router-dom";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";
import { formatCurrency } from "@/utils/helper";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import type { TRewardType as TRewardTypeFilter } from "@/lib/types";
import RewardsFilter from "@/pages/client/rewards/components/rewards-filter";
import RewardDetailsDialog from "@/pages/client/rewards/components/reward-details-dialog";
import type { TReward } from "@/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { rewardQueries } from "./queries";
import { creditsQueries, pointsQueries } from "../referral/queries";
import { queryClient } from "@/main";
import { useRedeemRewardMutation } from "./mutations";
import { Gift, Loader } from "lucide-react";

const Rewards: FC = () => {
  const { user } = useAuth();
  const [rewardToRedeem, setRewardToRedeem] = useState<TReward | null>(null);
  const [rewardToView, setRewardToView] = useState<TReward | null>(null);

  const { searchParams } = useSearchParamsHandler();
  const rewardType: TRewardTypeFilter = (searchParams.get("rewardType") ||
    "all") as TRewardTypeFilter;
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const { data: rewardsQueryData, isPending: rewardsQueryIsPending } = useQuery(
    {
      ...rewardQueries.list({ currentPage, pageSize, rewardType }),
    }
  );

  const [creditsQuery, pointsQuery] = useQueries({
    queries: [
      creditsQueries.user({ userId: user?.id as string }),
      pointsQueries.user({ userId: user?.id as string }),
    ],
  });

  const { mutateAsync, isPending: redeemRewardIsPending } =
    useRedeemRewardMutation();

  const points =
    pointsQuery.data?.filter((pd) => pd.status === "ACTIVE").length ?? 0;
  const credits =
    creditsQuery.data?.filter((pd) => pd.status === "ACTIVE").length ?? 0;

  if (pointsQuery.isPending || creditsQuery.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7643ea]" />
      </div>
    );
  }

  const handleConfirmRedeem = async () => {
    if (!rewardToRedeem || !user) return;

    console.log(rewardToRedeem);
    await mutateAsync(
      { userId: user.id, rewardId: rewardToRedeem.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: pointsQueries.user({ userId: user.id as string })
              .queryKey,
          });
          queryClient.invalidateQueries({
            queryKey: creditsQueries.user({ userId: user.id as string })
              .queryKey,
          });

          toast.success("Success", {
            description: "Reward redeemed successfully!",
          });
          setRewardToView(null);
          setRewardToRedeem(null);
        },
        onError: (error) => {
          console.error("Error redeeming reward:", error);
          toast.error("Error", {
            description:
              error instanceof Error
                ? error.message
                : "Failed to redeem reward",
          });
        },
      }
    );
    console.log(rewardToRedeem);
  };

  const canRedeem = (reward: TReward | null) => {
    if (reward?.type === "credits") {
      return credits >= reward?.price;
    }
    if (reward?.type === "points") {
      return points >= reward?.price;
    }
    return false;
  };

  return (
    <>
      <div className="flex items-center w-full md:w-5/6">
        <div className="w-full">
          <RewardsHeader credits={credits} points={points} />
          <RewardsFilter
            rewardType={rewardType}
            totalRewards={rewardsQueryData?.length || 0}
          />

          {rewardsQueryIsPending ? (
            <div className="w-full flex p-6 items-center justify-center">
              <Loader className="animate-spin text-violet-500 size-16" />
            </div>
          ) : (rewardsQueryData?.length || 0) > 0 ? (
            <div className="w-full grid grid-cols-1 gap-3 xl:grid-cols-2">
              {rewardsQueryData?.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  onRedeem={(r) => setRewardToRedeem(r)}
                  canRedeem={canRedeem(reward)}
                  onSelect={(r) => setRewardToView(r)}
                />
              ))}
            </div>
          ) : (
            <EmptyRewards />
          )}

          <Outlet />

          <RewardDetailsDialog
            canRedeem={canRedeem(rewardToView)}
            onOpenChange={() => setRewardToView(null)}
            selectedReward={rewardToView}
            open={!!rewardToView}
            onRedeem={(r) => {
              setRewardToRedeem(r);
            }}
          />

          <CustomAlertDialog
            title="Redeem Reward"
            description={`Are you sure you want to redeem ${
              rewardToRedeem?.name
            } for ${formatCurrency(
              rewardToRedeem?.price || 0,
              rewardToRedeem?.type as TReward["type"]
            )}? This action cannot be undone.`}
            open={!!rewardToRedeem}
            onOpenChange={(open) =>
              !open && !redeemRewardIsPending && setRewardToRedeem(null)
            }
            onConfirm={handleConfirmRedeem}
            confirmText="Confirm Redemption"
            variant="info"
            confirmDisabled={redeemRewardIsPending}
            cancelDisabled={redeemRewardIsPending}
          />
        </div>
      </div>
    </>
  );
};

const EmptyRewards = () => {
  return (
    <div className="w-full flex flex-col gap-3 p-6 items-center justify-center border border-dashed border-muted-foreground/30 bg-muted rounded-lg">
      <Gift className="h-12 w-12 opacity-80" />
      <h3 className="text-xl font-semibold text-center">No Rewards Available</h3>
      <p className="text-muted-foreground text-center">
        There are currently no rewards available for redemption. Check back soon
        as new rewards are added regularly.
      </p>
    </div>
  );
};

export default Rewards;
