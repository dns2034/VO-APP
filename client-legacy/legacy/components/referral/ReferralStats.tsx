import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReferralStatsProps {
	totalReferrals: number;
	creditsEarned: number;
	pendingReferrals: number;
}

const ReferralStats: FC<ReferralStatsProps> = ({
	totalReferrals,
	creditsEarned,
	pendingReferrals,
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Card className="w-full">
				<CardHeader className="p-4">
					<CardTitle className="text-gray-500 text-sm">
						Total Referrals
					</CardTitle>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-2xl font-bold">{totalReferrals}</p>
				</CardContent>
			</Card>
			<Card className="w-full">
				<CardHeader className="p-4">
					<CardTitle className="text-gray-500 text-sm">
						Credits Earned
					</CardTitle>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-2xl font-bold">${creditsEarned}</p>
				</CardContent>
			</Card>
			<Card className="w-full">
				<CardHeader className="p-4">
					<CardTitle className="text-gray-500 text-sm">
						Pending Referrals
					</CardTitle>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-2xl font-bold">{pendingReferrals}</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReferralStats;
