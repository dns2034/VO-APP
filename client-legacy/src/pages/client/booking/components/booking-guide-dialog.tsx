import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  CalendarCheck,
  HelpCircle,
  LampDesk,
  Smile,
  Timer,
  UserCheck,
} from "lucide-react";

type TBookingGuideDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BookingGuideDialog({
  open,
  onOpenChange,
}: TBookingGuideDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] sm:w-[90%] sm:max-w-md md:max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <HelpCircle className="h-5 w-5 text-[#7643EA]" />
            How Booking Works
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Simple steps to book your appointment
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
                      <CalendarCheck className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                    </div>
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      1. Pick Date & Time
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Select an available date and time slot that works best for
                      you
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
                      <LampDesk className="h-6 w-6 sm:h-8 sm:w-8 text-violet-600" />
                    </div>
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                      2. Select a Space
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Choose your preferred service location from our available
                      options
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-sidebar-accent/20 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-sidebar-accent" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    3. Select Time
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    When you want a Conference Room you need to select a time
                    and desk doesn't
                  </p>
                </div>
              </div>

              {/* Second row - 2 steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
                {/* Step 4 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    4. Toast Confirmation
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Receive instant confirmation via toast
                  </p>
                </div>

                {/* Step 5 */}
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <Smile className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    5. Enjoy Service
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Arrive at your scheduled time and enjoy your service
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
