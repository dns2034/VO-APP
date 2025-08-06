import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTable, SortDirection } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { Booking, BookingTableColumn } from "../types/_mock-booking-types";
import { mockBookings } from "../data/_mock-data";
import { isWithinInterval, parseISO } from "date-fns";

interface BookingManagementTableProps {
  isLoading?: boolean;
}

export const BookingManagementTable = ({
  isLoading = false,
}: BookingManagementTableProps) => {
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 5);

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  const handleSort = (field: string, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) =>
        (selectedOrganization === "all" || b.organization === selectedOrganization) &&
        (selectedStatus === "all" || b.status === selectedStatus) &&
        (b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.organization.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .filter((b) => {
        if (!dateRange?.from || !dateRange?.to) return true;
        const bookingDate = parseISO(b.date);
        return isWithinInterval(bookingDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
      })
      .sort((a, b) => {
        const valA = a[sortField as keyof Booking];
        const valB = b[sortField as keyof Booking];
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [
    bookings,
    searchQuery,
    selectedOrganization,
    selectedStatus,
    dateRange,
    sortField,
    sortDirection,
  ]);

  const uniqueOrganizations = Array.from(new Set(bookings.map((b) => b.organization)));
  const uniqueStatuses = Array.from(new Set(bookings.map((b) => b.status)));

  const columns: BookingTableColumn[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: "Client Name",
      sortable: true,
    },
    {
      id: "organization",
      accessorKey: "organization",
      header: "Organization",
      sortable: true,
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      sortable: true,
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
      id: "time",
      accessorKey: "time",
      header: "Time",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const colorMap: Record<string, string> = {
          confirmed: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          canceled: "bg-red-100 text-red-800",
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[status] || "bg-blue-100 text-blue-800"}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      ),
    },
  ];

  const filters = (
    <>
      <Select onValueChange={setSelectedOrganization} value={selectedOrganization}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Organizations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Organizations</SelectItem>
          {uniqueOrganizations.map((org) => (
            <SelectItem key={org} value={org}>
              {org}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedStatus} value={selectedStatus}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {uniqueStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <DataTable<Booking>
      columns={columns}
      data={filteredBookings.slice((page - 1) * pageSize, page * pageSize)}
      totalCount={filteredBookings.length}
      searchPlaceholder="Search bookings..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filters={filters}
      page={page}
      pageSize={pageSize}
      sortField={sortField}
      sortDirection={sortDirection}
      onSortChange={handleSort}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      noDataText={isLoading ? "Loading..." : "No bookings found."}
    />
  );
};
