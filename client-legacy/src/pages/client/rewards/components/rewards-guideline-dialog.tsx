import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Gift, Star, HelpCircle, Zap, CheckCircle, Award } from "lucide-react"

type TRewardsGuidelineDialog = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RewardsGuidelineDialog({ open, onOpenChange }: TRewardsGuidelineDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] sm:w-[90%] sm:max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
      <DialogHeader className="space-y-1.5">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <HelpCircle className="h-5 w-5 text-[#7643EA]" />
            How Rewards Work
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Simple steps to earn and redeem rewards
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="space-y-6 sm:space-y-8">
              {/* First row - 3 steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Step 1 */}
                <div className="relative">
                  {/* Connector line - visible only on md and up */}
                  <div className="hidden md:block absolute top-8 left-full w-16 h-0.5 bg-violet-200 -translate-x-8"></div>

                  {/* Mobile connector - visible only on sm */}
                  <div className="hidden sm:block md:hidden absolute top-full left-1/2 h-6 w-0.5 bg-violet-200 -translate-x-1/2"></div>

                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                      <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                    </div>
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">1. Earn Points/Credits</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Send your referral code to earn reward points or credits
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  {/* Connector line - visible only on md and up */}
                  <div className="hidden md:block absolute top-8 left-full w-16 h-0.5 bg-violet-200 -translate-x-8"></div>

                  {/* Mobile connector - visible only on sm */}
                  <div className="hidden sm:block md:hidden absolute top-full left-1/2 h-6 w-0.5 bg-violet-200 -translate-x-1/2"></div>

                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-violet-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                      <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-violet-600" />
                    </div>
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">2. Browse Rewards</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Explore available rewards in points or credits categories
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">3. Select Reward</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Choose the reward you want based on your available balance
                  </p>
                </div>
              </div>

              {/* Second row - 2 steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
                {/* Step 4 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">4. Confirm Redemption</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Review and confirm your reward redemption</p>
                </div>

                {/* Step 5 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-purple-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">5. Enjoy Benefits</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Use your redeemed reward and enjoy the benefits
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

