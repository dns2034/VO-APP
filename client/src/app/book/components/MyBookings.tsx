"use client";

import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { useBranches } from "@/hooks/useBranches";
import {
  Pagination,
  PaginationContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays, MapPin, Building2, Calendar, Clock } from "lucide-react";
import { useState } from "react";

function formatTimeTo12Hour(time: string): string {
  const match = time.match(/^(\d{2}):(\d{2})/);
  if (!match) return "N/A";
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function MyBookings() {
  const { bookings, loading } = useBookings();
  const { spaces } = useSpaces();
  const { branches } = useBranches();

  const [statusFilter, setStatusFilter] = useState<string>("all");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="inline-block h-10 w-10 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === statusFilter);

  return (
    <>
      <main className="p-4 flex-1 flex flex-col h-screen">
        {/* Filter */}
        <div className="mb-4 flex gap-2 items-center">
          <span className="text-sm font-medium">Filter:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="no-show">No-show</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Bookings List */}
        <div className="border rounded-lg w-full flex-1 flex flex-col min-h-0 h-full p-2 sm:p-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No bookings found.
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const space = spaces.find((s) => s.id === booking.space_id);
              const branch = branches.find((b) => b.id === space?.branch_id);
              const spaceName = space?.name || "Unknown Space";
              const branchName = branch?.name || "Unknown Branch";
              const dateStr = booking.date
                ? format(new Date(booking.date), "P")
                : "";
              let timeStr = "";
              if (booking.start_time && booking.end_time) {
                const startMatch = booking.start_time.match(/^(\d{2}:\d{2})/);
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
                <div key={booking.id} className="flex mb-2">
                  <Accordion type="single" collapsible className="py-0 flex-1">
                    <AccordionItem value={`item-${booking.id}`}>
                      <AccordionTrigger className="py-3 flex items-center w-full">
                        <Calendar className="w-4 h-4 text-black mr-2" />
                        <span className="flex-1 text-left">
                          {spaceName} – {dateStr}
                        </span>
                        <span className="ml-2 text-xs capitalize text-muted-foreground">
                          {booking.status}
                        </span>
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
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })
          )}
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
      </main>
    </>
  );
}
