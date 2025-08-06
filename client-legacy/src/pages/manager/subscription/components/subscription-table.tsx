import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreatePlanModal } from "./subscription-create-plan-modal";
import { EditPlanModal } from "./subscription-edit-plan-modal";

export type Subscription = {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  duration: string;
  price: string;
};

interface SubscriptionTableProps {
  data: Subscription[];
  onCreatePlan?: (planData: {
    name: string;
    duration: string;
    price: string;
    status: string;
  }) => void;
  onEditPlan?: (planData: Subscription) => void;
}

export const SubscriptionTable = ({
  data,
  onCreatePlan,
  onEditPlan,
}: SubscriptionTableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [editingPlan, setEditingPlan] = useState<Subscription | null>(null);

  const filteredData = data.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      plan.status.toLowerCase().includes(searchValue.toLowerCase()) ||
      plan.duration.toLowerCase().includes(searchValue.toLowerCase()) ||
      plan.price.toLowerCase().includes(searchValue.toLowerCase())
  );

  const columns: ColumnDef<Subscription>[] = [
    {
      accessorKey: "name",
      header: "Plan Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    
    {
      accessorKey: "duration",
      header: "Duration",
      
      
    },
     {
  accessorKey: "features",
  header: "Features and permissions",
  cell: ({ row }) => {
    return (
      <Button 

        size="sm"
        className="h-8 rounded-full"
        onClick={() => {
          // Add your view details handler here
          console.log("View details for:", row.original);
        }}
      >
        View Details
      </Button>
    );
  },
},
    {
      accessorKey: "price",
      header: "Price",
    },
     
    {
      id: "actions",
            header: "Actions",

      cell: ({ row }) => {
        const plan = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingPlan(plan)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  
  ];

  return (
    <div className="space-y-4">
      {/* Edit Plan Modal */}
      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          open={!!editingPlan}
          onOpenChange={(open) => !open && setEditingPlan(null)}
          onSave={(updatedPlan) => {
            onEditPlan?.(updatedPlan);
            setEditingPlan(null);
          }}
        />
      )}

      {/* Search and Create Plan Header */}
      <div className="flex w-full items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search plans..."
            className="pl-9 border-gray-200"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <CreatePlanModal onSave={onCreatePlan || (() => {})}>
          <Button className="shrink-0">
            <Plus className="mr-2 h-4 w-4" />
            Create Plan
          </Button>
        </CreatePlanModal>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Filter plans..."
        showDatePicker={false}
        searchValue={searchValue}
      />
    </div>
  );
};