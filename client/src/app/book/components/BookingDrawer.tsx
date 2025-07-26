"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useBranches } from "@/hooks/useBranches";
import { useBookings } from "@/hooks/useBookings";
import { useSpaces } from "@/hooks/useSpaces";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Building2,
  MapPin,
  Clock,
  StickyNote,
} from "lucide-react"; // lucide-react icons

export default function BookingDrawer({ branchId }: { branchId: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [branch, setBranch] = useState<string>(branchId);
  const [loading, setLoading] = useState(false);
  const { branches, loading: branchesLoading } = useBranches();
  const { spaces, loading: spacesLoading } = useSpaces();
  const [spaceId, setSpaceId] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  // Filter spaces by selected branch
  const filteredSpaces = branch
    ? spaces.filter((s) => s.branch_id === branch)
    : [];

  const { createBooking, fetchBookings } = useBookings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !branch || !spaceId) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        date: date.toISOString().slice(0, 10),
        start_time: startTime,
        end_time: endTime,
        space_id: spaceId,
        status: "booked",
      });
      toast.success("Booking created!");
      setDate(undefined);
      setStartTime("");
      setEndTime("");
      setBranch("");
      setSpaceId("");
      setOpen(false);
      fetchBookings();
      setRemarks("");
    } catch (err: unknown) {
      toast.error(
        "Failed to create booking: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="text-xs flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          Book
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0 flex flex-col max-h-[90vh]">
        <div className="sticky top-0 z-10 bg-white">
          <DrawerHeader className="px-6 pt-4 pb-2 flex items-center gap-2">
            <DrawerTitle className="text-lg font-bold">New Booking</DrawerTitle>
          </DrawerHeader>
        </div>
        <Separator />
        <form
          className="flex-1 overflow-y-auto px-6 py-4 space-y-8"
          onSubmit={handleSubmit}
        >
          {/* Select Space Section */}
          <div className="flex flex-col gap-3 mb-3">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex flex-row gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-base font-semibold gap-0">
                  Pick a Space
                </span>
              </div>

              <p className="text-sm mt-0!">A space that suites your needs.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="branch"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Branch
                </Label>
                <Select
                  value={branch}
                  onValueChange={(val) => {
                    setBranch(val);
                    setSpaceId("");
                  }}
                  required
                  disabled={branchesLoading}
                >
                  <SelectTrigger
                    id="branch"
                    className="rounded-md border px-3 py-2 bg-white"
                  >
                    <SelectValue placeholder="Choose a branch..." />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="space"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Space
                </Label>
                <Select
                  value={spaceId}
                  onValueChange={setSpaceId}
                  required
                  disabled={!branch || spacesLoading}
                >
                  <SelectTrigger
                    id="space"
                    className="rounded-md border px-3 py-2 bg-white"
                  >
                    <SelectValue placeholder="Choose a space" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSpaces.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />

          {/* Select Date Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Select Date</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="p-2 flex items-center justify-center rounded-lg border bg-muted">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
          <Separator />

          {/* Select Time Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Pick a Time Slot</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label
                  htmlFor="start-time"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Start Time
                </Label>
                <div className="relative">
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label
                  htmlFor="end-time"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  End Time
                </Label>
                <div className="relative">
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Remarks Section */}
          <div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="remarks"
                className="text-sm font-medium flex items-center gap-2"
              >
                Remarks (Optional)
              </Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Additional notes or requests"
                className="rounded-md border px-3 py-2 min-h-[80px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
