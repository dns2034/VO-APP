import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, StickyNote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDateLocal,
  formatTimeAMPM,
  minutesToTime,
  timeToMinutes,
  toFullTimeWithOffset,
} from "@/lib/format";
import {
  bookingsKeys,
  productVouchersKeys,
  spaceAvailabilityKeys,
  spacesKeys,
  spaceUnitsKeys,
} from "@/lib/query-keys";
import { type BookingSchema, requestValidator } from "@/lib/zod-schemas";
import { bookingsService } from "@/services/booking.service";
import { productVouchersService } from "@/services/product-vouchers.service";
import { spacesService } from "@/services/space.service";
import { spaceAvailabilityService } from "@/services/space-availability.service";
import { spaceUnitsService } from "@/services/space-units.service";
import type { Branch, Product } from "@/types";
import { branchesQueryOptions } from "..";

export default function BookingDrawer({
  open,
  onOpenChange,
  selectedBranch,
}: {
  selectedBranch: Branch | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const bookingForm = useForm({
    resolver: zodResolver(requestValidator.bookingSchema),
    defaultValues: {
      branchId: selectedBranch ? selectedBranch.id : "",
      spaceId: "",
      spaceUnitId: "",
      productVoucherId: "",
      date: undefined,
      startTime: "",
      endTime: "",
      remarks: "",
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [
    watchedBranchId,
    watchedDate,
    watchedProductVoucherId,
    watchedSpaceId,
    watchedSpaceUnitId,
    watchedStartTime,
  ] = bookingForm.watch([
    "branchId",
    "date",
    "productVoucherId",
    "spaceId",
    "spaceUnitId",
    "startTime",
  ]);

  useEffect(() => {
    if (selectedBranch) {
      bookingForm.reset({
        branchId: selectedBranch.id,
        spaceId: "",
        spaceUnitId: "",
        productVoucherId: "",
        date: undefined,
        startTime: "",
        endTime: "",
        remarks: "",
      });
    }
  }, [selectedBranch, bookingForm]);

  const { mutateAsync: createBookingMutateAsync } = useMutation({
    mutationFn: bookingsService.create,
    onError: (err) => {
      toast.error(
        "Failed to create booking: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    },
    onSuccess: () => {
      toast.success("Booking created!");
      bookingForm.reset();
      onOpenChange(false);
    },
  });

  const onCreateBooking = async (values: BookingSchema) => {
    const { date, endTime, productVoucherId, spaceUnitId, startTime, remarks } =
      values;
    const isFullDay = selectedProduct?.duration === 24;
    await createBookingMutateAsync({
      date: formatDateLocal(date),
      start_time: isFullDay ? null : toFullTimeWithOffset(startTime),
      end_time: isFullDay ? null : toFullTimeWithOffset(endTime),
      space_unit_id: spaceUnitId,
      status: "booked",
      remarks,
      product_voucher_id: productVoucherId || undefined,
    });
  };

  const { data: branchesQueryData, isPending: branchesQueryIsPending } =
    useQuery(branchesQueryOptions);

  const { data: spacesQueryData, isPending: spacesQueryIsPending } = useQuery({
    queryKey: spacesKeys.list(watchedBranchId),
    queryFn: () => spacesService.getByBranchId({ branchId: watchedBranchId }),
    enabled: !!watchedBranchId,
  });

  const { data: spaceUnitsQueryData, isPending: spaceUnitsQueryIsPending } =
    useQuery({
      queryKey: spaceUnitsKeys.list(watchedSpaceId),
      queryFn: () =>
        spaceUnitsService.getBySpaceId({ spaceId: watchedSpaceId }),
      enabled: !!watchedSpaceId,
    });

  const {
    data: productVouchersQueryData,
    isPending: productVouchersQueryIsPending,
  } = useQuery({
    queryKey: productVouchersKeys.list(watchedSpaceId),
    queryFn: () =>
      productVouchersService.getBySpaceId({ spaceId: watchedSpaceId }),
    enabled: !!watchedSpaceId,
  });

  const {
    data: spaceAvailabilityQueryData,
    isPending: spaceAvailabilityQueryIsPending,
  } = useQuery({
    queryKey: spaceAvailabilityKeys.list({
      date: watchedDate,
      spaceId: watchedSpaceId,
    }),
    queryFn: () =>
      spaceAvailabilityService.getAvailableByDateAndSpaceId({
        date: format(watchedDate, "yyyy-MM-dd"),
        spaceId: watchedSpaceId,
      }),
    enabled: !!watchedSpaceId && !!watchedDate,
  });

  const { data: bookingQueryData } = useQuery({
    queryFn: () =>
      bookingsService.getBySpaceUnitIdAndDate({
        spaceUnitId: watchedSpaceUnitId,
        date: format(watchedDate, "yyyy-MM-dd"),
      }),
    queryKey: bookingsKeys.list({
      date: watchedDate,
      spaceId: watchedSpaceId,
    }),
    enabled: !!watchedSpaceUnitId && !!watchedDate,
  });

  const availableSlots = useMemo(() => {
    if (!spaceAvailabilityQueryData) return [];

    const timeNow = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    const open = timeToMinutes(timeNow);
    const close = timeToMinutes(spaceAvailabilityQueryData.closing_time);

    // Sort bookings by start_time
    const sortedBookings = (bookingQueryData || [])
      ?.filter(
        (b) =>
          typeof b.start_time === "string" && typeof b.end_time === "string"
      ) // skip bookings with null times
      .slice()
      .sort(
        (a, b) =>
          timeToMinutes(a.start_time as string) -
          timeToMinutes(b.start_time as string)
      );

    const slots: { start: string; end: string }[] = [];
    let current = open;

    for (const booking of sortedBookings) {
      const bStart = timeToMinutes(booking.start_time as string);
      const bEnd = timeToMinutes(booking.end_time as string);

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
  }, [spaceAvailabilityQueryData, bookingQueryData]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 flex flex-col max-h-[90vh]">
        <div className="sticky top-0 z-10 bg-white">
          <DrawerHeader className="px-6 pt-4 pb-2 flex items-center gap-2">
            <DrawerTitle className="text-lg font-bold">New Booking</DrawerTitle>
          </DrawerHeader>
        </div>
        <Separator />
        <Form {...bookingForm}>
          <form
            className="flex-1 overflow-y-auto px-6 py-4 space-y-8"
            onSubmit={bookingForm.handleSubmit(onCreateBooking)}
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
                  {/* BRANCH SELECTION */}
                  <FormField
                    control={bookingForm.control}
                    name="branchId"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              disabled={branchesQueryIsPending}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a branch..." />
                              </SelectTrigger>
                              <SelectContent>
                                {branchesQueryData?.map((b) => (
                                  <SelectItem key={b.id} value={b.id}>
                                    {b.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  {/* SPACE SELECTION */}
                  <FormField
                    control={bookingForm.control}
                    name="spaceId"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Space</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              disabled={
                                spacesQueryIsPending ||
                                !bookingForm.watch("branchId")
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a space..." />
                              </SelectTrigger>
                              <SelectContent>
                                {spacesQueryData?.map((space) => (
                                  <SelectItem key={space.id} value={space.id}>
                                    {space.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  {/* SPACE UNIT SELECTION */}
                  <FormField
                    control={bookingForm.control}
                    name="spaceUnitId"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Space Unit</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              disabled={
                                spaceUnitsQueryIsPending ||
                                !bookingForm.watch("spaceId")
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a space unit..." />
                              </SelectTrigger>
                              <SelectContent>
                                {spaceUnitsQueryData?.map((spaceUnit) => (
                                  <SelectItem
                                    key={spaceUnit.id}
                                    value={spaceUnit.id}
                                  >
                                    {spaceUnit.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <StickyNote className="size-5 text-primary" />
                <span className="text-base font-semibold">Select Voucher</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 ml-7">
                Choose a voucher to use for this booking.
              </p>

              {/* VOUCHER SELECTION */}
              <FormField
                control={bookingForm.control}
                name="productVoucherId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={field.value}
                          defaultValue={field.value}
                          onValueChange={(voucherId) => {
                            const voucher = productVouchersQueryData?.find(
                              (pv) => pv.id === voucherId
                            );
                            field.onChange(voucherId);
                            if (voucher) {
                              setSelectedProduct(voucher.product);
                            }
                          }}
                          disabled={
                            productVouchersQueryIsPending || !watchedSpaceUnitId
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                !watchedSpaceUnitId
                                  ? "Choose a space unit..."
                                  : "Choose a voucher..."
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {productVouchersQueryData?.map((productVoucher) => (
                              <SelectItem
                                key={productVoucher.id}
                                value={productVoucher.id}
                              >
                                {productVoucher.product
                                  ? productVoucher.product.name
                                  : "Unknown Product"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span className="text-base font-semibold">Select Date</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 ml-7">
                Choose the date you want to book the space for.
              </p>
              <div className="flex items-center justify-center rounded-lg border w-full">
                <FormField
                  control={bookingForm.control}
                  name="date"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="w-full max-w-full overflow-x-auto"
                            disabled={!watchedProductVoucherId}
                            fromDate={new Date(new Date().setHours(0, 0, 0, 0))}
                            toDate={undefined}
                            modifiers={{
                              disabled: [
                                {
                                  before: new Date(
                                    new Date().setHours(0, 0, 0, 0)
                                  ),
                                },
                              ],
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <Separator />

            {selectedProduct?.duration !== 24 && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-base font-semibold">
                    Pick a Time Slot
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mb-3 ml-7">
                  {!watchedProductVoucherId
                    ? "Select a voucher to pick a time slot."
                    : spaceAvailabilityQueryIsPending
                      ? "Loading availability..."
                      : availableSlots
                        ? "Pick a time within the available slots below."
                        : "There's currently no available time slot."}
                </p>
                {availableSlots.length > 0 && (
                  <div className="my-4">
                    <div className="text-sm font-semibold mb-1 ml-1">
                      Available Slots:
                    </div>
                    <ul className="space-y-1">
                      {availableSlots.map((slot) => (
                        <li
                          key={`${slot.start} - ${slot.end}`}
                          className="ml-2"
                        >
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
                <div className="flex flex-col sm:flex-row gap-4 p-2">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <FormField
                      control={bookingForm.control}
                      name="startTime"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input
                                id="start-time"
                                type="time"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  const [h, m] = e.target.value
                                    .split(":")
                                    .map(Number);
                                  const endDate = new Date(0, 0, 0, h, m);
                                  endDate.setHours(
                                    endDate.getHours() +
                                      (selectedProduct?.duration ?? 0)
                                  );
                                  const endH = endDate
                                    .getHours()
                                    .toString()
                                    .padStart(2, "0");
                                  const endM = endDate
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0");
                                  bookingForm.setValue(
                                    "endTime",
                                    `${endH}:${endM}`
                                  );
                                }}
                                disabled={!watchedDate}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <FormField
                      control={bookingForm.control}
                      name="endTime"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input
                                id="end-time"
                                type="time"
                                {...field}
                                disabled={!watchedStartTime}
                                min={watchedStartTime}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

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
                <FormField
                  control={bookingForm.control}
                  name="remarks"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Textarea
                            id="remarks"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Additional notes or requests"
                            className="rounded-md border px-3 pt-2 min-h-[80px]"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                !bookingForm.formState.isValid ||
                bookingForm.formState.isSubmitting
              }
            >
              {bookingForm.formState.isSubmitting ? "Booking..." : "Book Now"}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
