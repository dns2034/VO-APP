import {
  Calendar,
  Clock,
  Loader,
  MapPin,
  MessageSquare,
  LampDesk,
} from "lucide-react"; // Added LampDesk

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { TBookingDetails } from "@/types"; // Ensure this type includes resource_instance_id

// Updated props to match usage in index.tsx
type TBookingDetailsDialogProps = {
  bookingDetails: TBookingDetails | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const BookingDetailsDialog = ({
  bookingDetails,
  onClose,
  onConfirm,
  isLoading,
}: TBookingDetailsDialogProps) => {
  // Determine if the dialog should be open based on bookingDetails
  const open = !!bookingDetails;

  // Handle closing the dialog
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[90%] sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold">
              {/* Show Resource Name only, or derive desk name from ID if needed */}
              {bookingDetails?.resource?.name}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Confirm your booking details
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <div className="space-y-4 py-2">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">Date</p>
              <p className="text-base text-muted-foreground">
                {bookingDetails?.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">Time</p>
              <p className="text-base text-muted-foreground">
                {bookingDetails?.start_time} - {bookingDetails?.end_time}
              </p>
            </div>
          </div>

          {/* Updated Space Type section */}
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">Space Type</p>
              <p className="text-base text-muted-foreground">
                {bookingDetails?.resource?.name}
              </p>
            </div>
          </div>

          {/* Add Desk ID section if it's a desk booking */}
          {/* Display based on resource_instance existence and its id */}
          {bookingDetails?.resource?.name === "Desk" &&
            bookingDetails?.resource_instance?.id && ( // Check resource_instance.id
              <div className="flex items-start gap-3">
                <LampDesk className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-base font-medium leading-none">
                    Selected Desk
                  </p>
                  <p className="text-base text-muted-foreground">
                    {/* Display the instance name */}
                    {bookingDetails.resource_instance?.name}
                  </p>
                </div>
              </div>
            )}

          <div className="flex items-start gap-3">
            <MessageSquare className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium leading-none ">Remarks</p>
              <p className="text-base text-muted-foreground max-w-60 lg:max-w-[22rem] break-words max-h-44 overflow-y-auto">
                {bookingDetails?.remarks || "No remarks provided"}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex justify-between pt-2 w-full">
            {/* Add Cancel Button */}
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm} // Use onConfirm prop
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {isLoading && <Loader className="animate-spin mr-2 h-4 w-4" />}{" "}
              Confirm Booking {/* Use fixed text or pass via prop */}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
