export const BOOKING_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "booked", label: "Booked" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const SELECT_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "used", label: "Used" },
  { value: "expired", label: "Expired" },
  { value: "pending", label: "Pending" },
] as const;

// View options for bookings
export const BOOKING_VIEW_OPTIONS = [
  {
    value: "current",
    label: "Current Bookings",
    defaultSort: "date",
    defaultPageSize: 5,
  },
  {
    value: "history",
    label: "Booking History",
    defaultSort: "date",
    defaultPageSize: 10,
  },
] as const;

export const BOOKING_TAB_VIEW = [
  {
    value: "current",
    label: "Current",
  },
  {
    value: "history",
    label: "History",
  },
];


export const CURRENT_BOOKING_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "booked", label: "Booked" },
  { value: "ongoing", label: "Ongoing" },
] as const;

export const HISTORY_BOOKING_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;


export const USER_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "Activated", label: "Activated" },
  { value: "Deactivated", label: "Deactivated" },
] as const;

export const USER_ROLE_FILTER_OPTIONS = [
  { value: "all", label: "All Roles" },
  { value: "Manager", label: "Manager" },
  { value: "Client", label: "Client" },
] as const;

export const USER_SORT_FIELD_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "role", label: "Role" },
  { value: "status", label: "Status" },
] as const;

export const DOCUMENT_CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "All Category" },
  { value: "Contract", label: "Contract" },
  { value: "Document", label: "Document" },
  { value: "Permit", label: "Permit" },
] as const;

import type { ResourceTypeFilter, StatusFilter } from "./types";

export const RESOURCE_TYPE_OPTIONS: { value: ResourceTypeFilter; label: string }[] = [
  { value: "all", label: "All Resource" },
  { value: "Meeting Room", label: "Meeting Room" },
  { value: "Desk", label: "Desk" },
];

export const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "Booked", label: "Booked" },
  { value: "Cancelled", label: "Cancelled" },
];

export const CANCELLATION_REASONS = [
  { value: "rescheduled", label: "Rescheduled" },
  { value: "client_request", label: "Client Request" },
  { value: "no_show", label: "No Show" },
  { value: "other", label: "Other" },
] as const;