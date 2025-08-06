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
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { CreateNonSubscriberVoucherDialog } from "./create-non-subscriber-voucher-dialog";
import IssueVoucherDialog from "./dialogs/issue-voucher";

interface VoucherData {
  id: string;
  name: string;
  email: string;
  vouchersTotal: number;
}

const mockData: VoucherData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@incub8space.com",
    vouchersTotal: 4,
  },
  {
    id: "2",
    name: "Michael Smith",
    email: "michaelsmith@incub8space.com",
    vouchersTotal: 4,
  },
  {
    id: "3",
    name: "David Johnson",
    email: "davidjohnson@incub8space.com",
    vouchersTotal: 4,
  },
  {
    id: "4",
    name: "Robert Brown",
    email: "robertbrown@incub8space.com",
    vouchersTotal: 4,
  },
  {
    id: "5",
    name: "Daniel Wilson",
    email: "danielwilson@incub8space.com",
    vouchersTotal: 4,
  },
];

export default function VouchersTable() {
  const [search, setSearch] = useState<string>("");
  const [showNonSubscriberDialog, setShowNonSubscriberDialog] = useState(false);
  const { searchParams } = useSearchParamsHandler();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("pageSize")) || 5;

  const columns: ExtendedColumnDef<VoucherData>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "email",
      header: "Email ↑",
      accessorKey: "email",
      sortable: true,
    },
    {
      id: "vouchersTotal",
      header: "Vouchers Total",
      accessorKey: "vouchersTotal",
      sortable: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem>For Subscribed Users</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowNonSubscriberDialog(true)}>
              For Non-Subscribers
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <div className="pt-2">
        <div className="flex justify-end items-center ">
          <IssueVoucherDialog />
        </div>
        <DataTable
          columns={columns}
          data={mockData}
          searchValue={search}
          searchPlaceholder="Filter users by name or email..."
          showDatePicker={false}
          onSearchChange={setSearch}
          page={page}
          pageSize={size}
          totalCount={mockData.length}
        />
      </div>

      <CreateNonSubscriberVoucherDialog
        open={showNonSubscriberDialog}
        onOpenChange={setShowNonSubscriberDialog}
      />
    </>
  );
}
