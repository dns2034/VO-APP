import { queryOptions } from "@tanstack/react-query";
import { getClientPoints } from "../../shared/services/points-service";
import {
  getClientMaskedReferrals,
  getClientReferralCount,
} from "../../shared/services/referral-service";
import type { TReferralSortField, TSortDirection } from "@/lib/types";
import type { TReferral } from "@/types";
import { getClientCreditsByUserId } from "@/pages/shared/services/credits-service";

export type TMaskedUserQueryProps = {
  userId: string;
  pathname: string;
  options: {
    page: number;
    pageSize: number;
    status?: TReferral["status"];
    sortField: TReferralSortField;
    sortDirection: TSortDirection;
  };
};

export const pointsQueries = {
  all: () => ["points"],
  lists: () => [...pointsQueries.all(), "list"],
  users: () => [...pointsQueries.all(), "user"],
  user: ({ userId }: { userId: string }) =>
    queryOptions({
      queryKey: [...pointsQueries.users(), userId],
      queryFn: () => getClientPoints(userId),
      enabled: !!userId,
    }),
} as const;

export const referralQueries = {
  all: () => ["referral"],
  lists: () => [...referralQueries.all(), "list"],
  users: () => [...referralQueries.all(), "user"],
  countUser: ({ userId }: { userId: string }) =>
    queryOptions({
      queryKey: [...referralQueries.users(), userId],
      queryFn: () => getClientReferralCount(userId),
      enabled: !!userId,
    }),
  maskedUser: ({
    userId,
    pathname,
    options: { page, pageSize, sortDirection, sortField, status },
  }: TMaskedUserQueryProps) =>
    queryOptions({
      queryKey: [
        ...referralQueries.users(),
        "masked",
        userId,
        page,
        pageSize,
        sortDirection,
        sortField,
        status,
      ],
      queryFn: () =>
        getClientMaskedReferrals({
          userId,
          options: { page, pageSize, sortDirection, sortField, status },
        }),
      enabled: !!userId && pathname === "/client/referral/my-referrals",
    }),
} as const;

export const creditsQueries = {
  all: () => ["credit"],
  lists: () => [...creditsQueries.all(), "list"],
  users: () => [...creditsQueries.all(), "user"],
  user: ({ userId }: { userId: string }) =>
    queryOptions({
      queryKey: [...creditsQueries.users(), userId],
      queryFn: () => getClientCreditsByUserId(userId),
      enabled: !!userId,
    }),
} as const;
