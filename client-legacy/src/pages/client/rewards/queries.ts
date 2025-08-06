import { queryOptions } from "@tanstack/react-query";
import {
  checkIfUserExistsViaEmail,
  getRewards,
  getUserVouchers,
} from "../../shared/services/rewards-service";
import type {
  TRedemptionStatusFilter,
  TRewardType,
  TSortDirection,
  TSortField,
} from "@/lib/types";
import {
  fetchRedemptionCount,
  fetchRedemptions,
} from "../../shared/services/redemption-service";
import type { TVoucher } from "@/types";

export const rewardQueries = {
  all: () => ["reward"] as const,
  lists: () => [...rewardQueries.all(), "list"] as const,
  list: ({
    currentPage,
    pageSize,
    rewardType,
  }: {
    rewardType: TRewardType;
    currentPage: number;
    pageSize: number;
  }) =>
    queryOptions({
      queryKey: [
        ...rewardQueries.lists(),
        { currentPage, pageSize, rewardType },
      ] as const,
      queryFn: () => getRewards({ currentPage, pageSize, rewardType }),
    }),
};

export const redemptionQueries = {
  all: () => ["redemption"] as const,
  lists: () => [...redemptionQueries.all(), "list"] as const,
  users: () => [...redemptionQueries.all(), "user"],
  user: ({
    userId,
    page,
    pageSize,
    sortDirection,
    sortField,
    status,
  }: {
    userId: string;
    page: number;
    pageSize: number;
    status: TRedemptionStatusFilter;
    sortField: TSortField;
    sortDirection: TSortDirection;
  }) =>
    queryOptions({
      queryKey: [
        ...redemptionQueries.users(),
        {
          page,
          pageSize,
          sortDirection,
          sortField,
          status,
        },
      ],
      queryFn: () =>
        fetchRedemptions(
          userId,
          page,
          pageSize,
          sortField,
          sortDirection,
          status
        ),
    }),
  countUser: ({ userId }: { userId: string }) =>
    queryOptions({
      queryKey: [...redemptionQueries.users(), userId],
      queryFn: () => fetchRedemptionCount(userId),
    }),
};

export const voucherQueries = {
  all: () => ["redemption"] as const,
  lists: () => [...redemptionQueries.all(), "list"] as const,
  users: () => [...redemptionQueries.all(), "user"],
  user: ({ userId, status }: { userId: string; status?: TVoucher["status"] }) =>
    queryOptions({
      queryKey: [...voucherQueries.users(), { userId, status }],
      queryFn: () => getUserVouchers({ userId, status }),
      enabled: !!userId,
    }),
};

export const userQueries = {
  checkIfUserExistsViaEmail: ({ email }: { email: string }) =>
    queryOptions({
      queryKey: ["checkIfUserExistsViaEmail", email],
      queryFn: () => checkIfUserExistsViaEmail({ email }),
    }),
};
