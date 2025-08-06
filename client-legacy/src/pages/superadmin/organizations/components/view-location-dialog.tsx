import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal} from "lucide-react"
import type { Organization } from "./organization-table"
import { AddLocationDialog } from "./add-location-dialog"
import { toast } from "sonner"
import CustomAlertDialog from "@/components/generics/custom-alert-dialog"

type Location = {
  id: string
  name: string
  address: string
}

type ViewLocationsDialogProps = {
  organization: Organization | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ViewLocationsDialog = ({ organization, open, onOpenChange }: ViewLocationsDialogProps) => {
  const [locations, setLocations] = useState<Location[]>([
    { id: "1", name: "Kawit Branch", address: "AaBbCc..." },
    { id: "2", name: "Dasma Branch", address: "AaBbCc..." },
  ])
  const [addLocationOpen, setAddLocationOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLocationAdded = () => {
    setLocations(prev => [
      ...prev,
      { id: Date.now().toString(), name: "New Branch", address: "123 New Street" }
    ])
    toast.success("Location added successfully")
  }

  const handleRemoveLocation = (location: Location) => {
    setLocationToDelete(location)
    setDeleteDialogOpen(true)
  }

  const confirmRemoveLocation = async () => {
    if (!locationToDelete) return
    
    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setLocations(prev => prev.filter(loc => loc.id !== locationToDelete.id))
      toast.success(`Location "${locationToDelete.name}" removed successfully`)
    } catch (error) {
      toast.error("Failed to remove location. Please try again.")
      console.error("Error removing location:", error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setLocationToDelete(null)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 relative">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Organization Locations</DialogTitle>
              <p className="text-sm text-gray-100 mt-1">
                Manage Locations for {organization?.name || "[Organization Name]"}
              </p>
            </DialogHeader>
          </div>

          <div className="p-6 flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-sm">
                <Input type="text" placeholder="Search by location name..." className="w-full" />
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setAddLocationOpen(true)}
              >
                Add Location
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Location Name</TableHead>
                  <TableHead className="w-[40%]">Address</TableHead>
                  <TableHead className="text-right w-[20%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.address}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-600"
                            onClick={() => handleRemoveLocation(location)}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <AddLocationDialog
        organizationId={organization?.id || ""}
        open={addLocationOpen}
        onOpenChange={setAddLocationOpen}
        onLocationAdded={handleLocationAdded}
      />

      <CustomAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Remove Location?"
        description={`Are you sure you want to remove "${locationToDelete?.name}"? This action is permanent and cannot be undone.`}
        onConfirm={confirmRemoveLocation}
        variant="danger"
        confirmText={isDeleting ? "Removing..." : "Remove"}
        confirmDisabled={isDeleting}
      />
    </>
  )
}