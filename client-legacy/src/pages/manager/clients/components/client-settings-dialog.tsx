import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { BlockedList } from "./client-settings-tabs/blocked-list";
import { BookingRules } from "./client-settings-tabs/booking-rules";

type ClientSettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ClientSettingsDialog = ({
  open,
  onOpenChange,
}: ClientSettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-14 md:w-10" size="icon">
          <Settings className="h-4 w-4  text-violet-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] w-11/12 md:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-violet-500" />
            <span>Client Settings</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Configure Client-wide settings and limitations for all clients
          </p>
        </DialogHeader>
        <Tabs defaultValue="blocked-list" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blocked-list">Blocked List</TabsTrigger>
            <TabsTrigger value="booking-rules">Booking Rules</TabsTrigger>
            <TabsTrigger value="booking-duration">Booking Duration</TabsTrigger>
          </TabsList>

          <TabsContent value="blocked-list" className="mt-6">
            <BlockedList />
          </TabsContent>

          <TabsContent value="booking-rules" className="mt-6">
            <BookingRules />
          </TabsContent>
          <TabsContent value="booking-duration" className="mt-6">
            <BookingRules />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
