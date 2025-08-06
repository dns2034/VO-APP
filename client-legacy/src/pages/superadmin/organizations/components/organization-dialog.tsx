import { Camera, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { EditOrganizationDialog, OrganizationFormValues } from "./edit-organization"

type Organization = {
  id: string
  name: string
  dateJoined: string
  description: string
  contactPerson: string
}

interface OrganizationDialogProps {
  organization: Organization | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (organization: Organization) => void
}

export function OrganizationDialog({ organization, open, onOpenChange, onEdit }: OrganizationDialogProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  if (!organization) return null

  const handleEditClick = () => {
    setEditDialogOpen(true)
  }

  const handleEditSubmit = (data: OrganizationFormValues) => {
    onEdit({ 
      ...organization, 
      name: data.name,
      description: data.description,
      contactPerson: data.owner
    })
    setEditDialogOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={`p-0 overflow-hidden max-w-none ${isMobile ? "w-[95%] h-[80vh]" : "w-[90%] max-w-2xl h-auto"}`}
        >
          <div className="flex flex-col h-full">
            <div className="relative w-full" style={{ height: isMobile ? "40vh" : "50vh" }}>
              <img
                src="https://incub8space.com/assets/uploads/workstation-1.webp"
                alt="Office view"
                className="w-full h-full object-cover select-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
              <Button className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1.5 rounded-md flex items-center gap-2 ">
                <span className="text-sm font-medium flex gap-2 items-center"><Camera className="h-5 w-5" />Upload Photo</span>
              </Button>
            </div>

            <div className="relative flex-grow bg-white rounded-t-3xl -mt-6 p-6">
              <h2 className="text-xl font-bold mt-2">{organization.name}</h2>
              <p className="text-sm text-muted-foreground">{organization.contactPerson}</p>

              <div className="mt-4 pb-12">
                <h3 className="text-base font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">
                  {organization.description !== "N/A"
                    ? organization.description
                    : `${organization.name} is a leading provider of innovative solutions in the industry.`}
                </p>
              </div>

              <div className="absolute top-6 right-6">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white" 
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditOrganizationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
        organization={{
          name: organization.name,
          description: organization.description,
          owner: organization.contactPerson
        }}
        placeholders={{
          owner: "Enter company owner name",
          name: "Enter organization name",
          description: "Enter organization description"
        }}
      />
    </>
  )
}