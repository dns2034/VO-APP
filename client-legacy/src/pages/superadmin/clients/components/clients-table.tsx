import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Plus, UserRoundCog } from "lucide-react"
import type { ExtendedColumnDef } from "@/components/ui/data-table"
import { BusinessInformationDialog } from "./business-information-dialog"
import { toast } from "sonner"
import { AddBusinessInformationDialog, type AddBusinessFormData,  } from "./add-business-information-dialog"
import { AdjustClientsDialog } from "./view-client"



export type Client = {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar: string
  points: number
  credits: number
}

export interface Business {
  id: string
  name: string
  type: string
  address: string
}

const ClientsTable = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("email")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isBusinessDialogOpen, setBusinessDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [isClientAdjustDialogOpen, setClientAdjustDialogOpen] = useState(false)

  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const page = Number(searchParams.get("page") ?? 1)
  const pageSize = Number(searchParams.get("pageSize") ?? 5)

  const clients: Client[] = [
    { 
      id: "1", 
      name: "John Doe", 
      email: "johndoe@incub8space.com", 
      role: "Client", 
      status: "Active", 
      avatar: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=612x612&w=0&k=20&c=MsKXmwf7TDRdKRn_lHohhmD5rvVvnGs9ry0xl6CrMT4=", 
      points: 100, 
      credits: 100 
    },
    { 
      id: "2", 
      name: "Michael Smith", 
      email: "michaelsmith@incub8space.com", 
      role: "Client", 
      status: "Active", 
      avatar: "https://media.istockphoto.com/id/1303539316/photo/one-beautiful-woman-looking-at-the-camera-in-profile.jpg?b=1&s=612x612&w=0&k=20&c=V-WspSfjWvsI1GNe9evTbyk2EdcGythQvRva0Pn5Zc8=", 
      points: 0, 
      credits: 0 
    },
    { 
      id: "3", 
      name: "David Johnson", 
      email: "davidjohnson@incub8space.com", 
      role: "Client", 
      status: "Active", 
      avatar: "https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.jpg?b=1&s=612x612&w=0&k=20&c=xuw1KX6f2QSuSUaN_mvqE9l84AbAl6XRcS9TzMMoFRs=", 
      points: 0, 
      credits: 0 
    },
    { 
      id: "4", 
      name: "Robert Brown", 
      email: "robertbrown@incub8space.com", 
      role: "Client", 
      status: "Inactive", 
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600", 
      points: 0, 
      credits: 0 
    },
    { 
      id: "5", 
      name: "Daniel Wilson", 
      email: "danielwilson@incub8space.com", 
      role: "Client", 
      status: "Active", 
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600", 
      points: 0, 
      credits: 0 
    },
  ]


  const filteredClients = clients.filter((client) => {
    return (
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = a[sortField as keyof Client]?.toString().toLowerCase() || ""
    const bValue = b[sortField as keyof Client]?.toString().toLowerCase() || ""

    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const paginatedClients = sortedClients.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setSortField(field)
    setSortDirection(direction)
  }



  const columns: ExtendedColumnDef<Client>[] = [
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
      id: "actions",
      accessorKey: "id",
      header: () => <div className="text-center w-full">Actions</div>,
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
              <DropdownMenuItem onClick={() => handleViewDetails(row.original)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddDetails(row.original)}>
                <Plus className="mr-2 h-4 w-4" />
                Add new details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {handleAdjustClient(row.original)}}>
              <UserRoundCog className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
  

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client)
    setDetailsDialogOpen(true)
  }

  const handleAddDetails = (client: Client) => {
    setSelectedClient(client)
    setBusinessDialogOpen(true)
  }

  const handleAdjustClient = (client: Client) => {
    setSelectedClient(client)
    setClientAdjustDialogOpen(true)

  }

  const handleBusinessSubmit = (data: AddBusinessFormData) => {
    console.log("Business data submitted:", data)
    toast.success("Business information added", {
      description: `Added ${data.businessName} for ${selectedClient?.name}`,
    })
  }

  const handleEditBusiness = (business: Business) => {
    console.log("Edit business:", business)
    // Close the details dialog and open the edit dialog
    setDetailsDialogOpen(false)

    // In a real app, you would pre-fill the edit form with the business data
    // For now, we'll just show a toast
    toast.info("Edit business functionality", {
      description: `Editing ${business.name}`,
    })
  }

  return (
    <div className="space-y-6">
      <DataTable<Client>
        columns={columns}
        data={paginatedClients}
        searchPlaceholder="Filter users by name or email..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        page={page}
        pageSize={pageSize}
        totalCount={filteredClients.length}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSort}
        noDataText="No clients found."
      />

      <AddBusinessInformationDialog
        open={isBusinessDialogOpen}
        onOpenChange={setBusinessDialogOpen}
        client={selectedClient}
        onSubmit={handleBusinessSubmit}
      />

      <BusinessInformationDialog
        open={isDetailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        client={selectedClient}
        onEdit={handleEditBusiness}
      />

      <AdjustClientsDialog
        open={isClientAdjustDialogOpen}
        onOpenChange={setClientAdjustDialogOpen}
        client={selectedClient}
      />
    </div>
  )
}

export default ClientsTable
