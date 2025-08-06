import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Gift, HelpCircle, Share2, Users } from "lucide-react";

type TReferralGuideDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReferralGuideDialog({
  open,
  onOpenChange,
}: TReferralGuideDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] sm:w-[90%] sm:max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
      <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#7643EA] " />
            How it works
          </DialogTitle>
          <DialogDescription>
            Simple steps to refer friends and earn rewards
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative">
                  <div className="hidden md:block absolute top-8 left-full w-16 h-0.5 bg-violet-200 -translate-x-8"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-violet-100 mx-auto flex items-center justify-center mb-4">
                      <Share2 className="h-8 w-8 text-violet-600" />
                    </div>
                    <h4 className="font-medium mb-2">1. Share Your Link</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your unique referral link with friends via email,
                      social media, or messaging apps
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="hidden md:block absolute top-8 left-full w-16 h-0.5 bg-violet-200 -translate-x-8"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 mx-auto flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-amber-600" />
                    </div>
                    <h4 className="font-medium mb-2">
                      2. Friend Avails Service
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      When your friend signs up using your link, we'll contact
                      them and ask if they will avail any of our services
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-sidebar-accent/20 mx-auto flex items-center justify-center mb-4">
                    <Gift className="h-8 w-8 text-sidebar-accent" />
                  </div>
                  <h4 className="font-medium mb-2">3. Get Rewarded</h4>
                  <p className="text-sm text-muted-foreground">
                    Once they complete their first booking, you receive 1
                    credit. Easy peasy!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
