import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { CreditCard, Star, Users2, ChartBar } from "lucide-react";

type Count = { active: number; used: number; expired: number };
type ReferralSummaryCardProps = {
  creditCounts: Count;
  pointCounts: Count;
  totalReferrals: number;
  cardClasses?: string;
  onCreditClick: () => void;
  onPointClick: () => void;
  onReferralClick: () => void;
};

export default function ReferralSummaryCard({
  creditCounts = { active: 0, used: 0, expired: 0 },
  pointCounts = { active: 0, used: 0, expired: 0 },
  totalReferrals = 0,
  cardClasses,
  onCreditClick,
  onPointClick,
  onReferralClick,
}: ReferralSummaryCardProps) {
  return (
    <Card className={cardClasses}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-[#7844ec]" />
          Your Stats
        </CardTitle>
        <CardDescription>Crunched data only for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div
            onClick={onCreditClick}
            className="border bg-background rounded-lg p-4 cursor-pointer hover:bg-muted hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5 text-[#7844ec]" />
              <span className="font-medium text-foreground">Credits</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-[#7844ec]">
                <NumberTicker value={creditCounts.active} />
              </span>
              <span className="ml-1 text-sm text-muted-foreground">CR</span>
            </div>
          </div>

          <div
            onClick={onPointClick}
            className="border bg-background rounded-lg p-4 cursor-pointer hover:bg-muted hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-[#7844ec]" />
              <span className="font-medium text-foreground">Points</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-[#7844ec]">
                <NumberTicker value={pointCounts.active} />
              </span>
              <span className="ml-1 text-sm text-muted-foreground">PTS</span>
            </div>
          </div>
          <div
            onClick={onReferralClick}
            className="border bg-background rounded-lg p-4 cursor-pointer hover:bg-muted hover:shadow-md hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users2 className="h-5 w-5 text-[#7844ec]" />
              <span className="font-medium text-foreground">Referrals</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-[#7844ec]">
                <NumberTicker value={totalReferrals} />
              </span>
              <span className="ml-1 text-sm text-muted-foreground">REF</span>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        {/* <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-violet-500" />
              <span className="font-medium">
                Current Tier: {stats.currentTier}
              </span>
            </div>
            <Badge variant="outline" className="font-mono">
              {stats.completedReferrals}/{stats.nextMilestone}
            </Badge>
          </div>

          <Progress value={milestoneProgress} className="h-2" />

          <p className="text-xs text-muted-foreground">
            {stats.nextMilestone - stats.completedReferrals} more referrals to
            reach Bronze tier
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
}
