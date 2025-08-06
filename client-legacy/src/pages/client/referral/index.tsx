import CreditsDialog from "@/pages/client/referral/components/credits-dialog";
import PointsDialog from "@/pages/client/referral/components/points-dialog";
import ReferralGuideDialog from "@/pages/client/referral/components/referral-guide-section";
import ReferralHeroSection from "@/pages/client/referral/components/referral-hero-section";
import ReferralLinkCard from "@/pages/client/referral/components/referral-link-card";
import ReferralSummaryCard from "@/pages/client/referral/components/referral-summary-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { HelpCircle } from "lucide-react";
import { type FC, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { creditsQueries, pointsQueries, referralQueries } from "./queries";
import type { TPoint, TCredit } from "@/types";

const Referral: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isDialogOpen, setDialogOpen] = useState({
    points: false,
    credits: false,
    guide: false,
  });

  const referralLink = useMemo(
    () =>
      `https://incub8space.com/campaigns/your-business-your-address?referral_code=${user?.referral_code}`,
    [user?.referral_code]
  );

  const [pointsQuery, referralQuery, creditsQuery] = useQueries({
    queries: [
      pointsQueries.user({ userId: user?.id as string }),
      referralQueries.countUser({ userId: user?.id as string }),
      creditsQueries.user({ userId: user?.id as string }),
    ],
  });

  const computePointsCount = (data: TPoint[] | TCredit[]) => {
    return {
      active: data.filter((point) => point.status === "ACTIVE").length,
      used: data.filter((point) => point.status === "USED").length,
      expired: data.filter((point) => point.status === "EXPIRED").length,
    };
  };

  const pointsCounts = pointsQuery.data
    ? computePointsCount(pointsQuery.data)
    : { active: 0, used: 0, expired: 0 };

  const creditsCounts = creditsQuery.data
    ? computePointsCount(creditsQuery.data)
    : { active: 0, used: 0, expired: 0 };
  const totalReferrals = referralQuery.data || 0;

  return (
    <>
      <div className="flex items-center w-full flex-col gap-3 md:w-5/6">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Referral</h1>
            <p className="text-muted-foreground">
              Earn credits and points by inviting your friends
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setDialogOpen((prev) => ({ ...prev, guide: true }))}
          >
            <HelpCircle /> How it Works
          </Button>
        </div>
        <ReferralHeroSection />

        <div className="w-full grid grid-cols-1 gap-y-3 xl:grid-cols-2 xl:gap-x-3">
          <div className="col-span-1">
            <ReferralLinkCard referralLink={referralLink} />
          </div>
          <ReferralSummaryCard
            onPointClick={() =>
              setDialogOpen((prev) => ({ ...prev, points: true }))
            }
            onCreditClick={() =>
              setDialogOpen((prev) => ({ ...prev, credits: true }))
            }
            onReferralClick={() => navigate("my-referrals")}
            creditCounts={creditsCounts}
            pointCounts={pointsCounts}
            totalReferrals={totalReferrals}
            cardClasses="col-span-1"
          />
        </div>
      </div>

      <Outlet />

      <CreditsDialog
        open={isDialogOpen.credits}
        onOpenChange={(open) =>
          setDialogOpen((prev) => ({ ...prev, credits: open }))
        }
        creditCounts={creditsCounts}
      />

      <PointsDialog
        open={isDialogOpen.points}
        onOpenChange={(open) =>
          setDialogOpen((prev) => ({ ...prev, points: open }))
        }
        pointsCounts={pointsCounts}
      />

      <ReferralGuideDialog
        open={isDialogOpen.guide}
        onOpenChange={(open) =>
          setDialogOpen((prev) => ({ ...prev, guide: open }))
        }
      />
    </>
  );
};

export default Referral;
