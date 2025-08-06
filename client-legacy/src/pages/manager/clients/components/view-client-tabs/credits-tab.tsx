import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CreditsTabProps {
  client: { credits: number } | null
  onClose: () => void
}

export const CreditsTab = ({ client, onClose }: CreditsTabProps) => {
  const [addCredits, setAddCredits] = useState("")
  const [deductCredits, setDeductCredits] = useState("")

  const handleCreditsAddChange = (value: string) => {
    const num = Number(value)
    if (num >= 0 || value === "") setAddCredits(value)
  }

  const handleCreditsDeductChange = (value: string) => {
    const num = Number(value)
    if ((num <= 0 && value !== "") || value === "-") setDeductCredits(value)
  }

  const handleCreditsSubmit = () => {
    const addValue = Number(addCredits)
    const deductValue = Number(deductCredits)

    if ((!addCredits || isNaN(addValue) || addValue < 0) &&
        ((!deductCredits || isNaN(deductValue)) || deductValue > 0)) {
      toast.error("Enter valid amounts to update credits")
      return
    }

    if (addValue > 0) toast.success(`Added ${addValue} credits`)
    if (deductValue < 0) toast.success(`Deducted ${Math.abs(deductValue)} credits`)

    setAddCredits("")
    setDeductCredits("")
    onClose()
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        {client && (
          <h3 className="pb-5 flex w-full justify-between items-center">
            <span>Current Credits</span>
            <span className="border p-2 min-w-[40px] flex justify-center rounded-full border-purple-300">
              {client.credits}
            </span>
          </h3>
        )}
        <Label htmlFor="credits-add">Add Credits</Label>
        <Input
          id="credits-add"
          type="number"
          placeholder="Enter amount to add"
          value={addCredits}
          onChange={(e) => handleCreditsAddChange(e.target.value)}
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="credits-deduct">Deduct Credits</Label>
        <Input
          id="credits-deduct"
          type="number"
          placeholder="Enter amount to deduct"
          value={deductCredits}
          onChange={(e) => handleCreditsDeductChange(e.target.value)}
          max="0"
        />
      </div>

      <Button className="w-full mt-4" onClick={handleCreditsSubmit}>
        Update Credits
      </Button>
    </div>
  )
}
