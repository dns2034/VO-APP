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
import { format } from "date-fns";
import { toast } from "sonner";
import { BookingsService } from "@/services/bookings.service";
import { useBranches } from "@/hooks/useBranches";

export default function BookingDrawer() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [branch, setBranch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { branches, loading: branchesLoading } = useBranches();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !branch) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await BookingsService.create({
        date: date.toISOString().slice(0, 10),
        start_time: startTime,
        end_time: endTime,
        branch,
        status: "active",
      });
      toast.success("Booking created!");
      setDate(undefined);
      setStartTime("");
      setEndTime("");
      setBranch("");
      setOpen(false);
    } catch (err: any) {
      toast.error(
        "Failed to create booking: " + (err?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">Add Booking</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Booking</DrawerTitle>
        </DrawerHeader>
        <form className="space-y-6 p-4" onSubmit={handleSubmit}>
          <div>
            <Label className="mb-2 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            {date && (
              <div className="mt-2 text-sm text-muted-foreground">
                Selected: {format(date, "PPP")}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="branch">Select Branch</Label>
            <Select
              value={branch}
              onValueChange={setBranch}
              required
              disabled={branchesLoading}
            >
              <SelectTrigger id="branch">
                <SelectValue placeholder="Choose a branch" />
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
