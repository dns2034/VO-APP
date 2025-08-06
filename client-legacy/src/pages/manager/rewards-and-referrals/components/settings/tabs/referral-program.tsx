import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { useState } from "react";
import ReferralProgramAlertDialog from "../referral-program-alert-dialog";

export default function ReferralProgramTab({
  setClose,
}: {
  setClose: () => void;
}) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-md px-5 py-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-sm font-semibold text-purple-600">
                Referral Program Control
              </Label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Activate or deactivate the referral program by toggling the button
            </p>
          </div>
          <Switch
            className={cn(enabled && "data-[state=checked]:bg-emerald-400")}
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        <div className="flex items-center justify-between border rounded-md px-5 py-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-sm font-semibold text-purple-600">
                Referral Program Status
              </Label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              The status on the right shows if the referral program is active or
              inactive.
            </p>
          </div>
          <div className="relative">
            <p
              className={cn(
                "text-xs",
                enabled ? "text-emerald-500" : "text-red-500"
              )}
            >
              {enabled ? "Active" : "In Active"}
            </p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <p className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <Info className="w-4 h-4 text-gray-400" /> These settings control the
          referral program. Enabling allows users to refer others and earn
          rewards, while disabling halts all active referrals and rewards.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setAlertOpen(false);
              setClose();
            }}
            className="text-sm px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2"
            onClick={() => {
              setAlertOpen(true);
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <ReferralProgramAlertDialog
        open={alertOpen}
        setCancel={() => setAlertOpen(false)}
        enabled={enabled}
        setClose={() => {
          setAlertOpen(false);
          setClose();
        }}
      />
    </>
  );
}
