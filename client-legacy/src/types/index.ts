import type { MergeDeep } from "type-fest";
import type { Tables } from "./supabase";

// Availability
export type TAvailability = Tables<"availability">;

// Booking
export type TBooking = Tables<"bookings">;
export type TBookingStatus = Exclude<TBooking["status"], null>;

export type TBookingWithResource = MergeDeep<
  TBooking,
  {
    resource: TResource;
    resource_instance?: TResourceInstance | null;
  }
>;

export type TBookingDetails = Pick<
  TBookingWithResource,
  | "resource"
  | "resource_instance"
  | "date"
  | "end_time"
  | "start_time"
  | "remarks"
>;

// Manager Organization
export type TManagerOrganization = Tables<"manager_organizations">;

// Masked Referral
export type TMaskedReferral = MergeDeep<
  Tables<"masked_referrals">,
  Tables<"referrals">
>;

// Credit
export type TCredit = Tables<"credits">;

// Notification
export type TNotification = Tables<"notifications">;

// Organization
export type TOrganization = Tables<"organizations">;

// Point
export type TPoint = Tables<"points">;

// Redemption
export type TRedemption = Tables<"redemptions">;

export type TRedemptionWithReward = MergeDeep<
  TRedemption,
  {
    reward: TReward;
  }
>;

// Referral
export type TReferral = Tables<"referrals">;

// Resource Instance
export type TResourceInstance = Tables<"resource_instances">;

// Resource
export type TResource = Tables<"resources">;

// Reward
export type TReward = Tables<"rewards">;

// Superadmin User
export type TSuperAdminUser = Tables<"superadmin_users">;

// User Profile
export type TUserProfile = Tables<"user_profiles">;

// User Roles
export const USER_ROLES = {
  CLIENT: "client",
  SUPERADMIN: "superadmin",
  MANAGER: "manager",
} as const;

export type TUserRoleName = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type TUserRole = MergeDeep<
  Tables<"user_roles">,
  {
    name: TUserRoleName;
  }
>;

// Voucher Transaction
export type TVoucherTransaction = Tables<"voucher_transactions">;

// Voucher
export type TVoucher = Tables<"vouchers">;

// Business
export type TBusiness = Tables<"businesses">;


export type Leaderboard = {
  id: number;
  rank: number;
  name: string;
  email: string;
  total: number;
};