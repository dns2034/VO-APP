import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ResourceManagementModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    resource: string;
    client: string;
    priority: "Primary" | "Supplementary" | "Non-member";
  }) => void;
};

const mockResources = [
  "Premium Workspace A",
  "Conference Room X",
  "Private Office B",
  "Meeting Room C",
];

const mockClients = [
  "Acme Corporation",
  "Globex Inc.",
  "Stark Industries",
  "Wayne Enterprises",
];

export const ResourceManagementModal = ({
  open,
  onOpenChange,
  onSubmit,
}: ResourceManagementModalProps) => {
  const [resource, setResource] = useState("");
  const [client, setClient] = useState("");
  const [priority, setPriority] = useState<
    "Primary" | "Supplementary" | "Non-member"
  >("Primary");

  const handleSubmit = () => {
    if (!resource || !client) return;
    onSubmit({ resource, client, priority });
    setResource("");
    setClient("");
    setPriority("Primary");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-11/12 md:w-full rounded">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="text-purple-600" />
            Resource Management
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Assign priority levels to clients for high-demand resources
          </p>
          <div className="w-full flex justify-center p-1 text-normal border bg-purple-700 text-gray-100 rounded-sm">
            <h1>Assign Priority Access</h1>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Select High-Demand Resource</h3>
            <Select onValueChange={setResource} value={resource}>
              <SelectTrigger>
                <SelectValue placeholder="Select a resource" />
              </SelectTrigger>
              <SelectContent>
                {mockResources.map((res) => (
                  <SelectItem key={res} value={res}>
                    {res}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Select Client for Priority Access</h3>
            <Select onValueChange={setClient} value={client}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((cli) => (
                  <SelectItem key={cli} value={cli}>
                    {cli}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Assign Priority Access Level</h3>
            <RadioGroup
              defaultValue="Primary"
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "Primary" | "Supplementary" | "Non-member")
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Primary" id="primary" />
                <Label htmlFor="primary">Primary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Supplementary" id="supplementary" />
                <Label htmlFor="supplementary">Supplementary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Non-member" id="non-member" />
                <Label htmlFor="non-member">Non-member</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-purple-700 hover:bg-purple-600"
            onClick={handleSubmit}
            disabled={!resource || !client}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};