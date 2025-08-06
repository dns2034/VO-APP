import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TReward } from "@/types";
import { formatCurrency } from "@/utils/helper";
import { CreditCard, Gift, Plus, Star } from "lucide-react";

type TRewardDetailsDialogProps = {
  selectedReward: TReward | null;
  onOpenChange: () => void;
  open: boolean;
  canRedeem: boolean;
  onRedeem: (selectedReward: TReward) => void;
};

export default function RewardDetailsDialog({
  selectedReward,
  onOpenChange,
  open,
  canRedeem,
  onRedeem,
}: TRewardDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {selectedReward && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedReward.type === "credits" ? (
                  <CreditCard className="h-5 w-5 text-[#7844ec]" />
                ) : (
                  <Star className="h-5 w-5 text-[#7844ec]" />
                )}
                {selectedReward.name}
              </DialogTitle>
              <DialogDescription>
                {selectedReward.type === "credits"
                  ? "Credit Reward"
                  : "Point Reward"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="aspect-video relative bg-gray-100 rounded-md overflow-hidden">
                {selectedReward.image_url ? (
                  <img
                    src={selectedReward.image_url || "/placeholder.svg"}
                    alt={selectedReward.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gift className="h-12 w-12 text-gray-300" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedReward.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Price</h3>
                  <p className="text-lg font-bold mt-1">
                    {formatCurrency(
                      selectedReward.price,
                      selectedReward.type as TReward["type"]
                    )}
                  </p>
                </div>

                <Button
                  className={`${
                    selectedReward.type === "credits"
                      ? "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
                      : "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
                  }`}
                  disabled={!canRedeem}
                  onClick={() => onRedeem(selectedReward)}
                >
                  {canRedeem ? (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Redeem Now
                    </>
                  ) : (
                    <>Insufficient balance</>
                  )}
                </Button>
              </div>

              {/* <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  Added{" "}
                  {new Date(
                    selectedReward.created_at || ""
                  ).toLocaleDateString()}
                </span>
              </div> */}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
