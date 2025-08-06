import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function BookingLimit() {
  return (
    <div className="space-y-6 ">
      

      <div className="space-y-4">
        <div>
          <Label htmlFor="client-select">Select Client</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Client</SelectItem>
              <SelectItem value="limit"></SelectItem>
              <SelectItem value="specific"></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="booking-limit">Booking Limit</Label>
          <Input
            id="booking-limit"
            type="number"
            placeholder="10"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-purple-700">Save Changes</Button>
      </div>
    </div>
  );
}