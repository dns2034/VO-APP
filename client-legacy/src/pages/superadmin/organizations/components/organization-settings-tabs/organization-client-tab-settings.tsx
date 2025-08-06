"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const OrganizationClientTabSettings = () => {
  const [organization, setOrganization] = useState("all")
  const [maxClients, setMaxClients] = useState("24")

  const handleSave = () => {
    // Handle save logic here
    console.log({ organization, maxClients })
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Client Management</h3>
      <p className="text-sm text-muted-foreground">Configure client access and permissions</p>

      <div className="space-y-6 pt-2">
        <div className="space-y-2">
          <p className="text-sm">Select Organizations</p>
          <Select value={organization} onValueChange={setOrganization}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              <SelectItem value="org1">Organization 1</SelectItem>
              <SelectItem value="org2">Organization 2</SelectItem>
              <SelectItem value="org3">Organization 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm">Maximum Client Count</p>
          <Input type="number" value={maxClients} onChange={(e) => setMaxClients(e.target.value)} className="w-full" />
          <p className="text-xs text-muted-foreground">The maximum number of clients allowed in this organization</p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
