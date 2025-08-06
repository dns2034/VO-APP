import type { CANCELLATION_REASONS , SELECT_OPTIONS, BOOKING_TAB_VIEW, CURRENT_BOOKING_STATUS_FILTER_OPTIONS, HISTORY_BOOKING_STATUS_FILTER_OPTIONS, DOCUMENT_CATEGORY_FILTER_OPTIONS } from "./constants";

export type TSortField = "redeemed_at" | "status" | "date";
export type TSortDirection = "asc" | "desc";
export type TRewardType = "all" | "points" | "credits" 
export type TBookingView = (typeof BOOKING_TAB_VIEW)[number]["value"];
export type TRedemptionStatusFilter = (typeof SELECT_OPTIONS)[number]["value"];
export type TReferralsStatusFilter = "PENDING" | "SUCCESS" | "all";
export type TReferralSortField = "created_at";

export type TCurrentBookingsStatusFilter = (typeof CURRENT_BOOKING_STATUS_FILTER_OPTIONS)[number]["value"];
export type THistoryBookingsStatusFilter = (typeof HISTORY_BOOKING_STATUS_FILTER_OPTIONS)[number]["value"];
export type CancellationReason = typeof CANCELLATION_REASONS[number]["value"];
export type TBookingsStatusFilter = TCurrentBookingsStatusFilter | THistoryBookingsStatusFilter;

export type TUserRole = "Manager" | "Client";
export type TUserStatus = "Activated" | "Deactivated";
export type TUserSortField = "name" | "email" | "role" | "status";
export type TUserStatusFilter = "all" | TUserStatus;
export type TUserRoleFilter = "all" | TUserRole;
export type TPlanStatus = "Active" | "Inactive";
export type TPlanDuration = "Month" | "Quarter" | "Year";
export type TDocumentCategoryFilter = (typeof DOCUMENT_CATEGORY_FILTER_OPTIONS)[number]["value"];

// Booking filter types for resource and status
export type ResourceTypeFilter = "all" | "Meeting Room" | "Desk";
export type StatusFilter = "all" | "Booked" | "Cancelled";

export type TBookingWorkflow = "date" | "resource" | "book";

export type TSearchParamValues = {
  page: string;
  pageSize: string;
  sortField: TSortField;
  sortDirection: TSortDirection;
  redemptionStatusFilter: TRedemptionStatusFilter; 
  rewardType: TRewardType; 
  bookingSortField: TSortField
  bookingsStatusFilter: TBookingsStatusFilter; 
  bookingView: TBookingView;
  referralStatusFilter: TReferralsStatusFilter;
  referralSortField: TReferralSortField;
  referralSortDirection: TSortDirection;

  userStatusFilter: TUserStatusFilter;
  userRoleFilter: TUserRoleFilter;
  userSearchQuery: string;
};
 



