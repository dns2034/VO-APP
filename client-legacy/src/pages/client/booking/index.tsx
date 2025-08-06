import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { type FC, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Outlet, useNavigate } from "react-router-dom";
import CalendarCard from "@/pages/client/booking/components/calendar-card";
import ResourcesCard from "@/pages/client/booking/components/resources-card";
import { FormProvider, useForm } from "react-hook-form";
import { type CreateBookingField, requestValidator } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import BookingDetailsDialog from "@/pages/client/booking/components/booking-details-dialog";
import { HelpCircle } from "lucide-react";
import BookingGuideDialog from "@/pages/client/booking/components/booking-guide-dialog";
import * as bookingService from "@/pages/shared/services/booking-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  bookingQueries,
  resourceInstanceQueries,
  resourceQueries,
} from "./queries";
import type {
  TBookingDetails,
  TBookingStatus,
  TResource,
  TResourceInstance,
} from "@/types";
import ReservationCard from "./components/reservation-card";
import { format } from "date-fns";
import { useBookingWorkflowStore } from "./store";

const Booking: FC = () => {
  const { user } = useAuth();
  const { setWorkflow } = useBookingWorkflowStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createBookingMutation = useMutation({
    mutationFn: bookingService.createBooking, // Uses the directly imported functions
    onSuccess: () => {
      toast.success("Booking created successfully!");
      form.reset(); // Reset form
      setBookingDetails(null); // Close confirmation dialog
      // Optionally navigate away or update UI further
    },
    onError: (error) => {
      // Keep error logging if desired for production monitoring
      console.error("Booking creation failed:", error);
      toast.error(`Booking failed: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookingQueries.all() });
      queryClient.invalidateQueries({
        queryKey: resourceQueries.list({
          isAvailable: true,
          locationId: location_id,
        }),
      });

      setWorkflow("date");
    },
  });

  // highlight-next-line
  const form = useForm<CreateBookingField>({
    defaultValues: {
      date: undefined,
      start_time: "",
      end_time: "",
      remarks: "",
      resource_id: "",
      resource_instance_id: null, // Should hold UUID or null
      user_id: user?.id,
    },
    resolver: zodResolver(requestValidator.createBooking), // Assumes validator expects UUID | null
  });

  const {
    date,
    resource_id,
    resource_instance_id,
    location_id,
    start_time,
    end_time,
    remarks,
  } = form.watch();

  const resourceQueryData = queryClient.getQueryData<TResource[]>(
    resourceQueries.list({
      isAvailable: true,
      locationId: location_id,
    })
  );

  const resource = resourceQueryData?.find((r) => r.id === resource_id);

  const [bookingDetails, setBookingDetails] = useState<TBookingDetails | null>(
    null
  );
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const resourceInstanceQueryData = queryClient.getQueryData<
    TResourceInstance[]
  >(resourceInstanceQueries.list(resource_id).queryKey);

  const submitForm = (data: CreateBookingField) => {
    const resource = resourceQueryData?.find((r) => r.id === data.resource_id);

    // exclude location_id from payload
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { location_id, ...rest } = data;
    const payload = {
      ...rest,
      date: format(data.date, "yyyy-MM-dd"),
      user_id: user?.id as string,
      status: "BOOKED" as TBookingStatus,
      start_time: resource?.name === "Desk" ? "09:00" : data.start_time,
      end_time: resource?.name === "Desk" ? "17:00" : data.end_time,
      resource_instance_id: data.resource_instance_id || null,
    };

    createBookingMutation.mutate(payload);
  };

  const handleBookNow = () => {
    const resource = resourceQueryData?.find(
      (r) => r.id === resource_id
    ) as TResource;
    const foundResourceInstance = resourceInstanceQueryData?.find(
      // Find the instance object
      (ri) => ri.id === resource_instance_id
    );

    const details: TBookingDetails = {
      date: format(date, "yyyy-MM-dd"),
      start_time: resource?.name === "Desk" ? "09:00" : start_time,
      end_time: resource?.name === "Desk" ? "17:00" : end_time,
      remarks: remarks ?? null, // Ensure null if undefined
      resource: resource,
      // Assign the found instance object (or null/undefined) to the correct property
      resource_instance:
        resource?.name === "Desk" ? foundResourceInstance || null : null,
    };

    setBookingDetails(details);
  };

  return (
    <>
      <div className="grid grid-cols-1 w-full">
        <div className="grid grid-cols-1 gap-6 max-w-[90%] md:gap-8 md:w-5/6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="w-full lg:w-[70%]">
              <h1 className="text-3xl font-bold">Book a Space</h1>
              <p className="text-muted-foreground">
                Reserve your perfect workspace for meetings, focused work, or
                casual collaborations
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsGuideOpen(true)}
              >
                <HelpCircle className="h-4 w-4" />
                How it Works
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  navigate("my-bookings");
                }}
              >
                <CalendarCheck className="h-4 w-4" />
                Your Bookings
              </Button>
            </div>
          </div>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {/* CALENDAR CARD */}
              <CalendarCard />

              <BookingGuideDialog
                open={isGuideOpen}
                onOpenChange={(open) => setIsGuideOpen(open)}
              />

              {/* RESOURCES CARD */}
              <ResourcesCard />

              {/* RESERVATION CARD */}
              {date &&
                resource_id &&
                (resource?.name !== "Desk" || resource_instance_id) && (
                  <ReservationCard onBookNow={handleBookNow} />
                )}
            </form>
          </FormProvider>

          {/* Restore Original Dialog */}
          {bookingDetails && (
            <BookingDetailsDialog
              bookingDetails={bookingDetails}
              onClose={() => setBookingDetails(null)}
              onConfirm={() => {
                form.handleSubmit(submitForm)();
              }}
              isLoading={createBookingMutation.isPending}
            />
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Booking;
