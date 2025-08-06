import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

export default function DateAndThresholdsTab({
  setClose,
}: {
  setClose: () => void;
}) {
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-md px-5 py-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-sm font-semibold text-purple-600">
                Points Expiration
              </Label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Configure how long points remain valid before expiring
            </p>
          </div>
          <Input
            className="w-40 h-8 text-sm ml-4"
            placeholder="30"
            type="number"
          />
        </div>

        <div className="flex items-center justify-between border rounded-md px-5 py-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-sm font-semibold text-purple-600">
                Redemption Threshold
              </Label>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Set the minimum number of points required before users can redeem
            </p>
          </div>
          <div className="relative">
            <Input
              className="w-40 h-8 text-sm ml-4"
              placeholder="100"
              type="number"
            />
          </div>
        </div>
        <div className="pb-4">
          <p className="flex items-center gap-1 text-xs text-gray-500 mb-4">
            <Info className="w-4 h-4 text-gray-400" /> Configure how reward
            points expire and can be redeemed by users
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
    </>
  );
}
