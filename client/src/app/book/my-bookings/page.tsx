"use client";

import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Clock, ChevronLeft, Calendar } from "lucide-react";
import { useBranches } from "@/hooks/useBranches";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";
import { CalendarDays, MapPin, Building2 } from "lucide-react";

function formatTimeTo12Hour(time: string): string {
  const match = time.match(/^(\d{2}):(\d{2})/);
  if (!match) return "N/A";
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function Bookings() {
  const { bookings, loading } = useBookings();
  const { spaces } = useSpaces();
  const { branches } = useBranches();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center bg-white text-gray-900 p-4 border-b">
        <a href="/book" className="absolute left-4">
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </a>
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">My Bookings</h1>
          <p className="text-xs text-gray-500">
            View and manage your bookings here.
          </p>
        </div>
      </header>
      <main className="pt-[85px] p-4 flex-1 flex flex-col h-screen">
        <Tabs
          defaultValue="current-bookings"
          className="flex-1 flex flex-col h-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="current-bookings">
              <Clock className="h-4 w-4 mr-2" /> Current Bookings
            </TabsTrigger>
            <TabsTrigger value="booking-history">
              <History className="h-4 w-4 mr-2" /> Booking History
            </TabsTrigger>
          </TabsList>

          {/* Current Bookings Section */}
          <TabsContent
            value="current-bookings"
            className="flex-1 flex flex-col h-full"
          >
            <div className="border rounded-lg w-full flex-1 flex flex-col min-h-0 h-full p-4">
              {bookings
                .filter((booking) => booking.status === "booked")
                .map((booking) => {
                  const space = spaces.find((s) => s.id === booking.space_id);
                  const branch = branches.find(
                    (b) => b.id === space?.branch_id
                  );
                  const spaceName = space?.name || "Unknown Space";
                  const branchName = branch?.name || "Unknown Branch";
                  const dateStr = booking.date
                    ? format(new Date(booking.date), "PPP")
                    : "";
                  let timeStr = "";
                  if (booking.start_time && booking.end_time) {
                    const startMatch =
                      booking.start_time.match(/^(\d{2}:\d{2})/);
                    const endMatch = booking.end_time.match(/^(\d{2}:\d{2})/);
                    if (startMatch && endMatch) {
                      timeStr = `${formatTimeTo12Hour(
                        startMatch[1]
                      )} - ${formatTimeTo12Hour(endMatch[1])}`;
                    } else {
                      timeStr = "N/A";
                    }
                  } else {
                    timeStr = "N/A";
                  }
                  return (
                    <div key={booking.id}>
                      <Accordion type="single" collapsible className="py-0">
                        <AccordionItem value={`item-${booking.id}`}>
                          <AccordionTrigger className="py-3 justify-start">
                            <Calendar className="w-4 h-4 text-black" />
                            {branchName} – {dateStr}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-sm space-y-2 mt-2">
                              <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-primary" />
                                <span className="font-medium">Date:</span>
                                <span>{dateStr}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="font-medium">Time:</span>
                                <span>{timeStr}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="font-medium">Space:</span>
                                <span>{spaceName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-primary" />
                                <span className="font-medium">Branch:</span>
                                <span>{branchName}</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                })}
            </div>
            <Pagination className="w-full flex justify-center mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TabsContent>

          {/* Booking History Section */}
          <TabsContent
            value="booking-history"
            className="flex-1 flex flex-col h-full"
          >
            <div className="border rounded-lg w-full flex-1 flex flex-col min-h-0 h-full">
              <ul>
                {bookings
                  .filter(
                    (booking) =>
                      booking.status === "completed" ||
                      booking.status === "cancelled" ||
                      booking.status === "pending"
                  )
                  .map((booking) => {
                    const space = spaces.find((s) => s.id === booking.space_id);
                    const branch = branches.find(
                      (b) => b.id === space?.branch_id
                    );
                    const spaceName = space?.name || "Unknown Space";
                    const branchName = branch?.name || "Unknown Branch";
                    const dateStr = booking.date
                      ? format(new Date(booking.date), "PPP")
                      : "";
                    let timeStr = "";
                    if (booking.start_time && booking.end_time) {
                      const startMatch =
                        booking.start_time.match(/^(\d{2}:\d{2})/);
                      const endMatch = booking.end_time.match(/^(\d{2}:\d{2})/);
                      if (startMatch && endMatch) {
                        timeStr = `${formatTimeTo12Hour(
                          startMatch[1]
                        )} - ${formatTimeTo12Hour(endMatch[1])}`;
                      } else {
                        timeStr = "N/A";
                      }
                    } else {
                      timeStr = "N/A";
                    }
                    return (
                      <li
                        key={booking.id}
                        className="flex items-center gap-3 mb-2"
                      >
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span>{dateStr}</span>
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{timeStr}</span>
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{spaceName}</span>
                        <Building2 className="w-4 h-4 text-primary" />
                        <span>{branchName}</span>
                      </li>
                    );
                  })}
              </ul>

              <Pagination className="w-full flex justify-center mt-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
