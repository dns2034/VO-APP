"use client";
import { useCredits } from "@/hooks/useCredits";
import { usePoints } from "@/hooks/usePoints";
import BottomBar from "@/components/bottom-bar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Facebook, Twitter, Share2, Copy, Instagram, Send } from "lucide-react";

export default function ReferPage() {
  const { credits, loading: loadingCredits } = useCredits();
  const { points, loading: loadingPoints } = usePoints();

  // Count active credits and points
  const activeCredits = credits.filter((c) => c.status === "active").length;
  const activePoints = points.filter((p) => p.status === "active").length;

  // Mock referral link
  const referralLink = "https://incub8space.com/brands/incub8space/";
  const [copied, setCopied] = useState(false);

  // Social share handlers
  const shareText = encodeURIComponent(
    "Join me at Incub8Space! Use my referral link:"
  );
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    referralLink
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
    referralLink
  )}`;
  const instagramShareUrl = "https://www.instagram.com/"; // Instagram does not support direct share links
  const tiktokShareUrl = "https://www.tiktok.com/"; // TikTok does not support direct share links

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex flex-row items-center bg-white text-gray-900 p-4 ">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="font-bold text-lg">Refer</h1>
          <p className="text-xs text-gray-500">
            Refer friends and earn rewards.
          </p>
        </div>
      </header>
      <main className="flex-1 flex flex-col gap-0 p-4 lg:p-6 max-w-2xl w-full mx-auto">
        <div className="flex flex-row gap-4 mb-4">
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-border py-4">
            <span className="text-xs text-muted-foreground">
              Active Credits
            </span>
            <span className="text-2xl font-bold text-primary mt-1">
              {loadingCredits ? "..." : activeCredits}
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg border border-border py-4">
            <span className="text-xs text-muted-foreground">Active Points</span>
            <span className="text-2xl font-bold text-primary mt-1">
              {loadingPoints ? "..." : activePoints}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-border p-4 text-center mb-4">
          <h2 className="font-semibold text-base mb-2">
            Invite, earn exclusive spaces!
          </h2>
          <h2 className="font-semibold text-base mb-2">Invite your friends!</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Share your referral link and earn credits or points when your
            friends join and use Incub8Space.
          </p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Input
              readOnly
              value={referralLink}
              className="flex-1 max-w-xs text-center"
              disabled
            />
            <Button
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              variant="outline"
              aria-label="Copy referral link"
              disabled
              className="opacity-60 cursor-not-allowed"
            >
              {copied ? (
                <Share2 className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center mt-3 opacity-60 pointer-events-none">
            <Button
              asChild
              size="icon"
              variant="outline"
              aria-label="Share on Facebook"
              disabled
              className="cursor-not-allowed"
            >
              <a href={fbShareUrl} target="_blank" rel="noopener noreferrer">
                <Facebook className="w-4 h-4 text-[#1877f3]" />
              </a>
            </Button>
            <Button
              asChild
              size="icon"
              variant="outline"
              aria-label="Share on Twitter"
              disabled
              className="cursor-not-allowed"
            >
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4 text-[#1da1f2]" />
              </a>
            </Button>
            <Button
              asChild
              size="icon"
              variant="outline"
              aria-label="Share on Instagram"
              disabled
              className="cursor-not-allowed"
            >
              <a
                href={instagramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 text-[#e1306c]" />
              </a>
            </Button>
            <Button
              asChild
              size="icon"
              variant="outline"
              aria-label="Share on TikTok"
              disabled
              className="cursor-not-allowed"
            >
              <a
                href={tiktokShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* TikTok does not support direct share, just open homepage */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M16.5 3v2.25A4.25 4.25 0 0020.75 9.5h2.25"
                    stroke="#000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8.5v7a3.5 3.5 0 107-3.5h-2.5"
                    stroke="#000"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Share via native"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: "Join me at Incub8Space!",
                      text: "Use my referral link:",
                      url: referralLink,
                    });
                  } catch {
                    // ignore
                  }
                } else {
                  navigator.clipboard.writeText(referralLink);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }
              }}
              disabled
              className="cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-xs text-primary font-semibold bg-orange-50 px-3 py-1 rounded">
              Coming soon!
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-border p-4 text-center mb-4">
          <h2 className="font-semibold text-base mb-2">
            Discover more rewards!
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Unlock additional benefits by engaging with our platform.
          </p>
          <img
            src="/referral-banner.png"
            alt="Referral Banner"
            className="w-full rounded-lg mb-4"
          />
        </div>
      </main>
      <BottomBar />
    </div>
  );
}
