import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRedemptionWithReward } from "@/types"; // Changed from @/types/redemption
import { Clock, CheckCircle2, Ban } from "lucide-react";

interface IRedemptionCardProps {
	redemption: TRedemptionWithReward;
}

const getRedemptionStatusConfig = (
	status: TRedemptionWithReward["status"],
	expiresAt?: string
) => {
	// Added optional expiresAt
	if (expiresAt) {
		const isExpired = new Date(expiresAt) < new Date();
		if (
			isExpired &&
			status.toUpperCase() !== "USED" &&
			status.toUpperCase() !== "CANCELLED"
		) {
			// Check if expired and not already used/cancelled
			return {
				icon: <Ban className="h-3 w-3" />,
				color: "bg-red-100 text-red-800 border border-red-200",
				label: "Expired",
			};
		}
	}

	switch (status.toUpperCase()) {
		case "PENDING":
			return {
				icon: <Clock className="h-3 w-3" />,
				color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
				label: "Pending",
			};
		case "COMPLETED":
		case "DELIVERED":
		case "ACTIVE":
			return {
				icon: <CheckCircle2 className="h-3 w-3" />,
				color: "bg-green-100 text-green-800 border border-green-200",
				label: "Active",
			};
		case "USED":
			return {
				icon: <CheckCircle2 className="h-3 w-3" />,
				color: "bg-gray-100 text-gray-800 border border-gray-200",
				label: "Used",
			};
		case "CANCELLED":
			return {
				icon: <Ban className="h-3 w-3" />,
				color: "bg-red-100 text-red-800 border border-red-200",
				label: "Cancelled",
			};
		default:
			return {
				icon: <></>,
				color: "bg-gray-100 text-gray-800 border border-gray-200",
				label: status,
			};
	}
};

const RedemptionCard = ({ redemption }: IRedemptionCardProps) => {
	const statusConfig = getRedemptionStatusConfig(
		redemption.status,
		redemption.expires_at
	);

	return (
		<Card key={redemption.id} className="p-4">
			<div className="flex justify-between items-center">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="font-semibold text-md text-foreground flex items-center gap-2">
							{redemption.reward?.name}
							<Badge
								className={`flex items-center gap-1 ${statusConfig.color} font-medium px-2 py-0.5 text-xs`}
							>
								{statusConfig.icon}
								{statusConfig.label}
							</Badge>
						</h3>
					</div>
					<p className="text-sm text-gray-500">
						Voucher: {redemption.voucher_code}
					</p>
				</div>
				<div className="text-right">
					<p className="text-sm text-gray-500">
						Redeemed on{" "}
						{new Date(redemption.redeemed_at || "").toLocaleDateString()}
					</p>
					<p className="text-sm font-semibold text-primary">
						{/* {formatCurrency(redemption.price_at_redemption, redemption.reward.type)} */}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default RedemptionCard;
