import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LeaderboardFilterHeader() {
  return (
    <div className="flex justify-between items-center w-full">
      <Select defaultValue="booking">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Top" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="booking">Top Bookings</SelectItem>
          <SelectItem value="referral">Top Referrals</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Filter users by name or email..."
        className="max-w-72"
      />
    </div>
  );
}
