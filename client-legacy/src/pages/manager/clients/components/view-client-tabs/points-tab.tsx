import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface PointsTabProps {
  client: { points: number } | null
  onClose: () => void
}

export const PointsTab = ({ client, onClose }: PointsTabProps) => {
  const [addPoints, setAddPoints] = useState("")
  const [deductPoints, setDeductPoints] = useState("")

  const handlePointsAddChange = (value: string) => {
    const num = Number(value)
    if (num >= 0 || value === "") setAddPoints(value)
  }

  const handlePointsDeductChange = (value: string) => {
    const num = Number(value)
    if ((num <= 0 && value !== "") || value === "-") setDeductPoints(value)
  }

  const handlePointsSubmit = () => {
    const addValue = Number(addPoints)
    const deductValue = Number(deductPoints)

    if ((!addPoints || isNaN(addValue) || addValue < 0) &&
        ((!deductPoints || isNaN(deductValue)) || deductValue > 0)) {
      toast.error("Enter valid amounts to update points")
      return
    }

    if (addValue > 0) toast.success(`Added ${addValue} points`)
    if (deductValue < 0) toast.success(`Deducted ${Math.abs(deductValue)} points`)

    setAddPoints("")
    setDeductPoints("")
    onClose()
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        {client && (
          <h3 className="pb-5 flex w-full justify-between items-center">
            <span>Current Points</span>
            <span className="border p-2 min-w-[40px] flex justify-center rounded-full border-purple-300">
              {client.points}
            </span>
          </h3>
        )}
        <Label htmlFor="points-add">Add Points</Label>
        <Input
          id="points-add"
          type="number"
          placeholder="Enter amount to add"
          value={addPoints}
          onChange={(e) => handlePointsAddChange(e.target.value)}
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="points-deduct">Deduct Points</Label>
        <Input
          id="points-deduct"
          type="number"
          placeholder="Enter amount to deduct"
          value={deductPoints}
          onChange={(e) => handlePointsDeductChange(e.target.value)}
          max="0"
        />
      </div>

      <Button className="w-full mt-4" onClick={handlePointsSubmit}>
        Update Points
      </Button>
    </div>
  )
}
