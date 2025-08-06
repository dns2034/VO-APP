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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Building, Plus } from "lucide-react";
import { Subscription } from "./subscription-table";
import { useState, useEffect } from "react";
import { SubscriptionAddPrivilegeModal } from "./subcription-add-privelege-modal";
import { toast } from "sonner";
import { format } from "date-fns";

interface EditPlanModalProps {
  plan: Subscription;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (planData: Subscription) => void;
}

export function EditPlanModal({ plan, open, onOpenChange, onSave }: EditPlanModalProps) {
  const [editedPlan, setEditedPlan] = useState<Subscription>(plan);
  const [privileges, setPrivileges] = useState<Record<string, boolean>>({
    "Access to the space using dedicated access card": true,
    "Free admission to events held in the space": true,
    "Priority use on conference room": true,
    "Use of mailing address": true,
    "Access to the space using a temporary access card": true,
    "No long-term commitment available for first-time members": true,
  });
  const [showAddPrivilege, setShowAddPrivilege] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(open);

  // Sync with parent open state
  useEffect(() => {
    setEditModalOpen(open);
  }, [open]);

  const handleSave = () => {
    onSave(editedPlan);
    const now = new Date();
    toast.success("Plan Updated Successfully", {
      description: `${format(now, "EEEE, MMMM dd, yyyy")} at ${format(now, "p")}`,
    });
    onOpenChange(false);
  };

  const handlePrivilegeToggle = (privilege: string) => {
    setPrivileges(prev => {
      const newState = {
        ...prev,
        [privilege]: !prev[privilege]
      };
      const now = new Date();
      toast.success(`${privilege} ${!prev[privilege] ? "Enabled" : "Disabled"}`, {
        description: `${format(now, "EEEE, MMMM dd, yyyy")} at ${format(now, "p")}`,
      });
      return newState;
    });
  };

  const handleAddPrivilegeClick = () => {
    setEditModalOpen(false);
    setTimeout(() => setShowAddPrivilege(true), 100); // Small delay for smooth transition
  };

  const handleAddPrivilegeClose = () => {
    setShowAddPrivilege(false);
    setTimeout(() => setEditModalOpen(true), 100);
  };

  const handleAddPrivilege = (newPrivilege: string) => {
    setPrivileges(prev => ({
      ...prev,
      [newPrivilege]: true
    }));
    handleAddPrivilegeClose();
  };

  return (
    <>
      {/* Edit Plan Modal */}
      <Dialog open={editModalOpen} onOpenChange={(open) => {
        if (!open) {
          toast.info("Plan editing cancelled");
        }
        onOpenChange(open);
      }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900">
              <Building className="text-purple-800" /> Manage Privileges
            </DialogTitle>
            <DialogDescription>
              Assign and customize user access based on subscription plans.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Selected Plan Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Selected Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plan Name</Label>
                  <Input
                    value={editedPlan.name}
                    onChange={(e) => {
                      setEditedPlan({ ...editedPlan, name: e.target.value });
                      toast.info("Plan name updated");
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={editedPlan.price}
                      onChange={(e) => {
                        setEditedPlan({ ...editedPlan, price: e.target.value });
                        toast.info("Plan price updated");
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={editedPlan.status}
                      onValueChange={(value) => {
                        setEditedPlan({ ...editedPlan, status: value as "Active" | "Inactive" });
                        toast.info(`Plan status changed to ${value}`);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select
                      value={editedPlan.duration}
                      onValueChange={(value) => {
                        setEditedPlan({ ...editedPlan, duration: value });
                        toast.info(`Plan duration changed to ${value}`);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Month">Monthly</SelectItem>
                        <SelectItem value="Quarter">Quarterly</SelectItem>
                        <SelectItem value="Year">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Booking Limit</Label>
                    <Input 
                      type="number" 
                      defaultValue="5"
                      onChange={(e) => {
                        toast.info(`Booking limit updated to ${e.target.value}`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Type Section */}
            <div className="space-y-2">
              <Label>User Type</Label>
              <Select 
                defaultValue="supplementary"
                onValueChange={(value) => {
                  toast.info(`User type changed to ${value}`);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary User</SelectItem>
                  <SelectItem value="supplementary">Supplementary User</SelectItem>
                  <SelectItem value="guest">Guest User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Privileges Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-purple-700 font-bold">Privileges</Label>
                <Button 
                  className="flex items-center gap-3 h-auto" 
                  onClick={handleAddPrivilegeClick}
                >
                  <Plus/>Add Privilege
                </Button>
              </div>
              <div className="space-y-4 border rounded-md p-4 pt-6">
                {Object.entries(privileges).map(([privilege, enabled], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Label htmlFor={`privilege-${index}`} className="font-normal">
                      {privilege}
                    </Label>
                    <Switch
                      id={`privilege-${index}`}
                      checked={enabled}
                      onCheckedChange={() => handlePrivilegeToggle(privilege)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                toast.info("Plan editing cancelled");
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Privilege Modal */}
      <SubscriptionAddPrivilegeModal
        open={showAddPrivilege}
        onOpenChange={handleAddPrivilegeClose}
        onAddPrivilege={handleAddPrivilege}
      />
    </>
  );
}