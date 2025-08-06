import { Badge } from "@/components/ui/badge";
import { Gift, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Link } from "react-router-dom";

const ReferralHeroSection = () => {
  return (
    <div className="w-full">
      <div className="w-full border flex flex-col items-center gap-10 justify-center lg:justify-between lg:flex-row rounded-lg p-8 bg-[#7844ec] lg:p-12">
        <div className="w-full flex flex-col gap-3 lg:w-1/2">
          <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm w-fit">
            Referral Program
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-white whitespace-nowrap">
            Invite your friends!
          </h1>

          <h3 className="text-base text-white md:text-xl">
            Share the workspace experience with friends and colleagues. When
            they join, you get rewarded.
          </h3>
        </div>

        <div className="w-full flex gap-3 flex-col md:flex-row lg:w-1/2">
          <div className="w-full bg-white/10 backdrop-blur-3xl rounded-lg p-4 h-min flex-1 md:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-[#7844ec]" />
              <span className="font-medium text-white">For You</span>
            </div>
            <p className="text-white/90 text-sm">
              Receive 1{" "}
              <span className="text-white font-bold drop-shadow-md">
                Credit
              </span>{" "}
              as a reward for each successful referral
            </p>
          </div>

          <Link className="w-full group md:w-1/2" to={"/client/rewards"}>
            <div className="bg-white/10 backdrop-blur-3xl rounded-lg p-4 flex-1 relative transition-all group-hover:bg-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[#7844ec]" />
                <span className="font-medium text-white">Redeem</span>
              </div>
              <p className="text-white/90 text-sm">
                Use your earned{" "}
                <span className="text-white font-bold drop-shadow-md">
                  Credits
                </span>{" "}
                to redeem rewards and earn points
              </p>
              <BorderBeam
                duration={20}
                size={100}
                colorFrom="#32FFA8"
                colorTo="white"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferralHeroSection;
