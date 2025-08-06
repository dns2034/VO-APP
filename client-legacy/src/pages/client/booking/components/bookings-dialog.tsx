import { format } from "date-fns";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Calendar,
  CalendarDays,
  Clock,
  History,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/contexts/auth-context";
import {
  BOOKING_VIEW_OPTIONS,
  CURRENT_BOOKING_STATUS_FILTER_OPTIONS,
  HISTORY_BOOKING_STATUS_FILTER_OPTIONS,
} from "@/lib/constants";

import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";

import { Textarea } from "@/components/ui/textarea";
import type {
  TBookingsStatusFilter,
  TBookingView,
  TSortDirection,
  TSortField,
} from "@/lib/types";
import { queryClient } from "@/main";
import type { TBookingStatus, TBookingWithResource } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCancelBookingMutation } from "../mutations";
import { bookingQueries } from "../queries";

const statusConfigs: Record<
  TBookingStatus,
  { icon: React.ReactNode; color: string; label: string }
> = {
  BOOKED: {
    icon: <Clock className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800 border border-purple-200",
    label: "Booked",
  },
  ONGOING: {
    icon: <Clock className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800 border border-blue-200",
    label: "Ongoing",
  },
  CANCELLED: {
    icon: <XCircle className="h-4 w-4" />,
    color: "bg-red-100 text-red-800 border border-red-200",
    label: "Cancelled",
  },
  COMPLETED: {
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-green-100 text-green-800 border border-green-200",
    label: "Completed",
  },

  // Change the styles as needed
  EXPIRED: {
    icon: <Calendar className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-800 border border-gray-200",
    label: "Expired",
  },
};

// In bookings-dialog.tsx
const getStatusConfig = (status: string) => {
  const upperStatus = status.toUpperCase() as TBookingStatus;
  return statusConfigs[upperStatus] || statusConfigs.BOOKED;
};

const SortIcon = ({
  field,
  currentField,
  direction,
}: {
  field: TSortField;
  currentField: TSortField;
  direction: TSortDirection;
}) => {
  if (field !== currentField) return null;
  return direction === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5 ml-1 text-[#7844ec]" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5 ml-1 text-[#7844ec]" />
  );
};

