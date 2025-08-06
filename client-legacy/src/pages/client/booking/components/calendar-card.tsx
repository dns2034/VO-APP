import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { isBefore, startOfToday } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { queryClient } from "@/main";
import { resourceQueries } from "../queries";
import type { TResource } from "@/types";
import type { CreateBookingField } from "@/lib/validator";
import { useBookingWorkflowStore } from "../store";

const CalendarCard = () => {
  const { workflow, setWorkflow } = useBookingWorkflowStore();

  const { control, reset, watch } = useFormContext<CreateBookingField>();
  const { user } = useAuth();
  const {
    start_time,
    end_time,
    resource_id,
    resource_instance_id,
    location_id,
  } = watch();

  const resources = queryClient.getQueryData<TResource[]>(
    resourceQueries.list({ isAvailable: true, locationId: location_id })
  );

  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const latestSelectedDateRef = useRef<Date | undefined>(undefined);

  const disablePastDates = useCallback(
    (date: Date) => isBefore(date, startOfToday()),
    []
  );

  const triggerShakeEffect = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const showPersistentAlert = useCallback(
    (confirmAction: () => void, cancelAction: () => void) => {
      if (isAlertShown) {
        triggerShakeEffect();
        return;
      }

      setIsAlertShown(true);

      toast.warning(
        "Heads up — Are you sure you want to discard the current booking information?",
        {
          duration: Number.POSITIVE_INFINITY,
          position: "bottom-center",
          action: { label: "Yes", onClick: () => handleConfirm(confirmAction) },
          cancel: { label: "No", onClick: () => handleCancel(cancelAction) },
        }
      );
    },
    [isAlertShown, triggerShakeEffect]
  );

  const handleConfirm = (confirmAction: () => void) => {
    confirmAction();
    toast.dismiss();
    setIsAlertShown(false);
  };

  const handleCancel = (cancelAction: () => void) => {
    cancelAction();
    toast.dismiss();
    setIsAlertShown(false);
  };

  const resetBookingForm = (date: Date | undefined) => {
    reset({
      date,
      start_time: "",
      end_time: "",
      remarks: "",
      resource_id: "",
      resource_instance_id: null, // Reset instance ID
      user_id: user?.id,
    });

    setWorkflow(date ? "resource" : "date");
  };
  const selectedResource = useMemo(
    () => resources?.find((r) => r.id === resource_id),
    [resources, resource_id]
  );

  useEffect(() => {
    if (isShaking) {
      document.body.classList.add("shake");
      setTimeout(() => document.body.classList.remove("shake"), 500);
    }
  }, [isShaking]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <Card
      className={cn(
        "xl:col-span-1 transition-all",
        workflow === "date" &&
          "border-2 border-violet-600/70 shadow-violet-300 shadow-lg"
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <CalendarDaysIcon className="text-violet-700" /> Select a Date
        </CardTitle>
        <CardDescription>Choose a date for your booking</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  latestSelectedDateRef.current = date;
                  const isDeskSelected =
                    selectedResource?.name === "Desk" && resource_instance_id;
                  const isMeetingRoomSelected =
                    selectedResource?.name !== "Desk" && start_time && end_time;

                  if (
                    resource_id &&
                    (isDeskSelected || isMeetingRoomSelected)
                  ) {
                    // Check if resource and time/instance is selected
                    showPersistentAlert(
                      () => {
                        resetBookingForm(latestSelectedDateRef.current);
                        field.onChange(date);
                      },
                      () => {} // Do nothing on cancel
                    );
                  } else {
                    resetBookingForm(date);
                    field.onChange(date);
                  }
                }}
                disabled={disablePastDates}
                className="p-0"
                classNames={{
                  months: "w-full",
                  head_row: "justify-evenly w-full flex",
                  row: "justify-evenly w-full flex cursor-pointer",
                  table: "flex flex-col gap-4 w-full",
                }}
              />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
