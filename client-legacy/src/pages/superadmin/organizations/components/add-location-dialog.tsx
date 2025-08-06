import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";
import { toast } from "sonner";

type AddLocationDialogProps = {
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationAdded: () => void;
};

export const AddLocationDialog = ({
  organizationId,
  open,
  onOpenChange,
  onLocationAdded,
}: AddLocationDialogProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically call your API to add the location
      console.log("Adding location:", { organizationId, name, address });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success("Location added successfully");
      onOpenChange(false);
      onLocationAdded();
      setName("");
      setAddress("");
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add location");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <div className="relative">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              <Building className="text-violet-500" />
              Add New Location
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Main Branch"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting || !name || !address}
            >
              {isSubmitting ? "Adding..." : "Add Location"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
