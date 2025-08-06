import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ExtendedColumnDef } from "@/components/ui/data-table";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { cn } from "@/lib/utils";

interface ReferralData {
  id: string;
  referrer: string;
  referee: string;
  date: string;
  status: "Flagged" | "Suspicious";
}

const mockData: ReferralData[] = [
  {
    id: "1",
    referrer: "Michael Smith",
    referee: "John Doe",
    date: "April 4, 2025",
    status: "Flagged",
  },
  {
    id: "2",
    referrer: "John Doe",
    referee: "Michael Smith",
    date: "April 4, 2025",
    status: "Suspicious",
  },
  {
    id: "3",
    referrer: "David Johnson",
    referee: "Robert Brown",
    date: "April 4, 2025",
    status: "Flagged",
  },
  {
    id: "4",
    referrer: "Robert Brown",
    referee: "David Johnson",
    date: "April 4, 2025",
    status: "Flagged",
  },
  {
    id: "5",
    referrer: "Daniel Wilson",
    referee: "Michael Smith",
    date: "April 4, 2025",
    status: "Suspicious",
  },
];

const statuses = ["All Statuses", "Flagged", "Suspicious"];

export default function ReferralsTable() {
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All Statuses");

  const { searchParams } = useSearchParamsHandler();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("pageSize")) || 5;

  const handleDelete = (id: string) => {
    console.log("Delete referral:", id);
  };

  const columns: ExtendedColumnDef<ReferralData>[] = [
    {
      id: "referrer",
      header: "Referrer ↑",
      accessorKey: "referrer",
      sortable: true,
    },
    {
      id: "referee",
      header: "Referee ↑",
      accessorKey: "referee",
      sortable: true,
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={cn(
            "text-sm font-medium",
            row.original.status === "Flagged"
              ? "text-red-500"
              : "text-yellow-500"
          )}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const filters = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {filterStatus}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="pt-4">
      <DataTable
        columns={columns}
        searchValue={search}
        searchPlaceholder="Search by name..."
        onSearchChange={setSearch}
        page={page}
        pageSize={size}
        totalCount={mockData.length}
        data={mockData}
        filters={filters}
        showDatePicker={false}
      />
    </div>
  );
}
