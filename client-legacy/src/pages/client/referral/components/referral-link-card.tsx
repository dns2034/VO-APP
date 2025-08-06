import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Share2Icon,
  Check,
  Copy,
  Facebook,
  Instagram,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";

export default function ReferralLinkCard({
  referralLink,
}: {
  referralLink: string;
}) {
  const shareMessages = {
    title: "Join me on Incub8 Space!",
    description:
      "Sign up using my referral link and earn rewards! Let's build something great together.",
    url: "",
  };

  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const shareToInstagram = () => {
    navigator.clipboard.writeText(
      `${shareMessages.description}\n\n${referralLink}`
    );
    alert("Caption and link copied! You can now paste it on Instagram.");
  };

  const shareToTwitter = () => {
    const params = new URLSearchParams({
      text: shareMessages.description,
      url: referralLink,
    }).toString();

    const url = `https://twitter.com/intent/tweet?${params}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareMessages.title,
          text: shareMessages.description,
          url: referralLink,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
      referralLink
    )}`;
    window.open(url, "_blank", "width=626,height=436");
  };

  const shareButtons = [
    {
      icon: Facebook,
      onClick: shareToFacebook,
      name: "Facebook",
      className: "text-white",
      buttonClass: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      icon: Instagram,
      onClick: shareToInstagram,
      name: "Instagram",
      className: "text-white",
      buttonClass:
        "bg-gradient-to-r from-[#F56040] via-[#E4405F] to-[#833AB4] hover:from-[#D62E56] hover:via-[#C5286E] hover:to-[#6E2B95]",
    },
    {
      icon: XIcon,
      onClick: shareToTwitter,
      name: "X.com",
      className: "text-white",
      buttonClass: "bg-black hover:bg-[#222222]",
    },
    {
      icon: Share2Icon,
      onClick: handleShare,
      name: "Share",
      className: "text-white",
      buttonClass: "bg-gray-500 hover:bg-gray-700",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Share2Icon className="text-[#7643EA] size-5" />
          Your referral link
        </CardTitle>
        <CardDescription>Share this link to invite friends</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full backdrop-blur-xl rounded-xl self-center space-y-4 h-full">
          <div className="space-y-4">
            <div className="flex gap-3 flex-col lg:flex-row">
              <div className="relative w-full">
                <Input
                  value={referralLink}
                  readOnly
                  className="font-mono text-sm "
                />
              
              </div>
              <Button onClick={copyToClipboard}>
                {showCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}{" "}
                {showCopied ? "Copied" : "Copy link"}
              </Button>
            </div>

            <div className="flex gap-3 items-center justify-start">
              <p className="text-sm">Or share via social media:</p>
              <div className="flex gap-3 justify-start flex-wrap items-center">
                {shareButtons.map((button) => (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          key={button.name}
                          onClick={button.onClick}
                          variant="outline"
                          className={cn(
                            button.buttonClass,
                            "hover:scale-105 transition-all"
                          )}
                        >
                          <button.icon
                            className={cn("h-5 w-5", button.className)}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className={cn(button.buttonClass)}>
                        <p className="text-white">{button.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
