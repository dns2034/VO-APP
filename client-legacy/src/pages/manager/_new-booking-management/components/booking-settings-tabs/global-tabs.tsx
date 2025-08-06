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

const GlobalTab = () => {
    const [minTime, setMinTime] = useState(24);
    const [timeUnit, setTimeUnit] = useState("hours");

    const handleMinTimeChange = (value: string) => {
        const newValue = parseInt(value);
        setMinTime(newValue);
    };

    const handleTimeUnitChange = (value: string) => {
        setTimeUnit(value);
    };

    return (
        <div className="space-y-4 py-4 px-1 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                    <Label htmlFor="min-time">Minimum Time</Label>
                    <Input 
                        id="min-time" 
                        type="number" 
                        value={minTime}
                        onChange={(e) => handleMinTimeChange(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                        The minimum amount of time before the booking
                    </p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time-unit">Time Unit</Label>
                    <Select value={timeUnit} onValueChange={handleTimeUnitChange}>
                        <SelectTrigger>
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

export default GlobalTab;
