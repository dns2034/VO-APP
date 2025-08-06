import { queryOptions } from "@tanstack/react-query";
import {
  getResourceInstances,
  getLocationsByOrganization,
} from "../../shared/services/resource-service";
import { getUserProfile } from "../../shared/services/profile-service"; // Import profile service
import { getAvailabilitiesByDate } from "../../shared/services/availability-service";
import {
  getBookingsByDateAndResourceId,
  getUserBookings,
} from "../../shared/services/booking-service";
import type {
  TBookingView,
  TSortField,
  TSortDirection,
  TBookingsStatusFilter,
} from "@/lib/types";

export const resourceQueries = {
  all: () => ["resources"],
  lists: () => [...resourceQueries.all(), "list"],
  list: (filters: unknown) => [...resourceQueries.lists(), { filters }],
  details: () => [...resourceQueries.all(), "details"],
  detail: (id: string) =>
    queryOptions({
      queryKey: [...resourceQueries.details(), id],
      enabled: !!id,
    }),
};

export const resourceInstanceQueries = {
  all: () => ["resourceInstances"],
  lists: () => [...resourceInstanceQueries.all(), "list"],
  list: (resourceId: string) =>
    queryOptions({
      queryKey: [...resourceInstanceQueries.lists(), resourceId],
      queryFn: () => getResourceInstances(resourceId),
      enabled: !!resourceId, // Only fetch if resourceId is provided
    }),
};

// Define locationQueries
export const locationQueries = {
  all: () => ["locations"],
  lists: () => [...locationQueries.all(), "list"],
  listByOrg: (organizationId: string | null | undefined) =>
    queryOptions({
      queryKey: [...locationQueries.lists(), { organizationId }],
      queryFn: () => getLocationsByOrganization(organizationId),
      enabled: !!organizationId, // Only fetch if organizationId is provided
    }),
};

export const availabilityQueries = {
  all: () => ["availabilities"],
  lists: () => [...availabilityQueries.all(), "list"],
  byDate: (date: Date) => {
    return queryOptions({
      queryKey: [...availabilityQueries.lists(), date],
      queryFn: () => getAvailabilitiesByDate({ date }),
      enabled: !!date,
    });
  },
};

type TBookingQueriesUser = {
  userId: string;
  bookingView: TBookingView;
  page: number;
  pageSize: number;
  sortField: TSortField;
  sortDirection: TSortDirection;
  statusFilter: TBookingsStatusFilter;
};

export const bookingQueries = {
  all: () => ["bookings"],
  lists: () => [...availabilityQueries.all(), "list"],
  byDateAndResourceId: ({
    date,
    resourceId,
  }: {
    date: Date;
    resourceId: string;
  }) =>
    queryOptions({
      queryKey: [...bookingQueries.lists(), date, resourceId],
      queryFn: () => getBookingsByDateAndResourceId({ date, resourceId }),
      enabled: !!date && !!resourceId,
    }),

  users: () => [...bookingQueries.all(), "user"],
  user: ({
    userId,
    bookingView,
    page,
    pageSize,
    sortField,
    sortDirection,
    statusFilter,
  }: TBookingQueriesUser) =>
    queryOptions({
      queryKey: [
        ...bookingQueries.users(),
        {
          userId,
          bookingView,
          page,
          pageSize,
          sortField,
          sortDirection,
          statusFilter,
        },
      ],
      queryFn: () =>
        getUserBookings(
          userId,
          bookingView,
          page,
          pageSize,
          sortField,
          sortDirection,
          statusFilter
        ),
      enabled: !!userId && !!bookingView,
    }),
};

// Define profileQueries
export const profileQueries = {
  all: () => ["userProfile"],
  details: () => [...profileQueries.all(), "detail"],
  detail: (userId: string | undefined) =>
    queryOptions({
      queryKey: [...profileQueries.details(), userId],
      queryFn: () => getUserProfile(userId ?? ""), // Add non-null assertion or handle undefined case
      enabled: !!userId, // Only fetch if userId is provided
    }),
};
