import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Info, Timer } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { resourceInstanceQueries, resourceQueries } from "../queries"; // Ensure both are imported
import { queryClient } from "@/main"; // Import queryClient
import type { TResource, TResourceInstance } from "@/types";
import type { CreateBookingField } from "@/lib/validator";
import { useBookingWorkflowStore } from "../store";

const ReservationCard = ({ onBookNow }: { onBookNow: () => void }) => {
  const { register, watch } = useFormContext<CreateBookingField>();
  const { workflow } = useBookingWorkflowStore();

  const {
    resource_id,
    resource_instance_id,
    // start_time,
    // end_time,
    location_id,
  } = watch();

  const resources = queryClient.getQueryData<TResource[]>(
    resourceQueries.list({ isAvailable: true, locationId: location_id })
  );

  const resourceInstances = queryClient.getQueryData<TResourceInstance[]>(
    resourceInstanceQueries.list(resource_id).queryKey
  );

  const selectedResource = resources?.find((r) => r.id === resource_id);
  // Find the selected instance by ID
  const selectedInstance = resourceInstances?.find(
    (ri) => ri.id === resource_instance_id
  );
  // Derive the display name
  const instanceDisplayName =
    selectedInstance?.name.split("-").pop()?.trim() ||
    selectedInstance?.name ||
    "(Selected Desk)"; // Updated fallback display

  const isDesk = selectedResource?.name === "Desk";
  const isMeetingRoom = !isDesk;

  // Determine if booking is allowed - logic relies on UUID being present if desk
  // const canBook =
  //   (isDesk && resource_instance_id) ||
  //   (isMeetingRoom && start_time && end_time);

  return (
    <Card
      className={cn(
        "xl:col-span-1 transition-all relative",
        workflow === "book" &&
          "border-2 border-violet-600/70 shadow-violet-300 shadow-lg"
      )}
    >
      <div className="bg-black/80 absolute z-10 inset-0 flex items-center justify-center">
        <p className="text-white text-sm">Temporarily disabled</p>
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Timer className="text-violet-700" /> Make a reservation
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {isDesk && (
          <div className="rounded-lg border border-violet-500 bg-violet-50 p-3 transition-all hover:shadow-sm">
            <div className="flex items-center gap-4 text-violet-700">
              <div className="w-fit">
                <div className="flex items-center justify-center w-3 h-3 rounded-full bg-violet-100">
                  <Info />
                </div>
              </div>
              <span className="text-sm font-medium">
                Desk <span className="font-bold">{instanceDisplayName}</span>{" "}
                {/* Use derived/fallback name */}
                selected for booking
              </span>
            </div>
          </div>
        )}

        {isMeetingRoom && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time</Label>
              <Input id="start_time" type="time" {...register("start_time")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">End Time</Label>
              <Input id="end_time" type="time" {...register("end_time")} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks (Optional)</Label>
          <Textarea
            id="remarks"
            placeholder="Any special requests or notes?"
            {...register("remarks")}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          onClick={onBookNow}
          // disabled={!canBook} // Button is disabled if !canBook
          disabled
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationCard;
