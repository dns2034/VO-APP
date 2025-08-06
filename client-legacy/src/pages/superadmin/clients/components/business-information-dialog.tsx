import { useState } from "react"
import { Info, ChevronRight, ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent,  SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Business {
  id: string
  name: string
  type: string
  address: string
}

interface BusinessInformationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: { id: string; name: string; email: string } | null
  onEdit: (business: Business) => void
}

export const BusinessInformationDialog = ({ open, onOpenChange, client, onEdit }: BusinessInformationDialogProps) => {
  // Mock data - in a real app, this would come from an API or props
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: "1",
      name: "IT - Innovators Techtacks",
      type: "IT Marketing Company",
      address: "123 Main Street, Apt 4B, Springfield, IL, 62704, USA",
    },
    {
      id: "2",
      name: "Green Solutions",
      type: "Environmental Consulting",
      address: "456 Oak Avenue, Suite 200, Springfield, IL, 62704, USA",
    },
    {
      id: "3",
      name: "Financial Wizards",
      type: "Financial Services",
      address: "789 Elm Boulevard, Tower 3, Springfield, IL, 62704, USA",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editedBusiness, setEditedBusiness] = useState<Business | null>(null)

  const currentBusiness = businesses[currentIndex]

  const handleNext = () => {
    if (isEditing) return
    setCurrentIndex((prev) => (prev + 1) % businesses.length)
  }

  const handlePrevious = () => {
    if (isEditing) return
    setCurrentIndex((prev) => (prev - 1 + businesses.length) % businesses.length)
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedBusiness({ ...currentBusiness })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedBusiness(null)
  }

  const handleSaveEdit = () => {
    if (!editedBusiness) return
    const updatedBusinesses = [...businesses]
    updatedBusinesses[currentIndex] = editedBusiness
    setBusinesses(updatedBusinesses)
    onEdit(editedBusiness)
    setIsEditing(false)
    setEditedBusiness(null)
    toast.success("Business details updated", {
      description: `Updated details for ${editedBusiness.name}`,
    })
  }

  const handleInputChange = (field: keyof Business, value: string) => {
    if (!editedBusiness) return
    setEditedBusiness({ ...editedBusiness, [field]: value })
  }

  if (!client || !currentBusiness) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen && isEditing) {
          handleCancelEdit()
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Info className="h-5 w-5" />
            <DialogTitle className="text-xl font-semibold text-gray-900">Business Information</DialogTitle>
          </div>
          <p className="text-sm text-gray-600 font-normal">Business Information for {client.name}</p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Client */}
          <div className="space-y-2">
            <Label className="text-normal font-semibold text-purple-500 ">Client</Label>
            <div className="text-gray-600 text-sm">{client.name}</div>
          </div>

          <Separator />

          {/* Business Information Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-600">
                <Info className="h-4 w-4" />
                <h3 className="text-sm font-medium">Business Information</h3>
              </div>
              {!isEditing && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={handlePrevious}
                    disabled={businesses.length <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous business</span>
                  </Button>
                  <span className="text-xs border py-2 px-4 border-purple-700 text-purple-700 rounded-full">
                    {currentIndex + 1} of {businesses.length} Businesses
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={handleNext}
                    disabled={businesses.length <= 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next business</span>
                  </Button>
                </div>
              )}
            </div>
            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Name</Label>
                {isEditing ? (
                  <Input
                    value={editedBusiness?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm font-medium">{currentBusiness.name}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Business Type</Label>
                {isEditing ? (
                  <Select
                    value={editedBusiness?.type || ""}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-medium">{currentBusiness.type}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Address</Label>
              {isEditing ? (
                <Textarea
                  value={editedBusiness?.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-sm font-medium">{currentBusiness.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveEdit}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleEditClick}>
              Edit Details
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
