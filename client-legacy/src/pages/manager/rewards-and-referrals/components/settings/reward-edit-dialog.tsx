import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import RewardEditAlertDialog from "./reward-edit-alert-dialog";

export default function RewardEditSettingsDialog() {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [formData, setFormData] = useState({
    rewardName: "1-Day Coworking Pass",
    description:
      "Enjoy a full day of coworking access with High-Speed wi-Fi, comfortable workspaces, and productive environment perfect for remote work or collaboration.",
    price: "1 Point",
  });

  const isError = false; // for toast response

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const fieldName = id === "reward-name" ? "rewardName" : id;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", { ...formData, enabled });
    setOpen(false);
    setAlertOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size={"icon"}
            className="border-gray-200 text-gray-800 hover:bg-gray-50"
          >
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-row items-center gap-2">
            <Settings className="h-6 w-6 text-purple-500" />
            <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-6 text-gray-600">
              Configure settings for Rewards & Referrals
            </p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="coworking-toggle"
                  className="text-sm font-medium text-purple-600"
                >
                  1-Day Coworking Pass
                </Label>
                <Switch
                  id="coworking-toggle"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="reward-name"
                  className="block text-sm font-medium text-purple-600"
                >
                  Reward Name
                </label>
                <Input
                  id="reward-name"
                  value={formData.rewardName}
                  onChange={handleChange}
                  className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-purple-600"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px] w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-purple-600"
                >
                  Price
                </label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-800 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RewardEditAlertDialog
        open={alertOpen}
        setCancel={() => {
          setAlertOpen(false);
          setOpen(true);
        }}
        setSave={() => {
          setAlertOpen(false);
          setOpen(false);

          if (isError) {
            toast.error("Rewards: Failed to save changes", {
              description: new Date().toDateString(),
              action: {
                label: "Confirm",
                onClick: () => console.log("Confirmed"),
              },
            });
          } else {
            toast.success("Rewards: Saved Changes", {
              description: new Date().toDateString(),
              action: {
                label: "Confirm",
                onClick: () => console.log("Confirmed"),
              },
            });
          }
        }}
      />
    </>
  );
}
