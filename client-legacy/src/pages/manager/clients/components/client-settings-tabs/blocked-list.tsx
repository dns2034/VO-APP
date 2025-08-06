import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlockedListTable from "../blocked-list-table";

export const BlockedList = () => {
  const [maxStorage, _] = useState("10");
  const [maxBandwidth, __] = useState("50");

  const handleSave = () => {
    // Handle save logic here
    console.log({
      maxStorage,
      maxBandwidth,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <BlockedListTable />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
