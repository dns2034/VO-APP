"use client";

import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { useBranches } from "@/hooks/useBranches";
import { useSpaceUnits } from "@/hooks/useSpaceUnits";

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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter as FilterIcon, SortAsc, SortDesc } from "lucide-react";

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
  const { bookings, loading, cancelBooking } = useBookings();
  const { spaces } = useSpaces();
  const { branches } = useBranches();
  const { spaceUnits } = useSpaceUnits();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortAscOrder, setSortAscOrder] = useState<boolean>(true);

  if (loading) {
    return (
      <div className="flex items-center h-screen">
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

  // Sort bookings by date (ascending or descending)
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return sortAscOrder
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <main className="sm:p-2 flex-1 flex flex-col h-screen">
        {/* Filter and Sort Row */}
        <div className="flex flex-row items-center justify-end py-2 px-0 gap-2">
          {/* Filter Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="h-9 w-9 flex items-center justify-center rounded-md bg-white border shadow-sm text-gray-700 hover:bg-gray-100 transition"
                aria-label="Filter"
                type="button"
              >
                <FilterIcon className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-2">
              <div className="mb-2 text-xs font-semibold text-gray-700">
                Status Filter
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 text-xs w-full">
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
            </PopoverContent>
          </Popover>
          {/* Sort Button */}
          <button
            className="h-9 w-9 flex items-center justify-center rounded-md bg-white border shadow-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setSortAscOrder((prev) => !prev)}
            type="button"
            aria-label="Sort"
          >
            {sortAscOrder ? (
              <SortAsc className="w-5 h-5" />
            ) : (
              <SortDesc className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto w-full">
          {sortedBookings.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 rounded-lg bg-white">
              <span className="text-lg font-medium">No bookings found.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {sortedBookings.map((booking) => {
                // Use space_unit_id to find the space unit, then the space, then the branch
                const spaceUnit = spaceUnits.find(
                  (su) => su.id === booking.space_unit_id
                );
                const space = spaces.find((s) => s.id === spaceUnit?.space_id);
                const branch = branches.find((b) => b.id === space?.branch_id);
                const spaceName = spaceUnit?.name || "Unknown Space Unit";
                const branchName = branch?.name || "Unknown Branch";

                const dateStr = booking.date
                  ? format(new Date(booking.date), "yyyy-MM-dd")
                  : "";
                const dateStrFull = booking.date
                  ? format(new Date(booking.date), "PPPP")
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
                  <Accordion
                    key={`item-${booking.id}`}
                    type="single"
                    collapsible
                    className="bg-white "
                  >
                    <AccordionItem value={`item-${booking.date}`}>
                      <AccordionTrigger className="py-1 flex items-center w-full rounded-lg">
                        <div className="flex flex-row flex-1 min-w-0 items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base text-primary truncate">
                              {spaceName}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                              <span className="truncate">
                                {dateStr} &middot; {timeStr}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <div className="flex flex-col gap-1 text-xs text-left">
                          <div>
                            <span className="font-medium text-muted-foreground">
                              Date:{" "}
                            </span>
                            <span>{dateStrFull}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">
                              Time:{" "}
                            </span>
                            <span>{timeStr}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">
                              Branch:{" "}
                            </span>
                            <span>{branchName}</span>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">
                              Status:{" "}
                            </span>
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>
                        {(booking.status === "booked" ||
                          booking.status === "pending") && (
                          <div className="flex items-center gap-2 mt-6">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={async () => {
                                if (
                                  confirm(
                                    "Are you sure you want to cancel this booking?"
                                  )
                                ) {
                                  await cancelBooking(booking.id);
                                }
                              }}
                            >
                              Cancel Booking
                            </Button>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          )}
        </div>
        <Pagination className="w-full flex justify-center mt-6">
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
