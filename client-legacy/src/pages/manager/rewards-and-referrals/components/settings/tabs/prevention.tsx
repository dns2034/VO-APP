import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { useState } from "react";

export default function PreventionTab({ setClose }: { setClose: () => void }) {
  const [enabled1, setEnabled1] = useState<boolean>(false);
  const [enabled2, setEnabled2] = useState<boolean>(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border rounded-md px-5 py-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Label className="text-sm font-semibold text-purple-600">
              Prevent same phone number with multiple emails
            </Label>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">
            After confirming, you'll receive a temporary password that you can
            share with the user
          </p>
        </div>
        <Switch
          className={cn(enabled1 && "data-[state=checked]:bg-emerald-400")}
          checked={enabled1}
          onCheckedChange={setEnabled1}
        />
      </div>
      <div className="flex items-center justify-between border rounded-md px-5 py-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Label className="text-sm font-semibold text-purple-600">
              Prevent same email with multiple phone numbers
            </Label>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500">
            Block attempts to use the same email with different phone numbers
          </p>
        </div>
        <Switch
          className={cn(enabled2 && "data-[state=checked]:bg-emerald-400")}
          checked={enabled2}
          onCheckedChange={setEnabled2}
        />
      </div>
      <div className="pb-4">
        <p className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <Info className="w-4 h-4 text-gray-400" /> This settings help prevent
          fraudulent referrals in the system
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setClose();
            }}
            className="text-sm px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2"
            onClick={() => {
              setClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
