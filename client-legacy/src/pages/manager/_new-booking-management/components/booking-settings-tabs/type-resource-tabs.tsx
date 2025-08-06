import { Checkbox } from "@/components/ui/checkbox";
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

const ResourceTypeTab = () => {
  const [meetingRoomsEnabled, setMeetingRoomsEnabled] = useState(true);
  const [desksEnabled, setDesksEnabled] = useState(false);
  const [minTime, setMinTime] = useState(24);
  const [timeUnit, setTimeUnit] = useState("hours");

  const handleMeetingRoomsChange = (checked: boolean) => {
    setMeetingRoomsEnabled(checked);
  };

  const handleDesksChange = (checked: boolean) => {
    setDesksEnabled(checked);
  };

  const handleMinTimeChange = (value: string) => {
    const newValue = parseInt(value);
    setMinTime(newValue);
  };

  const handleTimeUnitChange = (value: string) => {
    setTimeUnit(value);
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-medium">
          Resource-Specific Cancellation Policies
        </h3>
        <p className="text-sm text-muted-foreground">
          Set different cancellation timeframes for each resource type
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="meeting-rooms" 
            checked={meetingRoomsEnabled}
            onCheckedChange={handleMeetingRoomsChange}
          />
          <Label htmlFor="meeting-rooms" className="font-normal">
            Meeting Rooms
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="desks" 
            checked={desksEnabled}
            onCheckedChange={handleDesksChange}
          />
          <Label htmlFor="desks" className="font-normal">
            Desks
          </Label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="min-time-resource">Minimum Time</Label>
          <Input 
            id="min-time-resource" 
            type="number" 
            value={minTime}
            onChange={(e) => handleMinTimeChange(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            The minimum amount of time before the booking
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time-unit-resource">Time Unit</Label>
          <Select value={timeUnit} onValueChange={handleTimeUnitChange}>
            <SelectTrigger id="time-unit-resource">
              <SelectValue placeholder="Select a time unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hours">Hours</SelectItem>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="minutes">Minutes</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            The unit of time for the cancellation period
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceTypeTab;
