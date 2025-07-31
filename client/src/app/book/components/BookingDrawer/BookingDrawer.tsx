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

  // Helper to get bookings for selected space unit and date
  const bookingsForSelected = bookings.filter(
    (b) =>
      b.space_unit_id === spaceUnitId &&
      b.date === (date ? formatDateLocal(date) : "")
  );

  // Helper to convert "HH:mm" to minutes
  function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  // Helper to check if a slot overlaps with any booking
  function isSlotUnavailable(
    slot: { start: string; end: string },
    bookings: typeof bookingsForSelected
  ) {
    const slotStart = timeToMinutes(slot.start);
    const slotEnd = timeToMinutes(slot.end);
    return bookings.some((b) => {
      const bStart = timeToMinutes(b.start_time);
      const bEnd = timeToMinutes(b.end_time);
      return (
        slotStart < bEnd && slotEnd > bStart // overlap
      );
    });
  }

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

  // Helper to format date as YYYY-MM-DD in local time
  function formatDateLocal(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
            {/* Space Availability Info (moved here, above time slot UI) */}
            <div className="mb-2 ml-7">
              {availabilityLoading ? (
                <div className="text-xs text-muted-foreground mb-1">
                  Loading availability...
                </div>
              ) : availability ? (
                <div className="text-xs text-green-700 mb-1">
                  <span className="font-semibold">Available:</span>{" "}
                  {availability.opening_time} - {availability.closing_time}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground mb-1">
                  No availability set for this space and date.
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-7">
              {!selectedVoucherId
                ? "Select a voucher to pick a time slot."
                : availabilityLoading
                ? "Loading availability..."
                : availability
                ? `Available from ${availability.opening_time} to ${availability.closing_time}`
                : "Select an available time for your booking."}
            </p>
            {/* Remove Time Slot UI grid */}
            {/* <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
              {slots.map((slot) => {
                ...existing code...
              })}
            </div> */}
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
                className="rounded-md border px-3 py-2 min-h-[80px]"
              />
            </div>
          </div>

          {/* Availability & Bookings Info Section */}
          {bookingsForSelected.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-base font-semibold">
                  Availability & Bookings
                </span>
              </div>
              <div className="mb-2 ml-7">
                <div className="text-xs">
                  <span className="font-semibold">Existing Bookings:</span>
                  <ul className="list-disc ml-5 mt-1">
                    {bookingsForSelected.map((b) => (
                      <li key={b.id}>
                        {b.start_time} - {b.end_time}
                        {b.remarks ? (
                          <span className="ml-2 text-muted-foreground">
                            ({b.remarks})
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          <Separator />

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
