import ManagerCalendarCard from "./components/manager-calendar-card";
import ManagerAvailableUserCard from "./components/manager-available-user-card";
import ManagerMakeReservationCard from "./components/manage-make-reservation";
import CurrentBookingModal from "./components/current-booking-modal";
import BookingSettingsModal from "./components/booking-settings-modal";

import { Button } from "@/components/ui/button";
import { Calendar, Settings } from "lucide-react";
import { useState } from "react";

const BookingManagement = () => {
  const [isCurrentBookingOpen, setCurrentBookingOpen] = useState(false);
  const [isBookingSettingsOpen, setBookingSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full container px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Booking Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Schedule the right space for every client—efficiently and professionally.
          </p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2 sm:justify-end">
          <Button
            className="w-full sm:w-auto text-white flex items-center gap-2"
            size="sm"
            onClick={() => setCurrentBookingOpen(true)} 
          >
            <Calendar className="w-4 h-4 mr-2" />
            Current Booking
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-gray-300"
            onClick={() => setBookingSettingsOpen(true)}
          >
            <Settings className="w-4 h-4 text-purple-700" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ManagerCalendarCard />
        <ManagerAvailableUserCard />
        <ManagerMakeReservationCard />
      </div>
      <CurrentBookingModal open={isCurrentBookingOpen} onOpenChange={setCurrentBookingOpen} />
      <BookingSettingsModal open={isBookingSettingsOpen} onOpenChange={setBookingSettingsOpen} />
    </div>
  );
};

export default BookingManagement;




