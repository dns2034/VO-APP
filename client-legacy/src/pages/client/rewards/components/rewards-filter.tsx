import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { TRewardType } from "@/lib/types";
import { CreditCard, Star, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TRewardsFilter = {
  totalRewards: number;
  rewardType: TRewardType;
};

export default function RewardsFilter({
  totalRewards,
  rewardType,
}: TRewardsFilter) {
  const { updateSearchParam } = useSearchParamsHandler();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border mb-6">
      <div className="w-full p-4 flex flex-col items-start gap-4 md:items-center md:justify-between md:flex-row">
        <div className="w-full flex flex-col items-start gap-4 md:items-center md:flex-row">
          <h2 className="font-medium whitespace-nowrap">Available Rewards</h2>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <div className="w-full flex items-center justify-between gap-3 md:justify-start md:space-x-2 md:gap-0">
            <Button
              variant={rewardType === "all" ? "default" : "outline"}
              size="sm"
              className="w-1/3 md:w-fit"
              onClick={() => updateSearchParam("rewardType", "all")}
            >
              All
            </Button>
            <Button
              variant={rewardType === "credits" ? "default" : "outline"}
              size="sm"
              className="w-1/3 md:w-fit"
              onClick={() => updateSearchParam("rewardType", "credits")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Credits
            </Button>
            <Button
              variant={rewardType === "points" ? "default" : "outline"}
              size="sm"
              className="w-1/3 md:w-fit"
              onClick={() => updateSearchParam("rewardType", "points")}
            >
              <Star className="h-4 w-4 mr-2" />
              Points
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {totalRewards} rewards
          </p>

          <Button
            onClick={() => navigate("/client/rewards/send-vouchers")}
            className="bg-violet-600 hover:bg-violet-700"
            size="sm"
          >
            <Gift className="h-4 w-4 mr-2" />
            Send Voucher
          </Button>
        </div>
      </div>
    </div>
  );
}
