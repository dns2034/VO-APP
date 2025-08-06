import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import RewardsAndReferralsAlertDialog from "../rewards-and-referrals-dialog";
import { rewardAndReferrals } from "../sample-data";

const columns = [
  {
    id: "checkbox",
    header: () => <Checkbox />,
    cell: () => <Checkbox />,
  },
  {
    id: "referrer",
    header: "Referrer",
    cell: ({ row }: { row: { original: any } }) => row.original.referrer,
    sortable: true,
  },
  {
    id: "referee",
    header: "Referee",
    cell: ({ row }: { row: { original: any } }) => row.original.referee,
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }: { row: { original: any } }) => row.original.date,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }: { row: { original: any } }) => (
      <span
        className={cn(
          row.original.status == "Suspicious"
            ? "text-amber-400"
            : "text-red-500"
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({}: { row: { original: any } }) => (
      <RewardsAndReferralsAlertDialog />
    ),
  },
];

const statuses = ["All Status", "Flagged", "Suspicious"];

export default function RewardsAndReferralsTable() {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All Status");

  const { searchParams } = useSearchParamsHandler();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("pageSize")) || 5;

  const filters = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {filterStatus ? filterStatus : "All Status"}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setFilterStatus(option!)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <div className="pt-4">
      <DataTable
        columns={columns}
        searchValue={search}
        searchPlaceholder="Search by name"
        onSearchChange={setSearch}
        page={page}
        pageSize={size}
        totalCount={rewardAndReferrals.length}
        data={rewardAndReferrals}
        filters={filters}
        showDatePicker={false}
      />
    </div>
  );
}
