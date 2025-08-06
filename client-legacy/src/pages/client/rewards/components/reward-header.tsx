import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, History, CreditCard, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RewardsGuidelineDialog from "./rewards-guideline-dialog";

interface RewardsHeaderProps {
  credits: number;
  points: number;
}

export const RewardsHeader = ({ credits, points }: RewardsHeaderProps) => {
  const navigate = useNavigate();
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Rewards</h1>
          <p className="text-muted-foreground">
            Redeem your credits and points for exclusive rewards
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            How it works?
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/client/rewards/my-redemptions?redemptionsPage=1");
            }}
          >
            <History className="h-4 w-4" />
            Redemption History
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-[#7844ec]/5 to-white border-[#7844ec]/15">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#7844ec]" />
              Available Credits
            </CardTitle>
            <CardDescription>
              Use credits for workspace access and amenities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <NumberTicker
                className="text-3xl font-bold text-[#7844ec]"
                value={credits}
              />
              <span className="ml-2 text-sm text-[#7844ec]">credits</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7844ec]/5 to-white border-[#7844ec]/15">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-[#7844ec]" />
              Available Points
            </CardTitle>
            <CardDescription>
              Use points for premium services and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <NumberTicker
                className="text-3xl font-bold text-[#7844ec]"
                value={points}
              />
              <span className="ml-2 text-sm text-[#7844ec]">points</span>
            </div>
          </CardContent>
          <RewardsGuidelineDialog
            open={guideOpen}
            onOpenChange={setGuideOpen}
          />
        </Card>
      </div>
    </>
  );
};

export default RewardsHeader;
