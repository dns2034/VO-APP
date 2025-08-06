"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RedemptionCard from "./redemption-card";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useAuth } from "@/contexts/auth-context";
import { SELECT_OPTIONS } from "@/lib/constants";
import type {
  TRedemptionStatusFilter,
  TSortDirection,
  TSortField,
} from "@/lib/types";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import {
  ArrowDown,
  ArrowUp,
  Gift,
  SlidersHorizontal,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueries } from "@tanstack/react-query";
import { redemptionQueries } from "../queries";

const RedemptionDialog = () => {
  const { user } = useAuth();
  const { searchParams, updateSearchParam } = useSearchParamsHandler();

  const currentPage = Number(searchParams.get("redemptionsPage")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const sortField =
    (searchParams.get("sortField") as TSortField) || "redeemed_at";
  const statusFilter =
    (searchParams.get("redemptionStatusFilter") as TRedemptionStatusFilter) ||
    "all";

  const [sortDirection, setSortDirection] = useState<TSortDirection>("desc");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleStatusFilterChange = (value: TRedemptionStatusFilter) => {
    updateSearchParam("redemptionStatusFilter", value);

    if (value !== "all" && sortField === "status") {
      updateSearchParam("sortField", "redeemed_at");
    }
  };

  const toggleSortDirection = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    updateSearchParam("sortDirection", newSortDirection);
  };

  const [redemptionCountQuery, redemptionQuery] = useQueries({
    queries: [
      redemptionQueries.countUser({ userId: user?.id as string }),
      redemptionQueries.user({
        userId: user?.id as string,
        pageSize,
        page: currentPage,
        sortDirection,
        sortField,
        status: statusFilter,
      }),
    ],
  });

  useEffect(() => {
    if (redemptionCountQuery.error || redemptionQuery.error) {
      const error =
        redemptionCountQuery.error?.message ||
        redemptionQuery.error?.message ||
        "";
      setError(error);
    }
  }, [redemptionCountQuery.error, redemptionQuery.error]);

  return (
    <Dialog
      open={location.pathname === "/client/rewards/my-redemptions"}
      onOpenChange={(open) => !open && navigate("/client/rewards")}
    >
      <DialogContent className="w-11/12 md:max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden [&>button]:opacity-100 [&>button_svg]:text-white border-0">
        <div className="bg-[#7844ec] text-white p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Gift className="h-5 w-5" /> My Redemptions
            </DialogTitle>
            <p className="text-sm text-gray-200 mt-1 font-normal">
              View and manage your redeemed rewards
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 flex flex-col flex-grow ">
          <div className="bg-white rounded-lg border border-border shadow-sm p-4 mb-6"> {/* Filter Div */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#7844ec]" />
                <Select
                  value={statusFilter}
                  onValueChange={handleStatusFilterChange}
                >
                  <SelectTrigger className="w-[180px] bg-gray-50 border-gray-100 focus:bg-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {SELECT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleSortDirection}
                className="ml-auto cursor-pointer bg-gray-50 border-gray-100 hover:bg-[#7844ec]/10 hover:text-[#7844ec] hover:border-[#7844ec]/30 text-black"
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
                <div className="text-sm text-black mr-2">
                  Active filters:
                </div>
                <Badge
                  className="bg-[#7844ec]/10 text-black border border-[#7844ec]/30 flex items-center gap-1"
                  variant="outline"
                >
                  {
                    SELECT_OPTIONS.find((opt) => opt.value === statusFilter)
                      ?.label
                  }
                  <XCircle
                    className="h-3 w-3 ml-1 cursor-pointer text-[#7844ec]"
                    onClick={() => handleStatusFilterChange("all")}
                  />
                </Badge>
              </div>
            )}
          </div>

          {/* Redemption List */}
          <div className="overflow-y-auto flex-grow min-h-[250px] border border-border rounded-lg">
            {redemptionQuery.isPending || redemptionCountQuery.isPending ? (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg h-full"> 
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : redemptionQuery.error || redemptionCountQuery.error ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 bg-red-50 rounded-lg"> 
                <AlertCircle className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <p className="text-red-600 font-medium">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : redemptionQuery.data?.length > 0 ? (
              <div className="grid gap-4">
                {redemptionQuery.data?.map((redemption) => (
                  <RedemptionCard key={redemption.id} redemption={redemption} />
                ))}
              </div>
            ) : (
              
              <div className="flex flex-col items-center justify-center h-full text-center py-16 bg-white rounded-lg"> 
                <div className="bg-[#7844ec] p-4 rounded-full inline-flex items-center justify-center mb-4 shadow-sm"> 
                  <Gift className="h-8 w-8 text-white" /> 
                </div>
                <p className="text-black font-medium text-lg">
                  No redemptions found
                </p>
                <p className="text-black mt-2 max-w-md mx-auto">
                  {statusFilter !== "all"
                    ? `You don't have any ${statusFilter.toLowerCase()} redemptions.`
                    : "You haven't redeemed any rewards yet. Visit the rewards page to redeem your points!"}
                </p>
                <Button
                  className="mt-6 bg-[#7844ec] hover:bg-[#7844ec]/90 text-white" 
                  onClick={() => navigate("/client/rewards")}
                >
                  Browse Rewards
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {(!redemptionQuery.isPending || !redemptionCountQuery.isPending) &&
            (redemptionQuery.data?.length || 0) > 0 && (
              <div className="mt-6 flex-shrink-0">
                <div className="flex justify-between items-center mb-2">
                  <PaginationWithLinks
                    page={currentPage}
                    pageSize={pageSize}
                    pageSearchParam="redemptionsPage"
                    totalCount={redemptionCountQuery.data ?? 0}
                  />
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedemptionDialog;
