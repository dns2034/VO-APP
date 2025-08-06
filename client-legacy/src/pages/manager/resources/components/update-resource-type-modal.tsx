import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes } from "lucide-react";
import { useState } from "react";

type ResourceTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; description: string; spaceType: string }) => void;
  initialData?: {
    name: string;
    description: string;
    spaceType: string;
  };
};

const spaceTypeOptions = [
  "Co-Working Space",
  "Private Office",
  "Meeting Room A",
  "Meeting Room B",
  "Meeting Room C",
];

export const UpdateResourceTypeModal = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: ResourceTypeModalProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [spaceType, setSpaceType] = useState(initialData?.spaceType || "");

  const handleSubmit = () => {
    if (!spaceType) return; // prevent submitting with no selected spaceType
    onSubmit({ name, description, spaceType });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-11/12 md:w-full rounded">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Boxes className="text-purple-600"/>Update Resource Type</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update details for this resource type.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Resource Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="spaceType">Space Type</Label>
            <Select onValueChange={setSpaceType} value={spaceType}>
              <SelectTrigger id="spaceType">
                <SelectValue placeholder="Select space type" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="" onClick={handleSubmit}>
            Update Resource Type
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};