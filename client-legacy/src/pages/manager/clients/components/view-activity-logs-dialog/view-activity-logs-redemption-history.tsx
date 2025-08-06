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

interface Redemption {
  id: string;
  clientName: string;
  rewardType: "Gift Card" | "Discount" | "Voucher";
  rewardName: string;
  pointsUsed: number;
  date: Date;
  status: "Active" | "Pending" | "Completed" | "Cancelled";
}

interface RedemptionHistoryProps {
  client: TUserProfile | null;
}

export function RedemptionHistory({ client }: RedemptionHistoryProps) {
  const [rewardFilter, setRewardFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const redemptions: Redemption[] = [
    {
      id: "1",
      clientName: client?.first_name || "Current Client",
      rewardType: "Gift Card" as const,
      rewardName: "$10 Coffee Gift Card",
      pointsUsed: 100,
      date: new Date(2023, 5, 15, 10, 30),
      status: "Completed" as const,
    },
    {
      id: "2",
      clientName: client?.first_name || "Current Client",
      rewardType: "Discount" as const,
      rewardName: "20% Off Next Booking",
      pointsUsed: 200,
      date: new Date(2023, 5, 14, 15, 45),
      status: "Active" as const,
    },
    {
      id: "3",
      clientName: client?.first_name || "Current Client",
      rewardType: "Voucher" as const,
      rewardName: "Free Day Pass",
      pointsUsed: 300,
      date: new Date(2023, 5, 13, 9, 15),
      status: "Pending" as const,
    },
    {
      id: "4",
      clientName: client?.first_name || "Current Client",
      rewardType: "Gift Card" as const,
      rewardName: "$5 Cafe Voucher",
      pointsUsed: 50,
      date: new Date(2023, 5, 12, 14, 0),
      status: "Cancelled" as const,
    },
  ].map((redemption) => ({
    ...redemption,
    clientName: client?.first_name || "Current Client",
  }));

  const columns: ColumnDef<Redemption>[] = [
    {
      id: "clientName",
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ cell }) => {
        return cell.getValue<string>();
      },
    },
    {
      id: "reward",
      accessorFn: (row) => `${row.rewardType}: ${row.rewardName}`,
      header: "Reward",
    },
    {
      id: "pointsUsed",
      accessorKey: "pointsUsed",
      header: "Points Used",
      cell: ({ cell }) => `${cell.getValue<number>()} pts`,
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
        const status = cell.getValue<Redemption["status"]>();
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

  const filteredRedemptions = redemptions.filter((redemption) => {
    const matchesReward =
      rewardFilter === "all" || redemption.rewardType === rewardFilter;
    const matchesStatus =
      statusFilter === "all" || redemption.status === statusFilter;
    const matchesDate =
      !selectedDate ||
      (redemption.date.getDate() === selectedDate.getDate() &&
        redemption.date.getMonth() === selectedDate.getMonth() &&
        redemption.date.getFullYear() === selectedDate.getFullYear());

    return matchesReward && matchesStatus && matchesDate;
  });

  const filters = (
    <div className="flex gap-3">
      <Select value={rewardFilter} onValueChange={setRewardFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Awards" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Awards</SelectItem>
            <SelectItem value="Gift Card">Gift Cards</SelectItem>
            <SelectItem value="Discount">Discount</SelectItem>
            <SelectItem value="Voucher">Voucher</SelectItem>
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
      <DataTable<Redemption>
        columns={columns}
        data={filteredRedemptions}
        filters={filters}
        showDatePicker={true}
        onDateSelect={setSelectedDate}
        searchPlaceholder="Search redemptions..."
        noDataText="No redemptions found"
        sortField="date"
        sortDirection="desc"
      />
    </div>
  );
}
