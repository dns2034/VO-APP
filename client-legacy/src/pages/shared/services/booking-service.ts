import supabase from "@/config/supabase-client";
import type {
  TBookingsStatusFilter,
  TBookingView,
  TSortDirection,
  TSortField,
} from "@/lib/types";
import type { TBookingStatus, TBookingWithResource } from "@/types";
import { format } from "date-fns";

const fetchBookingCount = async (
  userId: string,
  bookingView: TBookingView,
  statusFilter: TBookingsStatusFilter
) => {
  let query = supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  query =
    bookingView === "current"
      ? query.in("status", ["BOOKED", "ONGOING"])
      : query.in("status", ["CANCELLED", "COMPLETED"]);

  query =
    statusFilter !== "all"
      ? query.ilike("status", statusFilter.toUpperCase())
      : query;

  query.eq("user_id", userId);

  const { count, error } = await query;
  if (error) throw new Error(error.message);

  return count || 0;
};

const fetchUserBookings = async (
  userId: string,
  page: number,
  pageSize: number,
  bookingView: TBookingView,
  sortField: TSortField,
  sortDirection: TSortDirection,
  statusFilter: TBookingsStatusFilter
) => {
  let query = supabase
    .from("bookings")
    .select("*, resource:resource_id(*)")
    .eq("user_id", userId)
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order(sortField, { ascending: sortDirection === "asc" });

  if (bookingView === "current") {
    query = query.in("status", ["BOOKED", "ONGOING"]);
  } else {
    query = query.in("status", ["CANCELLED", "COMPLETED"]);
  }

  if (statusFilter !== "all") {
    const upperStatus = statusFilter.toUpperCase() as TBookingStatus;
    query = query.eq("status", upperStatus);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
};

export const getUserBookings = async (
  userId: string,
  bookingView: TBookingView,
  page: number,
  pageSize: number,
  sortField: TSortField,
  sortDirection: TSortDirection,
  statusFilter: TBookingsStatusFilter
): Promise<{ bookings: TBookingWithResource[]; totalRecords: number }> => {
  const [totalRecords, bookings] = await Promise.all([
    fetchBookingCount(userId, bookingView, statusFilter),
    fetchUserBookings(
      userId,
      page,
      pageSize,
      bookingView,
      sortField,
      sortDirection,
      statusFilter
    ),
  ]);

  return {
    bookings,
    totalRecords,
  };
};

export const createBooking = async (
  booking: Omit<
    TBookingWithResource,
    "created_at" | "id" | "resource" | "checked_in_at" | "checked_out_at"
  >
) => {
  // Insert the booking directly
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();

  if (error) {
    // Keep error logging if desired for production monitoring
    console.error("Error creating booking:", error);
    // Provide more context if it's a foreign key constraint issue
    if (
      error.message.includes("violates foreign key constraint") &&
      error.message.includes("resource_instance_id")
    ) {
      throw new Error(
        "Failed to create booking: Invalid desk ID provided." // Updated error message
      );
    }
    throw new Error(`Failed to create booking: ${error.message}`);
  }

  return data;
};

export const cancelBooking = async ({
  bookingId,
  reason,
  remarks,
}: {
  bookingId: string;
  reason: "rescheduled" | "wrong_booking" | "other";
  remarks?: string;
}) => {
  const { error } = await supabase.rpc("handle_cancel_booking", {
    p_booking_id: bookingId,
    p_reason: reason,
    p_remarks: remarks,
  });

  console.log(error, "rpc");

  if (error) throw error;
};

export const getBookingsByDateAndResourceId = async ({
  date,
  resourceId,
}: {
  date: Date;
  resourceId: string;
}) => {
  const query = supabase
    .from("bookings")
    .select("*, resources:resource_id(*)")
    .eq("resource_id", resourceId)
    .neq("status", "CANCELLED")
    .neq("status", "COMPLETED");

  if (date !== undefined) {
    query.eq("date", format(date, "yyyy-MM-dd"));
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
};

export async function getBookingHistory(
  date: {
    from?: Date;
    to?: Date;
  },
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  },
  user_id: string
) {
  if (user_id !== "all") {
    const { data, error, count } = await supabase
      .from("client_booking_history")
      .select("*", { count: "exact" })
      .eq("user_id", user_id)
      .gte("date", date.from?.toISOString())
      .lte("date", date.to?.toISOString())
      .range((page - 1) * pageSize, page * pageSize - 1);

    return {
      data,
      count,
      error,
    };
  }

  const { data, error, count } = await supabase
    .from("client_booking_history")
    .select("*", { count: "exact" })
    .gte("date", date.from?.toISOString())
    .lte("date", date.to?.toISOString())
    .range((page - 1) * pageSize, page * pageSize - 1);

  return {
    data,
    count,
    error,
  };
}
