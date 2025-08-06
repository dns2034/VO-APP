import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ExtendedColumnDef } from "@/components/ui/data-table";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  activateClient,
  getOrganizationClient,
} from "@/pages/shared/services/client-service";
import type { TUserProfile } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ClientReportModal from "./client-report-modal";
import { AddBusinessInformationDialog } from "./add-business-information-dialog";
import ClientPointsAndCreditsDialog from "./client-credits-and-points-dialog";
import AccountDeactivationDialog from "./client-deactivation-dialog";
import { ClientInformationDialog } from "./client-information-dialog";
import { ViewActivityLogsDialog } from "./view-activity-logs-dialog";
import { ExportTransactionModal } from "./export-transaction-modal";
import { BlockClientDialog } from "./block-clients-dialog";
import { clientKeys } from "@/lib/query-factory";
import { ClientBehaviorDialog } from "./client-behavior-dialog";
import { queryClient } from "@/main";
import { ClientCancellationLogDialog } from "./client-cancellation-log-dialog";
import { ClientDocumentDialog } from "./client-document-dialog";
import { ChangeUserTypeDialog } from "./change-user-type-dialog";

type TClientActionProps = {
  client: TUserProfile | null;
  action:
    | "activate"
    | "deactivate"
    | "add-business-details"
    | "view-business-details"
    | "view-activity-logs"
    | "view-profile"
    // | "export"
    | "block-user"
    | "view-behavior"
    | "view-cancel-log"
    | "documents"
    | "change-user-type"
    | null;
};

const ClientsTable = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("email");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const [clientToAction, setClientToAction] = useState<TClientActionProps>({
    client: null,
    action: null,
  });

  const { data: orgClients } = useQuery({
    queryKey: clientKeys.list({ page, pageSize }),
    queryFn: async () =>
      await getOrganizationClient({
        page: (page - 1) * pageSize,
        size: page * pageSize - 1,
      }),
  });

  const activateMutation = useMutation({
    mutationFn: activateClient,
    onSuccess: () => {
      const now = new Date();

      toast.success("Account Activated", {
        description: `${format(now, "EEEE, MMMM dd, yyyy")} at ${format(
          now,
          "p"
        )}`,
      });

      closeDialog();
    },
    onError: () => {
      toast.error("Failed to activate account");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleActivate = async (client: TUserProfile | null) => {
    if (!client) return;

    await activateMutation.mutateAsync(client.id);
  };

  const closeDialog = () => {
    setClientToAction({
      client: null,
      action: null,
    });
  };

  const columns: ExtendedColumnDef<TUserProfile>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      sortable: true,
      cell: ({ row }) => {
        return (
          <p>
            {row.original.first_name} {row.original.last_name}
          </p>
        );
      },
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email",
      sortable: true,
      cell: ({ row }) => {
        return <p>{row.original.email}</p>;
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      sortable: false,
      cell: ({ row }) => {
        const status = row.original.is_active;
        const textColor = status ? "text-green-500" : "text-red-500";
        const text = status ? "Activated" : "Deactivated";

        return <p className={`font-medium ${textColor}`}>{text}</p>;
      },
    },
    {
      id: "actions",
      accessorKey: "id",
      header: () => <div className="text-center w-full">Actions</div>,
      className: "text-right",
      cell: ({ row }) => {
        const client = row.original;

        const textColor = client.is_active ? "text-red-500" : "text-green-500";
        const action = client.is_active ? "deactivate" : "activate";
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem
                  className={cn("", textColor)}
                  onClick={() => setClientToAction({ client, action })}
                >
                  {action.charAt(0).toUpperCase() + action.slice(1)}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "add-business-details",
                    })
                  }
                >
                  Add Business Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "view-business-details",
                    })
                  }
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "block-user",
                    })
                  }
                >
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "view-activity-logs",
                    })
                  }
                >
                  View Activity Logs
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "view-behavior",
                    })
                  }
                >
                  View Behavior
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "view-cancel-log",
                    })
                  }
                >
                  View Cancel Log
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "documents",
                    })
                  }
                >
                  Documents
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "change-user-type",
                    })
                  }
                >
                  Change User Type
                </DropdownMenuItem>
                {/* Removed as per [https://github.com/Incub8-Space/virtual-office/issues/956] */}
                {/* <DropdownMenuItem onClick={() => setIsExportModalOpen(true)}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={() =>
                    setClientToAction({
                      client,
                      action: "view-profile",
                    })
                  }
                >
                  View profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const filters = (
    <div className="flex gap-3 items-center flex-row w-full">
      <ClientReportModal />
      <Select value="all">
        <SelectTrigger className="">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="activated">Activated</SelectItem>
            <SelectItem value="deactivated">Deactivated</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-6">
      <DataTable<TUserProfile>
        columns={columns}
        data={orgClients?.data || []}
        searchPlaceholder="Filter users by name or email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        page={page}
        pageSize={pageSize}
        totalCount={orgClients?.count || 0}
        sortField={sortField}
        showDatePicker={false}
        sortDirection={sortDirection}
        onSortChange={handleSort}
        noDataText="No clients found."
        filters={filters}
      />

      <AccountDeactivationDialog
        open={clientToAction.action === "deactivate" && !!clientToAction.client}
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      {/* Activate Dialog */}
      <AlertDialog
        open={!!clientToAction.client && clientToAction.action === "activate"}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to activate ${clientToAction.client?.email}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-3 mt-4">
            <Button
              disabled={activateMutation.isPending}
              variant={"outline"}
              onClick={closeDialog}
              className="mt-0"
            >
              Cancel
            </Button>
            <Button
              disabled={activateMutation.isPending}
              className="bg-green-500 hover:bg-green-600"
              onClick={() => handleActivate(clientToAction.client)}
            >
              Activate
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddBusinessInformationDialog
        open={
          !!clientToAction.client &&
          clientToAction.action === "add-business-details"
        }
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      <ClientInformationDialog
        open={
          !!(
            clientToAction.client &&
            clientToAction.action === "view-business-details"
          )
        }
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      <ViewActivityLogsDialog
        open={
          !!(
            clientToAction.client &&
            clientToAction.action === "view-activity-logs"
          )
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          }
        }}
        client={clientToAction.client}
      />

      <ExportTransactionModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
        onExport={(format) => {
          console.log(`Exporting transactions as ${format}`);
          setIsExportModalOpen(false);
        }}
      />

      <ClientPointsAndCreditsDialog
        client={clientToAction.client}
        open={
          !!clientToAction.client && clientToAction.action === "view-profile"
        }
        onOpenChange={(open) => !open && closeDialog()}
      />

      <BlockClientDialog
        open={!!clientToAction.client && clientToAction.action === "block-user"}
        onOpenChange={(open) => !open && closeDialog()}
      />

      <ClientBehaviorDialog
        open={
          !!clientToAction.client && clientToAction.action === "view-behavior"
        }
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      <ClientCancellationLogDialog
        open={
          !!clientToAction.client && clientToAction.action === "view-cancel-log"
        }
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      <ClientDocumentDialog
        open={!!clientToAction.client && clientToAction.action === "documents"}
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />

      <ChangeUserTypeDialog
        open={!!clientToAction.client && clientToAction.action === "change-user-type"}
        onOpenChange={(open) => !open && closeDialog()}
        client={clientToAction.client}
      />
    </div>
  );
};

export default ClientsTable;
