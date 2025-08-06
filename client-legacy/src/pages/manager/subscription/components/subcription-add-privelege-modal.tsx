import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

interface SubscriptionAddPrivilegeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPrivilege: (privilege: string) => void;
}

export function SubscriptionAddPrivilegeModal({
  open,
  onOpenChange,
  onAddPrivilege,
}: SubscriptionAddPrivilegeModalProps) {
  const [privilege, setPrivilege] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (privilege.trim()) {
      onAddPrivilege(privilege.trim());
      const now = new Date();
      toast.success("Privilege Added Successfully", {
        description: `${format(now, "EEEE, MMMM dd, yyyy")} at ${format(now, "p")}`,
      });
      onOpenChange(false);
      setPrivilege("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800">
              <ShieldCheck className="text-purple-700"/> Add New Privilege
            </DialogTitle>
            <DialogDescription>
              Add a new privilege to this subscription plan
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="privilege">Privilege Name</Label>
              <Input
                id="privilege"
                value={privilege}
                onChange={(e) => setPrivilege(e.target.value)}
                placeholder="Type a new privilege"
                required
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                toast.info("Adding privilege cancelled");
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Privilege</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}