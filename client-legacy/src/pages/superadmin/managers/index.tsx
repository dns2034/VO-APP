import { ChevronDown, ChevronUp, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ExtendedColumnDef } from "@/components/ui/data-table";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParamsHandler } from "@/hooks/use-search-param-handler";

interface ManagerData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

interface ActivityLogData {
  name: string;
  email: string;
  actionPerformed: string;
  timestamp: string;
}

const mockData: ManagerData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@incub8space.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "2",
    name: "Michael Smith",
    email: "michaelsmith@incub8space.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "3",
    name: "David Johnson",
    email: "davidjohnson@incub8space.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "4",
    name: "Robert Brown",
    email: "robertbrown@incub8space.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: "5",
    name: "Daniel Wilson",
    email: "danielwilson@incub8space.com",
    role: "Manager",
    status: "Active",
  },
];

const mockActivityLogs: ActivityLogData[] = [
  {
    name: "John Doe",
    email: "johndoe@incub8space.com",
    actionPerformed: "ABCCCC",
    timestamp: "April 28, 2025 - 10:45 AM",
  },
  {
    name: "David Johnson",
    email: "davidjohnson@incub8space.com",
    actionPerformed: "ABCCCC",
    timestamp: "April 28, 2025 - 10:45 AM",
  },
  {
    name: "Robert Brown",
    email: "robertbrown@incub8space.com",
    actionPerformed: "ABCCCC",
    timestamp: "April 28, 2025 - 10:45 AM",
  },
  {
    name: "Daniel Wilson",
    email: "danielwilson@incub8space.com",
    actionPerformed: "ABCCCC",
    timestamp: "April 28, 2025 - 10:45 AM",
  },
  {
    name: "Michael Smith",
    email: "michaelsmith@incub8space.com",
    actionPerformed: "ABCCCC",
    timestamp: "April 28, 2025 - 10:45 AM",
  },
];

export default function ManagerPage() {
  const [activeTab, setActiveTab] = useState<string>("manager");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [managerToDelete, setManagerToDelete] = useState<ManagerData | null>(null);
  const { searchParams } = useSearchParamsHandler();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("pageSize")) || 5;

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "newest" ? "oldest" : "newest");
  };

  const sortedActivityLogs = [...mockActivityLogs].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  const handleDeleteManager = (manager: ManagerData) => {
    setManagerToDelete(manager);
  };

  const confirmDelete = () => {
    if (!managerToDelete) return;

    try {
      // TODO: Replace with actual API call
      toast.success("Manager deleted successfully", {
        description: `${managerToDelete.name} has been removed from the system.`,
      });
      setManagerToDelete(null);
      // TODO: Refresh manager list
    } catch (error) {
      toast.error("Failed to delete manager", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  const columns: ExtendedColumnDef<ManagerData>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      sortable: true,
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={
            row.original.status === "Active"
              ? "bg-emerald-50 text-emerald-500 border-emerald-500"
              : "bg-red-50 text-red-500 border-red-500"
          }
        >
          {row.original.status}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDeleteManager(row.original)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const activityLogColumns: ExtendedColumnDef<ActivityLogData>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      sortable: true,
    },
    {
      id: "actionPerformed",
      header: "Action Performed",
      accessorKey: "actionPerformed",
      sortable: true,
    },
    {
      id: "timestamp",
      header: "Timestammp",
      accessorKey: "timestamp",
      sortable: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col h-screen container px-2 md:px-12 pt-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Managers Management</h1>
          <p className="text-muted-foreground">
            View, assign, update, and remove Managers across the system.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-6"
        >
          <TabsList className="w-full grid grid-cols-2 rounded p-1">
            <TabsTrigger
              value="manager"
              className="w-full data-[state=active]:bg-[#7844ec] data-[state=active]:text-white rounded-md transition"
            >
              Manager
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="w-full data-[state=active]:bg-[#7844ec] data-[state=active]:text-white rounded-md transition"
            >
              Activity Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manager">
            <div className="pt-2">
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
                actions={
                  <Button onClick={() => {}} className="bg-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    New Manager
                  </Button>
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="pt-2">
              <DataTable
                columns={activityLogColumns}
                data={sortedActivityLogs}
                searchValue={search}
                searchPlaceholder="Filter users by name or email..."
                showDatePicker={false}
                onSearchChange={setSearch}
                page={page}
                pageSize={size}
                totalCount={mockActivityLogs.length}
                actions={
                  <Button 
                    variant="outline" 
                    onClick={toggleSortOrder}
                    className="min-w-[100px] flex items-center gap-2"
                  >
                    {sortOrder === "newest" ? "Newest" : "Oldest"}
                    {sortOrder === "newest" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={!!managerToDelete} onOpenChange={(open) => !open && setManagerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Manager</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {managerToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
