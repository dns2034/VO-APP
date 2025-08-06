import { DataTable } from "@/components/ui/data-table";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { Leaderboard } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import LeaderboardFilterHeader from "./leaderboard-filter-header";
import { data } from "./sample-data";

const columns: ColumnDef<Leaderboard>[] = [
  {
    id: "rank",
    header: "Rank",
    cell: ({ row }) => row.original.rank,
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    id: "total",
    header: "Total",
    cell: ({ row }) => row.original.total,
  },
];

export default function LeaderboardTable() {
  const { searchParams } = useSearchParamsHandler();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  return (
    <div className="space-y-4">
      <LeaderboardFilterHeader />
      <DataTable
        columns={columns}
        data={data}
        showDatePicker={false}
        page={page}
        pageSize={pageSize}
        totalCount={data.length}
      />
    </div>
  );
}
