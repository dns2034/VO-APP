"use client"

import { useState } from "react"
import { Briefcase, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent,  SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddBusinessInformationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: { id: string; name: string; email: string } | null
  onSubmit: (data: AddBusinessFormData) => void
}

export interface AddBusinessFormData {
  businessName: string
  businessType: string
  address: string
}

export const AddBusinessInformationDialog = ({ open, onOpenChange, client, onSubmit }: AddBusinessInformationDialogProps) => {
  const [formData, setFormData] = useState<AddBusinessFormData>({
    businessName: "",
    businessType: "",
    address: "",
  })

  const handleChange = (field: keyof AddBusinessFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onOpenChange(false)
    // Reset form after submission
  
  }

  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Briefcase className="h-5 w-5" />
            <DialogTitle className="text-xl font-semibold text-gray-900">Add Business Information</DialogTitle>
          </div>
          <p className="text-sm text-gray-600 font-normal">Create a new business information for {client.name}</p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Reminder */}
          <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-600">Reminder</p>
                <p className="text-xs text-gray-600">
                  Fill in the details for the new business. All fields are required unless marked optional.
                </p>
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Client</Label>
            <div className="bg-gray-100 p-2 rounded-md text-gray-800">{client.name}</div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Briefcase className="h-4 w-4" />
              <h3 className="text-sm font-medium">Business Details</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-xs">
                  Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-xs">
                  Type
                </Label>
                <Select value={formData.businessType} onValueChange={(value) => handleChange("businessType", value)}>
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-xs">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter business address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2 mt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>
            Add Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