export const BookingsDialog = () => {
  const { searchParams, updateSearchParam } = useSearchParamsHandler();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [bookingToCancel, setBookingToCancel] =
    useState<TBookingWithResource | null>(null);

  // Get params
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const sortField =
    (searchParams.get("bookingSortField") as TSortField) || "date";
  const sortDirection =
    (searchParams.get("sortDirection") as TSortDirection) || "desc";

  const activeView =
    (searchParams.get("bookingView") as TBookingView) || "current";

  const statusFilter =
    (searchParams.get("bookingsStatusFilter") as TBookingsStatusFilter) ||
    "all";

  // Handlers
  const handleStatusFilterChange = (value: TBookingsStatusFilter) => {
    updateSearchParam("bookingsStatusFilter", value);
    updateSearchParam("page", "1");
  };

  const handleSortChange = (field: TSortField) => {
    if (sortField === field) {
      updateSearchParam(
        "sortDirection",
        sortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      updateSearchParam("bookingSortField", field);
      updateSearchParam("sortDirection", "asc");
    }
    updateSearchParam("page", "1");
  };

  const handleClose = () => navigate("/client/booking");

  const handleTabChange = (value: TBookingView) => {
    updateSearchParam("bookingView", value);
    updateSearchParam("page", "1");
  };

  const [reason, setReason] = useState<string>("rescheduled");
  const [otherReason, setOtherReason] = useState("");

  const bookingQueryArgs = {
    userId: user?.id as string,
    bookingView: activeView,
    page: currentPage,
    pageSize: pageSize,
    sortField: sortField,
    sortDirection: sortDirection,
    statusFilter: statusFilter,
  };

  const {
    mutateAsync: cancelBookingMutateAsync,
    isPending: cancelBookingIsPending,
  } = useCancelBookingMutation();

  const handleCancelBooking = async (bookingId: string) => {
    await cancelBookingMutateAsync(
      {
        bookingId,
        reason: reason as "rescheduled" | "wrong_booking" | "other",
        remarks: otherReason,
      },
      {
        onSettled: () => {
          setBookingToCancel(null);
          queryClient.invalidateQueries({
            queryKey: bookingQueries.user(bookingQueryArgs).queryKey,
          });
        },
        onSuccess: () => {
          toast.success("Booking Cancelled", {
            description: "Your booking has been successfully cancelled.",
          });
        },
        onError: (err) => {
          toast.error("Cancellation Failed", {
            description:
              err instanceof Error ? err.message : "Could not cancel booking",
          });
          console.error(err);
        },
      }
    );
  };

  const {
    data: bookingQueryData,
    isFetching: bookingQueryIsFetching,
    error: bookingQueryError,
    refetch: bookingQueryRefetch,
  } = useQuery(bookingQueries.user(bookingQueryArgs));

  useEffect(() => {
    if (location.pathname === "/client/booking/my-bookings") {
      bookingQueryRefetch();
    }
  }, [location.pathname, bookingQueryRefetch]);

  return (
    <>
      {/* Booking Cancellation Dialog */}
      <Dialog
        open={!!bookingToCancel}
        onOpenChange={(open) =>
          !open && !cancelBookingIsPending && setBookingToCancel(null)
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Confirm Cancellationss
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            {bookingToCancel && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {bookingToCancel.resource?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {format(new Date(bookingToCancel.date), "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {bookingToCancel.start_time} - {bookingToCancel.end_time}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      getStatusConfig(bookingToCancel.status as TBookingStatus)
                        .color
                    } font-medium px-2 py-0.5`}
                  >
                    {
                      getStatusConfig(bookingToCancel.status as TBookingStatus)
                        .label
                    }
                  </Badge>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reason" className="text-sm font-medium">
                  Reason for Cancellation
                </label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    <SelectItem value="wrong_booking">Wrong Booking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reason === "other" && (
                <div className="space-y-2">
                  <label htmlFor="other-reason" className="text-sm font-medium">
                    Other Reason (please specify)
                  </label>
                  <Textarea
                    id="other-reason"
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                disabled={cancelBookingIsPending}
                variant="outline"
                onClick={() => {
                  setBookingToCancel(null);
                }}
              >
                Go Back
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  if (bookingToCancel) {
                    await handleCancelBooking(bookingToCancel.id);
                  }
                }}
                disabled={cancelBookingIsPending || bookingToCancel === null}
              >
                {cancelBookingIsPending
                  ? "Cancelling..."
                  : "Confirm Cancellation"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Main Bookings Dialog */}
      <Dialog
        open={location.pathname === "/client/booking/my-bookings"}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DialogContent 
          className="w-11/12 md:max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-xl border-0 shadow-none [&>button.absolute.right-4.top-4>svg]:text-white"
        >
          {/* Enhanced header with custom hex color background */}
          <div className="relative bg-[#7844ec] text-white p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
              <div className="absolute top-1/2 -left-8 w-24 h-24 rounded-full bg-[#7844ec]/20 blur-xl"></div>
            </div>

            <DialogHeader className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-lg backdrop-blur-sm">
                  <CalendarDays className="h-6 w-6 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Your Bookings
                </DialogTitle>
              </div>
              <p className="text-sm text-purple-200 mt-2 max-w-md">
                Manage your workspace reservations and booking history
              </p>
            </DialogHeader>
          </div>

          <div className="p-6 bg-muted/30 flex-grow flex flex-col">
            <Tabs
              value={activeView}
              onValueChange={handleTabChange}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full max-w-xs grid-cols-2 p-1 bg-[#7844ec]/10 rounded-lg">
                {BOOKING_VIEW_OPTIONS.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="flex items-center gap-1.5 data-[state=active]:bg-card data-[state=active]:text-[#7844ec] data-[state=active]:shadow-sm text-muted-foreground"
                  >
                    {option.value === "current" ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <History className="h-4 w-4" />
                    )}
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Filter and Sort Controls */}
            <div className="bg-card rounded-xl border shadow-sm p-5 mb-6 transition-all">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#7844ec]/10 p-2 rounded-lg">
                      <SlidersHorizontal className="h-4 w-4 text-[#7844ec]" />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilterChange}
                    >
                      <SelectTrigger className="w-[180px] bg-background border-border focus:bg-background focus:ring-2 focus:ring-[#7844ec]/50">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        {(activeView === "current"
                          ? CURRENT_BOOKING_STATUS_FILTER_OPTIONS
                          : HISTORY_BOOKING_STATUS_FILTER_OPTIONS
                        ).map((option) => (
                          <SelectItem key={option.value} value={option.value} className="focus:bg-[#7844ec]/10">
                            {option.value !== "all" ? (
                              <div className="flex items-center gap-2">
                                {
                                  statusConfigs[
                                    option.value.toUpperCase() as TBookingStatus
                                  ]?.icon
                                }
                                <span>{option.label}</span>
                              </div>
                            ) : (
                              option.label
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange("date")}
                  className="ml-auto cursor-pointer bg-gray-50 border-gray-100 hover:bg-[#7844ec]/10 hover:text-[#7844ec] hover:border-[#7844ec]/30 transition-all"
                >
                  <div className="flex items-center gap-1.5">
                    {sortDirection === "asc" ? (
                      <ArrowUp className="h-3.5 w-3.5 text-[#7844ec]" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-[#7844ec]" />
                    )}
                    <span>Sort by Date</span>
                  </div>
                </Button>
              </div>

              {statusFilter !== "all" && (
                <div className="mt-4 flex items-center">
                  <div className="text-sm text-muted-foreground mr-2 font-medium">
                    Active filters:
                  </div>
                  <Badge
                    className={`${
                      statusConfigs[
                        statusFilter.toUpperCase() as TBookingStatus
                      ]?.color
                    } flex items-center gap-1`}
                    variant="outline"
                  >
                    {
                      statusConfigs[
                        statusFilter.toUpperCase() as TBookingStatus
                      ]?.icon
                    }
                    {
                      (activeView === "current"
                        ? CURRENT_BOOKING_STATUS_FILTER_OPTIONS
                        : HISTORY_BOOKING_STATUS_FILTER_OPTIONS
                      ).find((opt) => opt.value === statusFilter)?.label
                    }
                    {activeView === "current" && (
                      <XCircle
                        className="h-3.5 w-3.5 ml-1.5 cursor-pointer hover:text-[#7844ec] transition-colors"
                        onClick={() => handleStatusFilterChange("all")}
                      />
                    )}
                  </Badge>
                </div>
              )}
            </div>

            {/* Bookings Table */}
            <div className="overflow-y-auto max-h-[calc(85vh-420px)] pr-1 flex-grow"> {/* Adjusted max-h and added flex-grow */
              bookingQueryIsFetching ? (
                <div className="space-y-4 p-4 bg-card rounded-xl border">
                  {Array.from({ length: 3 }).map((_, i) => ( // Changed length to 3 for consistency
                    <Skeleton key={i} className="h-20 w-full rounded-xl bg-muted" /> // Adjusted height
                  ))}
                </div>
              ) : bookingQueryError ? (
                <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle className="h-10 w-10 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 font-medium text-lg mb-1">
                    Failed to load bookings
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => bookingQueryRefetch()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : bookingQueryData?.bookings.length === 0 ? (
                <div className="text-center py-16 bg-muted/50 rounded-xl border h-full flex flex-col justify-center items-center"> {/* Added h-full and flex for centering */}
                  <div className="bg-[#7844ec] p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-sm"> 
                    <CalendarDays className="h-8 w-8 text-white" /> 
                  </div>
                  <p className="text-foreground font-bold text-xl mb-2">
                    {activeView === "current"
                      ? "You don't have any current bookings"
                      : "You don't have any booking history"}
                  </p>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
                    {statusFilter !== "all"
                      ? "Try changing your filter to see more results"
                      : activeView === "current"
                      ? "Reserve your perfect workspace for meetings, focused work, or casual collaborations."
                      : "Your completed and cancelled bookings will appear here."}
                  </p>
                  {activeView === "current" && (
                    <Button
                      className="mt-6 bg-[#7844ec] hover:bg-[#7844ec]/90 text-white gap-2 px-5 py-2 h-auto"
                      onClick={() => navigate("/booking")}
                    >
                      Book a Space
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                      <TableHeader className="bg-[#7844ec]/10">
                        <TableRow>
                          <TableHead className="font-medium text-[#7844ec]">
                            Resource
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:text-[#7844ec]/80 font-medium text-[#7844ec]"
                            onClick={() => handleSortChange("date")} // Corrected sort field
                          >
                            <div className="flex items-center">
                              Date
                              <SortIcon
                                field="date" // Corrected sort field
                                currentField={sortField}
                                direction={sortDirection}
                              />
                            </div>
                          </TableHead>
                          <TableHead className="font-medium text-[#7844ec]">
                            Time
                          </TableHead>
                          <TableHead
                            className="cursor-pointer hover:text-[#7844ec]/80 font-medium text-[#7844ec]"
                            onClick={() => handleSortChange("status")}
                          >
                            <div className="flex items-center">
                              Status
                              <SortIcon
                                field="status"
                                currentField={sortField}
                                direction={sortDirection}
                              />
                            </div>
                          </TableHead>
                          {activeView === "current" && (
                            <TableHead className="text-right font-medium text-[#7844ec]">
                              Actions
                            </TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingQueryData?.bookings.map((booking) => (
                          <TableRow
                            key={booking.id}
                            className="hover:bg-[#7844ec]/5"
                          >
                            <TableCell className="font-medium text-foreground">
                              {booking.resource?.name || "Unknown Space"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {format(new Date(booking.date), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4 text-[#7844ec]" />
                                {`${booking.start_time} - ${booking.end_time}`}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`flex items-center gap-1 ${
                                  getStatusConfig(
                                    booking.status as TBookingStatus
                                  ).color
                                } font-medium px-2.5 py-1`}
                              >
                                {
                                  getStatusConfig(
                                    booking.status as TBookingStatus
                                  ).icon
                                }
                                {
                                  getStatusConfig(
                                    booking.status as TBookingStatus
                                  ).label
                                }
                              </Badge>
                            </TableCell>
                            {activeView === "current" && (
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => setBookingToCancel(booking)}
                                  disabled={
                                    bookingToCancel?.id === booking.id &&
                                    new Date(booking.end_time).getTime() <=
                                      new Date().getTime() &&
                                    booking.status === "BOOKED"
                                  }
                                >
                                  {bookingToCancel?.id === booking.id ? (
                                    "Cancelling..."
                                  ) : (
                                    <>
                                      <XCircle className="h-3.5 w-3.5 mr-1.5" />{" "}
                                      Cancel
                                    </>
                                  )}
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {(bookingQueryData?.totalRecords || 0) > pageSize && (
                    <div className="mt-8 bg-card p-4 rounded-xl border shadow-sm flex-shrink-0">
                      <PaginationWithLinks
                        page={currentPage}
                        pageSize={pageSize}
                        totalCount={bookingQueryData?.totalRecords || 0}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsDialog;
