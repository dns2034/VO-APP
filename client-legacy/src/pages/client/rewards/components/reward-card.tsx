import { formatCurrency } from "@/utils/helper";
import { ArrowRight, CreditCard, Gift, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TReward } from "@/types";

interface RewardCardProps {
  reward: TReward;
  onRedeem: (reward: TReward) => void;
  onSelect: (reward: TReward) => void;
  canRedeem: boolean;
}

export const RewardCard = ({
  reward,
  onRedeem,
  canRedeem,
  onSelect,
}: RewardCardProps) => (
	<Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
		<CardContent className="p-0">
			<div className="flex flex-col sm:flex-row">
				<div className="sm:w-1/4 lg:w-1/5">
					{/* Ensure the container has relative positioning and takes full height */}
					<div className="aspect-square sm:aspect-auto sm:h-full relative bg-gray-100">
						{reward.image_url ? (
							<img
								src={reward.image_url || "/placeholder.svg"}
								alt={reward.name}
								// Add classes for object-cover and full size
								className="absolute inset-0 w-full h-full object-cover"
							/>
						) : (
							<div className="absolute inset-0 flex items-center justify-center">
								<Gift className="h-12 w-12 text-gray-300" />
							</div>
						)}
						<Badge
							className={`absolute top-2 left-2 ${
								reward.type === "credits"
									? "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
									: "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
							}`}
						>
							{reward.type === "credits" ? (
								<CreditCard className="h-3 w-3 mr-1" />
							) : (
								<Star className="h-3 w-3 mr-1" />
							)}
							{reward.type === "credits" ? "Credit" : "Points"}
						</Badge>
					</div>
				</div>

				<div className="flex-1 p-4 sm:p-6 flex flex-col">
					<div className="flex items-start justify-between gap-2 mb-2">
						<h3 className="font-medium text-lg">{reward.name}</h3>
						<span
							className={`font-bold ${
								reward.type === "credits"
									? "text-[#7844ec]"
									: "text-[#7844ec]"
							}`}
						>
							{formatCurrency(reward.price, reward.type as "credits" | "points")}
						</span>
					</div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {reward.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(reward)}
                className="gap-1"
              >
                Details
                <ArrowRight className="h-3 w-3" />
              </Button>
							<Button
								size="sm"
								className={`${
									reward.type === "credits"
										? "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
										: "bg-[#7844ec] hover:bg-[#7844ec]/90 text-white"
								}`}
								disabled={!canRedeem}
								onClick={() => onRedeem(reward)}
							>
								<>
									<ShoppingCart className="h-3 w-3 mr-1" />
									Redeem
								</>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default RewardCard;
