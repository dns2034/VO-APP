import { UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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

interface BlockClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BlockClientDialog = ({
  open,
  onOpenChange,
}: BlockClientDialogProps) => {
  const [email, setEmail] = useState("johndoe@incub8space.com");
  const [selectedResource, setSelectedResource] = useState("all");
  const [selectedResources] = useState<string[]>(["all"]);

  const resources = [
    { id: "all", name: "All Resources" },
    { id: "meeting", name: "Meeting Room" },
    { id: "coworking", name: "Co-Working" },
  ];

  const handleConfirm = () => {
    try {
      console.log("Blocking client:", {
        email,
        resources: selectedResources,
      });

      toast.success("Client blocked successfully", {
        description: `${email} has been blocked from accessing ${
          selectedResource === "all"
            ? "all resources"
            : resources.find((resource) => resource.id === selectedResource)
                ?.name
        }`,
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to block client", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 md:w-full rounded">
        <DialogHeader className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <UserX className="h-6 w-6 text-purple-600" />
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Block Client
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600 font-normal">
            Control Client Access to Resources
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resources">Select Resources</Label>
            <Select
              value={selectedResource}
              onValueChange={setSelectedResource}
            >
              <SelectTrigger name="resources" className="w-full">
                <SelectValue placeholder="Select resources" />
              </SelectTrigger>
              <SelectContent>
                {resources.map((resource) => (
                  <SelectItem key={resource.id} value={resource.id}>
                    {resource.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
