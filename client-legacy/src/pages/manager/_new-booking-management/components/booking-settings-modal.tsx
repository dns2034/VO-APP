import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingSettingsTabs from "./booking-settings-tabs";
import { Settings } from "lucide-react";

interface BookingSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingSettingsModal: React.FC<BookingSettingsModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-96 md:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Settings className="h-5 w-5"/>Booking Settings</DialogTitle>
        </DialogHeader>
        <BookingSettingsTabs />
      </DialogContent>
    </Dialog>
  );
};

export default BookingSettingsModal; 