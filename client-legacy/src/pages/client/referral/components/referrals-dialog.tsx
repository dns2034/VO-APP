"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import {
  Users,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  AlertCircle,
  XCircle,
  UserPlus,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  TReferralSortField,
  TReferralsStatusFilter,
  TSortDirection,
} from "@/lib/types";
import type { TMaskedReferral, TReferral } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { referralQueries } from "../queries";

const ReferralsDialog = () => {
  const { searchParams, updateSearchParam } = useSearchParamsHandler();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;
  const statusFilter =
    (searchParams.get("referralStatusFilter") as TReferralsStatusFilter) ||
    "all";
  const sortField =
    (searchParams.get("referralSortField") as TReferralSortField) ||
    "created_at";
  const sortDirection =
    (searchParams.get("referralSortDirection") as TSortDirection) || "desc";

  const { data, isPending, error, refetch } = useQuery(
    referralQueries.maskedUser({
      userId: user?.id as string,
      pathname: location.pathname,
      options: {
        page: currentPage,
        pageSize,
        status: statusFilter === "all" ? undefined : statusFilter,
        sortField,
        sortDirection,
      },
    })
  );

  const handleStatusFilterChange = (value: TReferralsStatusFilter) => {
    updateSearchParam("referralStatusFilter", value);
    updateSearchParam("page", "1");
  };

  const handleSortChange = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    updateSearchParam("referralSortDirection", newDirection);
    updateSearchParam("page", "1");
  };

  const getStatusConfig = (status: TReferral["status"]) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-yellow-100 text-yellow-800 border border-yellow-200",
          label: "Pending",
        };
      case "SUCCESS":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          color: "bg-green-100 text-green-800 border border-green-200",
          label: "Success",
        };
    }
  };

  return (
    <Dialog
      open={location.pathname === "/client/referral/my-referrals"}
      onOpenChange={(open) => !open && navigate("/client/referral")}
    >
      <DialogContent 
        className="w-11/12 md:max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-xl border-0 shadow-none [&>button]:opacity-100 [&>button_svg]:text-white"
      >
        {/* Updated header to match redemption dialog */}
        <div className="bg-[#7844ec] text-white p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Users className="h-5 w-5" /> Your Referrals
            </DialogTitle>
            <p className="text-sm text-gray-200 mt-1 font-normal">
              Manage your referrals and earn more
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 flex flex-col flex-grow bg-muted/30"> {/* Added flex-grow and bg-muted/30 for consistency if needed, or remove bg-muted/30 if content bg is white */}
          {/* Updated filter and sort controls to match redemption dialog */}
          <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#7844ec]/10 p-2 rounded-lg"> {/* Kept original icon style as it's specific to referrals */}
                  <SlidersHorizontal className="h-4 w-4 text-[#7844ec]" />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(value) =>
                    handleStatusFilterChange(value as TReferralsStatusFilter)
                  }
                >
                  <SelectTrigger className="w-[180px] bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-[#7844ec]/50">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="focus:bg-[#7844ec]/10">
                      All Statuses
                    </SelectItem>
                    <SelectItem value="SUCCESS" className="focus:bg-[#7844ec]/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Success</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="PENDING" className="focus:bg-[#7844ec]/10">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span>Pending</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSortChange}
                className="ml-auto cursor-pointer bg-gray-50 border-gray-100 hover:bg-[#7844ec]/10 hover:text-[#7844ec] hover:border-[#7844ec]/30 transition-all text-black"
              >
                {sortDirection === "asc" ? (
                  <div className="flex items-center gap-1.5">
                    <ArrowUp className="h-3.5 w-3.5 text-[#7844ec]" />
                    <span>Oldest first</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <ArrowDown className="h-3.5 w-3.5 text-[#7844ec]" />
                    <span>Latest first</span>
                  </div>
                )}
              </Button>
            </div>

            {statusFilter !== "all" && (
              <div className="mt-3 flex items-center">
                <div className="text-sm text-black mr-2 font-medium">
                  Active filters:
                </div>
                <Badge
                  className={`${
                    getStatusConfig(statusFilter).color // Keep dynamic color for referral status
                  } flex items-center gap-1 px-3 py-1.5 border`} // Added border for consistency
                  variant="outline"
                >
                  {getStatusConfig(statusFilter).icon}
                  {getStatusConfig(statusFilter).label}
                  <XCircle
                    className="h-3.5 w-3.5 ml-1.5 cursor-pointer hover:text-[#7844ec] transition-colors"
                    onClick={() => handleStatusFilterChange("all")}
                  />
                </Badge>
              </div>
            )}
          </div>

          {/* Updated Referrals List styling */}
          <div className="overflow-y-auto flex-grow min-h-[250px] border border-border rounded-lg bg-white"> {/* Added bg-white if list items don't have their own bg */}
            {isPending ? (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg h-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg bg-muted" />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 bg-red-50 rounded-lg">
                <AlertCircle className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <p className="text-red-600 font-medium text-lg mb-1">
                  {error.message}
                </p>
                <p className="text-red-500 text-sm mb-4">
                  Unable to load your referrals at this time
                </p>
                <Button
                  variant="outline"
                  className="mt-2 border-red-200 text-red-600 hover:bg-red-50 gap-2"
                  onClick={() => refetch()}
                >
                  <ArrowDown className="h-4 w-4" /> Try Again {/* Icon was ArrowDown, kept it, redemption uses reload */}
                </Button>
              </div>
            ) : data.maskedReferrals.length > 0 ? (
              <div className="space-y-4 p-4"> {/* Added p-4 to match redemption card list container */}
                {data.maskedReferrals.map((referral: TMaskedReferral) => (
                  <div
                    key={referral.id}
                    className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card" // Kept bg-card as items have their own background
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {referral.masked_client_name}
                        </span>
                        <Badge
                          className={`flex items-center gap-1 ${
                            getStatusConfig(
                              referral.status.toUpperCase() as TReferral["status"]
                            ).color
                          } font-medium px-2.5 py-1`}
                        >
                          {
                            getStatusConfig(
                              referral.status.toUpperCase() as TReferral["status"]
                            ).icon
                          }{" "}
                          {
                            getStatusConfig(
                              referral.status.toUpperCase() as TReferral["status"]
                            ).label
                          }
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {format(new Date(referral.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 bg-white rounded-lg">
                <div className="bg-[#7844ec] p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-sm">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <p className="text-black font-medium text-lg mb-2">
                  No referrals found
                </p>
                <p className="text-black mt-2 max-w-md mx-auto text-sm">
                  {statusFilter !== "all"
                    ? `You don't have any ${statusFilter.toLowerCase()} referrals.`
                    : "You haven't made any referrals yet. Refer clients to earn rewards!"}
                </p>
                <Button
                  className="mt-6 bg-[#7844ec] hover:bg-[#7844ec]/90 gap-2 px-5 py-2 h-auto text-white"
                  onClick={() => navigate("/referral")} // Navigate to referral page
                >
                  <UserPlus className="h-4 w-4" /> Make a Referral
                </Button>
              </div>
            )}
          </div>

          {/* Updated pagination styling */}
          {!isPending && (data?.maskedReferrals.length || 0) > 0 && (
            <div className="mt-6 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg border border-border shadow-sm"> {/* Matched redemption's pagination container */}
                <PaginationWithLinks
                  page={currentPage}
                  pageSize={pageSize}
                  totalCount={data?.total || 0}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralsDialog;
