import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Plus, Settings, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { OrganizationDialog } from "./organization-dialog"
import { AddOrganizationDialog } from "./add-organization"
import { ConfirmationDeleteDialog } from "./confirmation-delete-dialog"
import { OrganizationSettingsDialog } from "./organization-settings-dialog"
import { ViewLocationsDialog } from "./view-location-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { toast } from "sonner"

export type Organization = {
  id: string
  name: string
  dateJoined: string
  description: string
  contactPerson: string
}

type ExtendedColumnDef<TData> = ColumnDef<TData> & {
  sortable?: boolean
  className?: string
}

const OrganizationTable = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<keyof Organization>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([])
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [locationsDialogOpen, setLocationsDialogOpen] = useState(false)


  const page = Number(searchParams.get("page") ?? 1)
  const pageSize = Number(searchParams.get("pageSize") ?? 5)

  const organizations: Organization[] = [
    { id: "1", name: "Acne Corp", dateJoined: "April 4, 2025", description: "N/A", contactPerson: "Juan Dela Cruz" },
    { id: "2", name: "Beta Inc", dateJoined: "April 4, 2025", description: "N/A", contactPerson: "Maria Clara" },
    { id: "3", name: "Delta Co", dateJoined: "April 4, 2025", description: "N/A", contactPerson: "Jose Rizal" },
    { id: "4", name: "Apple", dateJoined: "April 4, 2025", description: "N/A", contactPerson: "Andres Bonifacio" },
    { id: "5", name: "Microsoft", dateJoined: "April 4, 2025", description: "N/A", contactPerson: "Gregoria de Jesus" },
    { id: "6", name: "Google", dateJoined: "April 5, 2025", description: "N/A", contactPerson: "Apolinario Mabini" },
    { id: "7", name: "Amazon", dateJoined: "April 5, 2025", description: "N/A", contactPerson: "Emilio Aguinaldo" },
    { id: "8", name: "Tesla", dateJoined: "April 6, 2025", description: "N/A", contactPerson: "Melchora Aquino" },
    { id: "9", name: "Meta", dateJoined: "April 6, 2025", description: "N/A", contactPerson: "Antonio Luna" },
    { id: "10", name: "Netflix", dateJoined: "April 7, 2025", description: "N/A", contactPerson: "Diego Silang" },
  ]
  

  const filteredOrganizations = organizations.filter((org) => {
    return (
      searchQuery === "" ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    const aValue = a[sortField].toString().toLowerCase()
    const bValue = b[sortField].toString().toLowerCase()
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const paginatedOrganizations = sortedOrganizations.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field as keyof Organization)
    setSortDirection(direction)
  }

  const handleSelectOrganization = (id: string) => {
    setSelectedOrganizations((prev) => (prev.includes(id) ? prev.filter((orgId) => orgId !== id) : [...prev, id]))
  }

  const handleViewOrganization = (organization: Organization) => {
    setSelectedOrganization(organization)
    setViewDialogOpen(true)
  }

  const handleViewLocations = (organization: Organization) => {
    setSelectedOrganization(organization)
    setLocationsDialogOpen(true)
  }


  const handleEditOrganization = async (updatedOrganization: Organization) => {
    try {
      console.log("Updating organization:", updatedOrganization);
    } catch (error) {
      console.error("Error updating organization:", error);
    }
  };

  const handleAddOrganization = () => {
    setAddDialogOpen(true)
  }
  
  const handleCreateOrganization = (data: { name: string; description: string; owner: string }) => {
    console.log("Creating organization:", data)
  }

  const handleSettingsDialog = () => {
    setSettingsDialogOpen(true)
  }

  const handleDeleteOrganizations = async () => {
    setIsDeleting(true);
    try {
      console.log("Deleting organizations:", selectedOrganizations);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedOrganizations([]);
      setDeleteDialogOpen(false);
      toast.success(`${selectedOrganizations.length} organization${selectedOrganizations.length > 1 ? 's' : ''} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting organizations:", error);
      toast.error("There was an error deleting the organizations. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const columns: ExtendedColumnDef<Organization>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
            const pageRows = table.getRowModel().rows
            if (value) {
              setSelectedOrganizations(pageRows.map((row) => row.original.id))
            } else {
              setSelectedOrganizations([])
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedOrganizations.includes(row.original.id)}
          onCheckedChange={() => handleSelectOrganization(row.original.id)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Organization Name",
      sortable: true,
    },
    {
      id: "dateJoined",
      accessorKey: "dateJoined",
      header: "Date Joined",
      sortable: true,
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
      sortable: true,
    },
    {
      id: "actions",
      accessorKey: "id",
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
            <DropdownMenuItem
              onClick={() => handleViewOrganization(row.original)}
              className="cursor-pointer"
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => handleViewLocations(row.original)}
              className="cursor-pointer"
            >
              View Locations
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-end mb-4">
        <div className="flex gap-2">
          <Button onClick={handleAddOrganization} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={selectedOrganizations.length === 0}
            className={
                selectedOrganizations.length > 0 ? "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" : ""
            }
            >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
            </Button>
            <Button variant="outline" onClick={handleSettingsDialog}>
              <Settings className="text-violet-600"/>
            </Button>
        </div>
      </div>

      <DataTable<Organization>
        columns={columns}
        data={paginatedOrganizations}
        searchPlaceholder="Filter organizations by name or description..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        page={page}
        pageSize={pageSize}
        totalCount={filteredOrganizations.length}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSort}
        noDataText="No organizations found."
      />

      <OrganizationDialog
        organization={selectedOrganization}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        onEdit={handleEditOrganization}
      />

      <AddOrganizationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleCreateOrganization}
      />

      <ConfirmationDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteOrganizations}
        isLoading={isDeleting}
        count={selectedOrganizations.length}
      />

      <OrganizationSettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
      />

      <ViewLocationsDialog
        organization={selectedOrganization}
        open={locationsDialogOpen}
        onOpenChange={setLocationsDialogOpen}
      />

   
    </div>
  )
}

export default OrganizationTable