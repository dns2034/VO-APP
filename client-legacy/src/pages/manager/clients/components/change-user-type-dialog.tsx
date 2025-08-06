import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { TUserProfile } from "@/types";
import { useState } from "react";

interface ChangeUserTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}

type UserType = "Primary" | "Supplementary";

export function ChangeUserTypeDialog({
  open,
  onOpenChange,
  client,
}: ChangeUserTypeDialogProps) {
  const [selectedType, setSelectedType] = useState<UserType>("Primary");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirm = () => {
    // TODO: Implement the actual user type change logic here
    console.log(`Changing user type to ${selectedType}`);
    setShowConfirmation(false);
    onOpenChange(false);
  };

  if (!client) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-purple-600">👤</span>
              Change User Type
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Update the user type for {client.first_name} {client.last_name}
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium">Current Type:</label>
              <p className="text-sm text-muted-foreground">Primary</p>
            </div>

            <div className="space-y-2">
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as UserType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select new type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Supplementary">Supplementary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to change this user's type to {selectedType}.{"\n"}
              Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleFinalConfirm}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
