import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { UserMinus, UserPlus, KeyRound, MoreHorizontal } from "lucide-react";
import { 
  TUserRole, 
  TUserStatus, 
  TUserSortField, 
  TUserStatusFilter, 
  TUserRoleFilter 
} from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";
import { ResetPasswordDialog } from "./reset-password-dialog";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
};

type ExtendedColumnDef<TData> = ColumnDef<TData> & {
  sortable?: boolean;
  className?: string;
};

const UserTable = () => {
  const [searchParams] = useSearchParams();
  const [sortField, setSortField] = useState<TUserSortField>("email");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TUserStatusFilter>("all");
  const [roleFilter, setRoleFilter] = useState<TUserRoleFilter>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<"activate" | "deactivate" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 5);

  const users: User[] = [
    { id: "1", name: "John Doe", email: "johndoe@incub8space.com", role: "Manager", status: "Activated" },
    { id: "2", name: "Michael Smith", email: "michaelsmith@incub8space.com", role: "Manager", status: "Deactivated" },
    { id: "3", name: "David Johnson", email: "davidjohnson@incub8space.com", role: "Client", status: "Activated" },
    { id: "4", name: "Robert Brown", email: "robertbrown@incub8space.com", role: "Client", status: "Activated" },
    { id: "5", name: "Daniel Wilson", email: "danielwilson@incub8space.com", role: "Client", status: "Deactivated" },
    { id: "6", name: "James Miller", email: "jamesmiller@incub8space.com", role: "Manager", status: "Activated" },
    { id: "7", name: "William Davis", email: "williamdavis@incub8space.com", role: "Client", status: "Deactivated" },
    { id: "8", name: "Joseph Garcia", email: "josephgarcia@incub8space.com", role: "Client", status: "Activated" },
    { id: "9", name: "Thomas Rodriguez", email: "thomasrodriguez@incub8space.com", role: "Manager", status: "Activated" },
    { id: "10", name: "Charles Wilson", email: "charleswilson@incub8space.com", role: "Client", status: "Deactivated" },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField].toString().toLowerCase();
    const bValue = b[sortField].toString().toLowerCase();

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const paginatedUsers = sortedUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field as TUserSortField);
    setSortDirection(direction);
  };

  const handleUserAction = (user: User, action: "activate" | "deactivate") => {
    setSelectedUser(user);
    setActionType(action);
    setIsDialogOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  const generateTemporaryPassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };
  
  const handlePasswordGenerated = (tempPassword: string) => {
    if (!selectedUser) return;

    const timestamp = getCurrentDateTime();

    toast.success("Password Reset", {
      description: (
        <div className="flex flex-col gap-1">
          <div>
            Password has been reset for <span className="font-medium">{selectedUser.name}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
        </div>
      ),
      duration: 5000,
    });

    console.log(`Temporary password for ${selectedUser.email}: ${tempPassword}`);
  };

  const getCurrentDateTime = () => {
    return format(new Date(), "MMM d, yyyy 'at' h:mm a");
  };

  const confirmAction = () => {
    if (!selectedUser || !actionType ) return

    const timestamp = getCurrentDateTime()

    const title = actionType === 'activate' ? 'User Activated' : 'User Deactivated'
    const userState = actionType === 'activate' ? 'has been activated' : 'has been deactivated'

    toast.success(title, {
      description: (
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-medium">{selectedUser.name}</span> {userState}
          </div>
          <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
        </div>
      ),
      duration: 5000,
    })

    setIsDialogOpen(false)
  }

  const getDialogConfig = () => {
    if (!selectedUser || !actionType) return null

    // const baseConfig = {
    //   user: selectedUser,
    //   variant: "warning" as const,
    //   confirmText: "",
    //   title: "",
    //   description: "",
    // }

    switch (actionType) {
      case "activate":
        return {
          // ...baseConfig,
          title: `Activate User: ${selectedUser.name}`,
          description: `Are you sure you want to activate ${selectedUser.email}? This will allow them to access the system.`,
          confirmText: "Activate User",
          variant: "info" as const,
        };
      case "deactivate":
        return {
          // ...baseConfig,
          title: `Deactivate User: ${selectedUser.name}`,
          description: `Are you sure you want to deactivate ${selectedUser.email}? This will prevent them from accessing the system.`,
          confirmText: "Deactivate User",
          variant: "danger" as const,
        };
      default:  
        return null;
    }
  };

  const dialogConfig = getDialogConfig();

  const columns: ExtendedColumnDef<User>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      sortable: true,
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email",
      sortable: true,
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      sortable: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      sortable: true,
      cell: ({ row }) => (
        <span className={row.original.status === "Activated" ? "text-green-600" : "text-red-600"}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      accessorKey: "id",
      header: () => <div className=" text-center w-full">Actions</div>,
      className: "text-right",
      cell: ({ row }) => (
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
              className="cursor-pointer" 
              onClick={() => handleResetPassword(row.original)}
            >
              <KeyRound className="mr-2 h-4 w-4" />
              Reset Password
            </DropdownMenuItem>
            {row.original.status === "Activated" ? (
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleUserAction(row.original, "deactivate")}
              >
                <UserMinus className="mr-2 h-4 w-4" />
                Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="cursor-pointer text-green-600 focus:text-green-600"
                onClick={() => handleUserAction(row.original, "activate")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Activate
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

      ),
    },
  ];

  const filters = (
    <>
      <Select 
        value={statusFilter} 
        onValueChange={(value: TUserStatusFilter) => setStatusFilter(value)}
      >
        <SelectTrigger className="w-[140px] border-gray-200">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Activated">Activated</SelectItem>
          <SelectItem value="Deactivated">Deactivated</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={roleFilter} 
        onValueChange={(value: TUserRoleFilter) => setRoleFilter(value)}
      >
        <SelectTrigger className="w-[140px] border-gray-200">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
          <SelectItem value="Client">Client</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <>
      <DataTable<User>
        columns={columns}
        data={paginatedUsers}
        searchPlaceholder="Filter users by name or email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        page={page}
        pageSize={pageSize}
        totalCount={filteredUsers.length}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSort}
        noDataText="No users found."
      />

      {dialogConfig && (
        <CustomAlertDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title={dialogConfig.title}
          description={dialogConfig.description}
          onConfirm={confirmAction}
          confirmText={dialogConfig.confirmText}
          variant={dialogConfig.variant}
        />
      )}

      {selectedUser && (
        <ResetPasswordDialog
          user={{ name: selectedUser.name, email: selectedUser.email }}
          open={isResetPasswordDialogOpen}
          onOpenChange={setIsResetPasswordDialogOpen}
          onResetPassword={generateTemporaryPassword}
          onPasswordGenerated={handlePasswordGenerated}
        />
      )}
    </>
  );
};

export default UserTable;