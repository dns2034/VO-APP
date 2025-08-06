import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CANCELLATION_REASONS } from "@/lib/constants";
import type { CancellationReason } from "@/lib/types";
import { toast } from "sonner";

interface BookingCancellationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (reason: CancellationReason, otherReason: string) => void;
}

const BookingCancellationModal: React.FC<BookingCancellationModalProps> = ({ open, onOpenChange, onConfirm }) => {
  const [reason, setReason] = useState<CancellationReason>(CANCELLATION_REASONS[0].value);
  const [otherReason, setOtherReason] = useState("");

  const handleConfirm = () => {
    if (!reason || (reason === "other" && !otherReason.trim())) {
      toast.error("Please provide a reason before submitting.");
      return;
    }
    if (onConfirm) onConfirm(reason, otherReason);
    toast.success("Booking cancelled successfully.");
    onOpenChange(false);
    setReason(CANCELLATION_REASONS[0].value);
    setOtherReason("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setReason(CANCELLATION_REASONS[0].value);
    setOtherReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Cancellation</DialogTitle>
          <DialogDescription>Provide a reason for cancelling this booking.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for Cancellation</Label>
            <Select value={reason} onValueChange={(value: CancellationReason) => { setReason(value); }}>
              <SelectTrigger id="reason" className="mt-1">
                <SelectValue>{CANCELLATION_REASONS.find(r => r.value === reason)?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CANCELLATION_REASONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="other-reason">Other Reason (please specify)</Label>
            <Textarea
              id="other-reason"
              value={otherReason}
              onChange={e => { setOtherReason(e.target.value); }}
              placeholder="Enter other reason here..."
              disabled={reason !== "other"}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={handleCancel}>Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCancellationModal;
