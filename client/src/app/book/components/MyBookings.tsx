"use client";

import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { useBranches } from "@/hooks/useBranches";
import { useSpaceUnits } from "@/hooks/useSpaceUnits";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
import {
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 6;

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
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  if (loading) {
    return (
      <div className="flex items-center">
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

  // Filter bookings by search
  const searchedBookings = bookings.filter((booking) => {
    if (!search.trim()) return true;
    // Search by space name, branch name, or remarks
    const spaceUnit = spaceUnits.find((su) => su.id === booking.space_unit_id);
    const space = spaces.find((s) => s.id === spaceUnit?.space_id);
    const branch = branches.find((b) => b.id === space?.branch_id);
    const spaceName = spaceUnit?.name || "";
    const branchName = branch?.name || "";
    const remarks = booking.remarks || "";
    return (
      spaceName.toLowerCase().includes(search.toLowerCase()) ||
      branchName.toLowerCase().includes(search.toLowerCase()) ||
      remarks.toLowerCase().includes(search.toLowerCase())
    );
  });

  const filteredBookings =
    statusFilter === "all"
      ? searchedBookings
      : searchedBookings.filter((booking) => booking.status === statusFilter);

  // Sort bookings by date (ascending or descending)
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return sortAscOrder
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sortedBookings.length / PAGE_SIZE));
  const paginated = sortedBookings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col gap-0 lg:p-6 max-w-2xl w-full mx-auto">
        {/* Search, Filter, Sort Row */}
        <div className="flex flex-row items-center justify-between gap-2 w-full mb-4">
          <Input
            type="search"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-xs"
          />
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="h-9 w-9 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 transition"
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
          <button
            className="h-9 w-9 flex items-center justify-center  bg-white text-gray-700 hover:bg-gray-100 transition"
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
        <Accordion type="single" collapsible className="w-full overflow-hidden">
          {paginated.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No bookings found.
            </div>
          )}
          {paginated.map((booking, idx) => {
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
              <AccordionItem
                key={booking.id}
                value={booking.id}
                className={
                  idx !== paginated.length - 1 ? "border-b border-border" : ""
                }
              >
                <AccordionTrigger className="py-3 px-2 flex items-center w-full rounded-none hover:bg-muted/40 transition-none">
                  <div className="flex flex-row flex-1 items-center gap-2 min-w-0">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-primary truncate flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {spaceName}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                        <span className="truncate">
                          {dateStr} • {timeStr}
                          {branchName ? ` • ${branchName}` : ""}
                        </span>
                        <span className="capitalize">{booking.status}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4 pt-2">
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
                    {booking.remarks && (
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Remarks:{" "}
                        </span>
                        <span>{booking.remarks}</span>
                      </div>
                    )}
                  </div>
                  {(booking.status === "booked" ||
                    booking.status === "pending") && (
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        className="bg-primary text-white text-xs"
                        onClick={async () => {
                          if (
                            confirm(
                              "Are you sure you want to cancel this booking?"
                            )
                          ) {
                            await cancelBooking(booking.id);
                          }
                        }}
                        title="Cancel Booking"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        {totalPages > 1 && (
          <Pagination className="justify-center mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
}
