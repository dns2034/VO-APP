"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const BookingRules = () => {
  const [space, setSpace] = useState("all");
  const [maxDuration, setMaxDuration] = useState("60");

  const handleSave = () => {
    // Handle save logic here
    console.log({ space, maxDuration });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-6 pt-2">
        <div className="space-y-2">
          <p className="text-sm">Select Spaces</p>
          <Select value={space} onValueChange={setSpace}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Space" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Spaces</SelectItem>
              <SelectItem value="org1">Desk</SelectItem>
              <SelectItem value="org2">Conference Room</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Select the space type to configure the booking rules.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm">Maximum Booking Duration (minutes)</p>
          <Input
            type="number"
            value={maxDuration}
            onChange={(e) => setMaxDuration(e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            The maximum duration a space can be booked for a single reservation.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
