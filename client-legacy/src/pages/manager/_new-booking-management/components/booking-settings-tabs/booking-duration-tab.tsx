import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const BookingDurationTab = () => {
  const [resourceType, setResourceType] = useState("");
  const [maxDuration, setMaxDuration] = useState(5);

  const handleResourceTypeChange = (value: string) => {
    setResourceType(value);
  };

  const handleMaxDurationChange = (value: string) => {
    const newValue = parseInt(value);
    setMaxDuration(newValue);
  };

  return (
    <div className="space-y-6 py-4 px-1 sm:px-0">
      <div className="space-y-2">
        <Label htmlFor="resource-type-duration">Resource Type</Label>
        <Select value={resourceType} onValueChange={handleResourceTypeChange}>
          <SelectTrigger id="resource-type-duration">
            <SelectValue placeholder="Select Resources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting-room">Meeting Room</SelectItem>
            <SelectItem value="desk">Desk</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Select the resource type to configure booking duration
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-booking-duration">
          Maximum Booking Duration (hours)
        </Label>
        <Input 
          id="max-booking-duration" 
          type="number" 
          value={maxDuration}
          onChange={(e) => handleMaxDurationChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          The maximum duration cannot exceed 24 hours
        </p>
      </div>
    </div>
  );
};

export default BookingDurationTab; 