import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser } from "lucide-react";
import { BookingHistory } from "./view-activity-logs-booking-history";
import { RedemptionHistory } from "./view-activity-logs-redemption-history";
import { BookingLimit } from "./view-activity-logs-booking-limit";
import type { TUserProfile } from "@/types";

interface ViewActivityLogsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}

export function ViewActivityLogsDialog({
  open,
  onOpenChange,
  client,
}: ViewActivityLogsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-start flex-col  gap-2">
            <div className="flex items-center gap-2">
              <CircleUser className="text-purple-600 h-8 w-8" />
              <p className="text-2 text-2xl">
                Client Activity Log for {client?.first_name} {client?.last_name}
              </p>
            </div>
            <div>
              <p className="font-normal ">
                View Client Booking History and Redemption History.
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="booking-history" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="booking-history"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Booking History
            </TabsTrigger>
            <TabsTrigger
              value="redemption-history"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Redemption History
            </TabsTrigger>
            <TabsTrigger
              value="booking-limit"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Booking Limit
            </TabsTrigger>
          </TabsList>
          <TabsContent value="booking-history">
            <BookingHistory client={client} />
          </TabsContent>

          <TabsContent value="redemption-history">
            <RedemptionHistory client={client} />
          </TabsContent>

          <TabsContent value="booking-limit">
            <BookingLimit />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
