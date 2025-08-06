import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddClientDialog = () => {
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  return (
    <Dialog
      open={isAddClientDialogOpen}
      onOpenChange={setIsAddClientDialogOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full md:w-32" >Add client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:w-full w-96 ">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <UserPlus className="h-5 w-5 text-purple-600" />
            </div>
            <DialogTitle>Add Client</DialogTitle>
          </div>
          <DialogDescription>
            Enter details to add a new client.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="organization">Organization</Label>
              <Select>
                <SelectTrigger id="organization">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Inc</SelectItem>
                  <SelectItem value="globex">Globex Corp</SelectItem>
                  <SelectItem value="stark">Stark Industries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsAddClientDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={() => {
            const now = new Date()
            toast.success("Client: Successfully Added", {
                description: `${format(now, 'EEEE, MMMM dd, yyyy')} at ${format(now, 'p')}`
            });
            setIsAddClientDialogOpen(false);
          }} className="bg-purple-600 hover:bg-purple-700">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
