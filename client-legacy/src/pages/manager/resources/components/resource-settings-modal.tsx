import CustomAlertDialog from "@/components/generics/custom-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useState } from "react";

type ResourceSettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (settings: {
    coWorkingSpaceApproval: boolean;
    meetingRoomApproval: boolean;
  }) => void;
};

export const ResourceSettingsModal = ({
  open,
  onOpenChange,
  onSave,
}: ResourceSettingsModalProps) => {
  const [coWorkingSpaceApproval, setCoWorkingSpaceApproval] = useState(false);
  const [meetingRoomApproval, setMeetingRoomApproval] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    type: "coWorkingSpace" | "meetingRoom";
    value: boolean;
  } | null>(null);

  const handleSwitchChange = (
    type: "coWorkingSpace" | "meetingRoom",
    value: boolean
  ) => {
    setPendingChange({ type, value });
    setShowAlert(true);
  };

  const confirmChange = () => {
    if (!pendingChange) return;

    if (pendingChange.type === "coWorkingSpace") {
      setCoWorkingSpaceApproval(pendingChange.value);
    } else {
      setMeetingRoomApproval(pendingChange.value);
    }

    setShowAlert(false);
    setPendingChange(null);
  };

  const saveSettings = () => {
    onSave?.({
      coWorkingSpaceApproval,
      meetingRoomApproval,
    });
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px] w-11/12 md:w-full rounded">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-700" />
              Settings
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Configure settings for Spaces
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <div className="w-full flex border py-3 justify-center">
              <h1 className="">Configure Space Approval</h1>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-purple-700">
                      Co-Working Space
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enable this to make all Co-Working Space bookings for this
                      space require approval by a manager.
                    </p>
                  </div>
                  <Switch
                    checked={coWorkingSpaceApproval}
                    onCheckedChange={(value) =>
                      handleSwitchChange("coWorkingSpace", value)
                    }
                    className="data-[state=checked]:bg-purple-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-purple-700">
                      Conference Room
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enable this to make all Conference Room bookings for this
                      space require approval by a manager.
                    </p>
                  </div>
                  <Switch
                    checked={meetingRoomApproval}
                    onCheckedChange={(value) =>
                      handleSwitchChange("meetingRoom", value)
                    }
                    className="data-[state=checked]:bg-purple-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 rounded-md"
              >
                Save Settings
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CustomAlertDialog
        open={showAlert}
        onOpenChange={setShowAlert}
        title="Confirm Setting Change"
        description={`Are you sure you want to ${
          pendingChange?.value ? "enable" : "disable"
        } approval requirement for ${
          pendingChange?.type === "coWorkingSpace"
            ? "Co-Working Space"
            : "Conference Room"
        }?`}
        onConfirm={confirmChange}
        variant="info"
        confirmText="Confirm Change"
        cancelText="Cancel"
      />
    </>
  );
};
