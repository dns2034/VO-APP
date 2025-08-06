
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const OrganizationAllocationsTabSettings = () => {
  const [maxStorage, setMaxStorage] = useState("10")
  const [maxBandwidth, setMaxBandwidth] = useState("50")

  const handleSave = () => {
    // Handle save logic here
    console.log({
      maxStorage,
      maxBandwidth,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm">Maximum Storage per Client (GB)</p>
          <Input type="number" value={maxStorage} onChange={(e) => setMaxStorage(e.target.value)} className="w-full" />
          <p className="text-xs text-muted-foreground">
            The maximum storage space allocated to each client in gigabytes
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm">Maximum Bandwidth per Client (GB)</p>
          <Input
            type="number"
            value={maxBandwidth}
            onChange={(e) => setMaxBandwidth(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            The maximum monthly bandwidth allocated to each client in gigabytes
          </p>
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
