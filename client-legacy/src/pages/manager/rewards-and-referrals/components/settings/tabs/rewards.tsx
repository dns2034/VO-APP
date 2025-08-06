import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { rewards } from "../../sample-data";
import AddNewRewardDialog from "../add-new-reward-dialog";
import RewardEditSettingsDialog from "../reward-edit-dialog";

const columns = [
  {
    id: "name",
    header: "Rewards Name",
    cell: ({ row }: { row: { original: any } }) => row.original.name,
    sortable: true,
  },
  {
    id: "description",
    header: "description",
    cell: ({ row }: { row: { original: any } }) => row.original.description,
  },
  {
    id: "points-credits",
    header: "Points / Credits",
    cell: ({ row }: { row: { original: any } }) => row.original.pointsCredits,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }: { row: { original: any } }) => (
      <span
        className={cn(
          row.original.status == "Active" ? "text-emerald-400" : "text-red-500"
        )}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => <RewardEditSettingsDialog />,
  },
];

export default function RewardsTab({ setClose }: { setClose: () => void }) {
  const { searchParams } = useSearchParamsHandler();
  const [addNewRewardOpen, setAddRewardOpen] = useState<boolean>(false);

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("pageSize")) || 5;
  return (
    <>
      <div className="space-y-4">
        <p className="font-semibold text-purple-500">List of Rewards</p>
        <DataTable
          page={page}
          pageSize={size}
          totalCount={0}
          columns={columns}
          data={rewards || []}
          showDatePicker={false}
        />
      </div>
      <div className="py-4">
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setAddRewardOpen(false);
              setClose();
            }}
            className="text-sm px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2"
            onClick={() => {
              setAddRewardOpen(true);
            }}
          >
            Add new Rewards
          </Button>
        </div>
      </div>
      <AddNewRewardDialog
        open={addNewRewardOpen}
        setClose={() => {
          setAddRewardOpen(false);
        }}
      />
    </>
  );
}
