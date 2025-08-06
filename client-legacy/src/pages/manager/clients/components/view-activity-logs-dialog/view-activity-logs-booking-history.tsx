import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";
import type { TUserProfile } from "@/types";

interface Booking {
  id: string;
  clientName: string;
  spaceType: string;
  date: Date;
  status: "Active" | "Pending" | "Completed" | "Cancelled";
}

interface BookingHistoryProps {
  client: TUserProfile | null;
}

export function BookingHistory({ client }: BookingHistoryProps) {
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const bookings: Booking[] = [
    {
      id: "1",
      clientName: client?.first_name || "Current Client", 
      spaceType: "Meeting Room",
      date: new Date(2023, 5, 15, 10, 30),
      status: "Completed",
    },
    {
      id: "2",
      clientName: client?.first_name || "Current Client",
      spaceType: "Desk",
      date: new Date(2023, 5, 14, 15, 45),
      status: "Active",
    },
    {
      id: "3",
      clientName: client?.first_name || "Current Client",
      spaceType: "Meeting Room",
      date: new Date(2023, 5, 13, 9, 15),
      status: "Cancelled",
    },
    {
      id: "4",
      clientName: client?.first_name || "Current Client",
      spaceType: "Desk",
      date: new Date(2023, 5, 12, 14, 0),
      status: "Pending",
    },
  ];

  const columns: ColumnDef<Booking>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ cell }) => {
        return cell.getValue<string>()
      },
    },
    {
      id: "spaceType",
      accessorKey: "spaceType",
      header: "Space Type",
    },
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ cell }) => format(cell.getValue<Date>(), "MMM dd, yyyy h:mm a"),
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ cell }) => {
        const status = cell.getValue<Booking["status"]>();
        const statusColors = {
          Active: "text-green-600",
          Pending: "text-yellow-600",
          Completed: "text-blue-600",
          Cancelled: "text-red-600",
        };
        return <span className={statusColors[status]}>{status}</span>;
      },
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesResource =
      resourceFilter === "all" || booking.spaceType === resourceFilter;
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesDate =
      !selectedDate ||
      (booking.date.getDate() === selectedDate.getDate() &&
        booking.date.getMonth() === selectedDate.getMonth() &&
        booking.date.getFullYear() === selectedDate.getFullYear());

    return matchesResource && matchesStatus && matchesDate;
  });

  const filters = (
    <div className="flex gap-3 justify-end items-e">
      <Select value={resourceFilter} onValueChange={setResourceFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Resources" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Resources</SelectItem>
            <SelectItem value="Meeting Room">Meeting Room</SelectItem>
            <SelectItem value="Desk">Desk</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-4">
      <DataTable<Booking>
        columns={columns}
        data={filteredBookings}
        filters={filters}
        showDatePicker={true}
        onDateSelect={setSelectedDate}
        searchPlaceholder="Search bookings..."
        noDataText="No bookings found"
        sortField="date"
        sortDirection="desc"
      />
    </div>
  );
}
