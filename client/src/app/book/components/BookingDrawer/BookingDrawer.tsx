"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useProductVouchers } from "@/hooks/useProductVouchers";
import { useProducts } from "@/hooks/useProducts";
import { useSpaceAvailability } from "@/hooks/useSpaceAvailability";
import { useSpaceUnits } from "@/hooks/useSpaceUnits";

import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Clock, StickyNote } from "lucide-react";
import { Tables } from "@/types/supabase";

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
  const [spaceUnitId, setSpaceUnitId] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const [selectedVoucherId, setSelectedVoucherId] = useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    useState<Tables<"products"> | null>(null); // <-- Add this line

  const { createBooking, fetchBookings, bookings } = useBookings();
  const { productVouchers, loading: productVouchersLoading } =
    useProductVouchers();
  const { products, loading: productsLoading } = useProducts();
  const { spaceUnits, loading: spaceUnitsLoading } = useSpaceUnits();

  // Use selected date for space availability
  const { availability, loading: availabilityLoading } = useSpaceAvailability(
    spaceId,
    date // <-- pass the selected date
  );

  const filteredSpaces = branch
    ? spaces.filter((s) => s.branch_id === branch)
    : [];

  // Map product.id to space_id (handle space_id possibly being null)
  const productIdToSpaceId = Object.fromEntries(
    products.map((p) => [p.id, p.space_id ?? ""])
  );

  // Filter product vouchers by matching product's space_id to selected spaceId
  const filteredProductVouchers = productVouchers.filter(
    (v) => productIdToSpaceId[v.product_id] === spaceId
  );
  const allFilteredVouchers = useMemo(
    () => [...filteredProductVouchers.map((v) => ({ ...v, type: "product" }))],
    [filteredProductVouchers]
  );

  // Filter space units for the selected space
  const filteredSpaceUnits = spaceUnits.filter(
    (unit) => unit.space_id === spaceId
  );

  // Reset spaceUnitId when spaceId or branch changes
  useEffect(() => {
    setSpaceUnitId("");
  }, [spaceId, branch]);

  // Helper to format date as YYYY-MM-DD in local time
  function formatDateLocal(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Helper to convert "HH:mm" to minutes
  function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  // Helper to convert minutes to "HH:mm"
  function minutesToTime(minutes: number) {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  }

  // Helper to format time as h:mm AM/PM
  function formatTimeAMPM(time: string) {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Compute available time slots based on intersection of availability and bookings
  const availableSlots = useMemo(() => {
    if (!availability || !spaceUnitId || !date) return [];
    const open = timeToMinutes(availability.opening_time);
    const close = timeToMinutes(availability.closing_time);

    // Only consider bookings for the selected space unit and date
    const relevantBookings = bookings.filter(
      (b) => b.space_unit_id === spaceUnitId && b.date === formatDateLocal(date)
    );

    // Sort bookings by start_time
    const sortedBookings = relevantBookings
      .slice()
      .sort(
        (a, b) => timeToMinutes(a.start_time) - timeToMinutes(b.start_time)
      );

    const slots: { start: string; end: string }[] = [];
    let current = open;

    for (const booking of sortedBookings) {
      const bStart = timeToMinutes(booking.start_time);
      const bEnd = timeToMinutes(booking.end_time);

      // Only add slot if current < bStart and bStart > current
      if (current < bStart) {
        // Ensure slot is within the availability window and not reversed
        const slotStart = Math.max(current, open);
        const slotEnd = Math.min(bStart, close);
        if (slotStart < slotEnd) {
          slots.push({
            start: minutesToTime(slotStart),
            end: minutesToTime(slotEnd),
          });
        }
      }
      // Move current pointer forward, but never before the end of this booking
      current = Math.max(current, bEnd);
    }

    // Free slot after last booking
    if (current < close) {
      slots.push({ start: minutesToTime(current), end: minutesToTime(close) });
    }

    // Remove zero-length or negative slots (shouldn't happen, but for safety)
    return slots.filter(
      (slot) => timeToMinutes(slot.end) > timeToMinutes(slot.start)
    );
  }, [availability, bookings, spaceUnitId, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !date ||
      !startTime ||
      !endTime ||
      !branch ||
      !spaceId ||
      !spaceUnitId
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    // Validation: start time < end time
    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      toast.error("Start time must be before end time.");
      return;
    }
    // Validation: minimum 30 minutes
    if (timeToMinutes(endTime) - timeToMinutes(startTime) < 30) {
      toast.error("Minimum booking duration is 30 minutes.");
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        date: formatDateLocal(date), // <-- use local date string
        start_time: startTime,
        end_time: endTime,
        space_unit_id: spaceUnitId,
        status: "booked",
        remarks: remarks,
      });

      toast.success("Booking created!");
      setDate(undefined);
      setStartTime("");
      setEndTime("");
      setBranch("");
      setSpaceId("");
      setSpaceUnitId(""); // <-- reset after booking
      setOpen(false);
      fetchBookings();
      setRemarks("");
      setSelectedVoucherId("");
    } catch (err: unknown) {
      toast.error(
        "Failed to create booking: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  // When voucher is selected, update selectedProduct
  useEffect(() => {
    if (selectedVoucherId) {
      const voucher = allFilteredVouchers.find(
        (v) => v.id === selectedVoucherId
      );
      if (voucher) {
        const product = products.find((p) => p.id === voucher.product_id);
        setSelectedProduct(product ?? null);
      } else {
        setSelectedProduct(null);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [selectedVoucherId, allFilteredVouchers, products]);

  // When voucher or startTime changes, auto-set endTime if voucher is used
  useEffect(() => {
    if (selectedProduct && startTime && selectedProduct.duration) {
      // Add duration (in hours) to startTime
      const [h, m] = startTime.split(":").map(Number);
      const endDate = new Date(0, 0, 0, h, m);
      endDate.setHours(endDate.getHours() + selectedProduct.duration);
      const endH = endDate.getHours().toString().padStart(2, "0");
      const endM = endDate.getMinutes().toString().padStart(2, "0");
      setEndTime(`${endH}:${endM}`);
    }
  }, [selectedProduct, startTime]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="inline-flex items-center  text-xs">
          <CalendarDays className="w-4 h-4" />
          <span className="leading-none mt-[1px]">Book</span>
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
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Pick a Space</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-7">
              Choose the date you want to book the space for.
            </p>
            <div className="flex flex-col gap-3 rounded-lg p-2">
              <div className="flex flex-col gap-2">
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
                    className="rounded-md border px-3 py-2 bg-white w-full"
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
                    className="rounded-md border px-3 py-2 bg-white w-full"
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
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="space-unit"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  Space Unit
                </Label>
                <Select
                  value={spaceUnitId}
                  onValueChange={setSpaceUnitId}
                  required
                  disabled={!spaceId || spaceUnitsLoading}
                >
                  <SelectTrigger
                    id="space-unit"
                    className="rounded-md border px-3 py-2 bg-white w-full"
                  >
                    <SelectValue placeholder="Choose a space unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredSpaceUnits.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />

          {/* Voucher Selection Section (refined) */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StickyNote className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Select Voucher</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-7">
              Choose a voucher to use for this booking.
            </p>
            <div className="flex flex-col gap-2 rounded-lg p-2">
              <Select
                value={selectedVoucherId}
                onValueChange={setSelectedVoucherId}
                disabled={
                  spacesLoading ||
                  !spaceId ||
                  allFilteredVouchers.length === 0 ||
                  productVouchersLoading ||
                  productsLoading
                }
                required
              >
                <SelectTrigger
                  id="voucher-select"
                  className="rounded-md border px-3 py-2 bg-white w-full"
                >
                  <SelectValue
                    placeholder={
                      spaceId
                        ? allFilteredVouchers.length === 0
                          ? "No vouchers available"
                          : "Choose a voucher"
                        : "Select a space first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {allFilteredVouchers.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {products.find((p) => p.id === v.product_id)?.name ||
                        "Unnamed Product"}
                      {v.code ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          [#{v.code}]
                        </span>
                      ) : null}
                      {v.expiring_at ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Expires:{" "}
                          {new Date(v.expiring_at).toLocaleDateString()})
                        </span>
                      ) : null}
                      {/* Show duration if available */}
                      {products.find((p) => p.id === v.product_id)?.duration ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (
                          {
                            products.find((p) => p.id === v.product_id)
                              ?.duration
                          }
                          h)
                        </span>
                      ) : null}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />

          {/* Select Date Section */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Select Date</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-7">
              Choose the date you want to book the space for.
            </p>
            <div className="flex items-center justify-center rounded-lg border ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Select Time Section */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">Pick a Time Slot</span>
            </div>

            <p className="text-xs text-muted-foreground mb-3 ml-7">
              {!selectedVoucherId
                ? "Select a voucher to pick a time slot."
                : availabilityLoading
                ? "Loading availability..."
                : availability
                ? "Pick a time within the available slots below."
                : "Select an available time for your booking."}
            </p>
            {/* Show available slots as sections */}
            {availableSlots.length > 0 && (
              <div className="my-4">
                <div className="text-sm font-semibold mb-1 ml-1">
                  Available Slots:
                </div>
                <ul className="space-y-1">
                  {availableSlots.map((slot) => (
                    <li key={slot.start + "-" + slot.end} className="ml-2">
                      <span
                        className="inline-block rounded px-2 py-0.5 text-sm"
                        style={{
                          background: "var(--primary)",
                          color: "var(--primary-foreground, #fff)",
                        }}
                      >
                        {formatTimeAMPM(slot.start)} -{" "}
                        {formatTimeAMPM(slot.end)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Only show manual input for custom times */}
            <div className="flex gap-4 p-2">
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
                    disabled={!selectedVoucherId}
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
                    disabled={!!selectedVoucherId}
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                {selectedProduct?.duration && (
                  <span className="text-xs text-muted-foreground">
                    End time is automatically set to {selectedProduct.duration}{" "}
                    hour
                    {selectedProduct.duration > 1 ? "s" : ""} after start time.
                  </span>
                )}
              </div>
            </div>
          </div>
          <Separator />

          {/* Additional Remarks Section */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StickyNote className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold">
                Additional Remarks
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-7">
              Add any notes or special requests for your booking (optional).
            </p>
            <div className="flex flex-col gap-1.5">
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Additional notes or requests"
                className="rounded-md border px-3 pt-2 min-h-[80px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
