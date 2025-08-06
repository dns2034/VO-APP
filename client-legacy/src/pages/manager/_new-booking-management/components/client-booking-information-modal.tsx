import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Calendar, Clock, MapPin, Box } from 'lucide-react';
import { toast } from 'sonner';

interface ClientBookingInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClientBookingInfoModal = ({
  open,
  onOpenChange,
}: ClientBookingInfoModalProps) => {
  const handleCheckIn = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    toast.success('Michael Smith: Checked In', {
      description: formattedDate,
      action: {
        label: 'Confirm',
        onClick: () => toast.dismiss(),
      },
      duration: 10000,
      position: 'bottom-right',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Client Booking Information
          </DialogTitle>
          <DialogDescription>
            Scan QR to manage client check-in and check-out records easily.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-4">
          <div className="flex items-start gap-3">
            <User className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-500">Name</p>
              <p className="font-semibold">Michael Smith</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Box className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-500">Space Type</p>
              <p className="font-semibold">Meeting Room</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-500">Date</p>
              <p className="font-semibold">2025-03-28</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-500">Time</p>
              <p className="font-semibold">09:00 - 17:00</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-6 w-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-500">Location</p>
              <p className="font-semibold">Dasma Branch</p>
            </div>
          </div>
        </div>
        <Button className="w-full text-white" size="lg" onClick={handleCheckIn}>
          Check-In
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ClientBookingInfoModal; 