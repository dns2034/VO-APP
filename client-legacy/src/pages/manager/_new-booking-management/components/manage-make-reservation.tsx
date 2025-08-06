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
import { Timer } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";

interface ManagerReservationForm {
  start_time: string;
  end_time: string;
  remarks?: string;
}


const ManagerMakeReservationCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ManagerReservationForm>({
    defaultValues: {
      start_time: "09:00",
      end_time: "17:00",
      remarks: "",
    },
  });

  const onSubmit = (data: ManagerReservationForm) => {
    console.log("Manager reservation submitted:", data);
    reset();
  };

  return (
    <Card className="transition-all relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Timer className="text-violet-700" /> Make a reservation
        </CardTitle>
        <div className="text-muted-foreground text-sm mt-1">
          Just one more step away
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                {...register("start_time", { required: true })}
                min="00:00"
                max="23:59"
              />
              {errors.start_time && (
                <span className="text-xs text-red-500">Start time is required</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                {...register("end_time", { required: true })}
                min="00:00"
                max="23:59"
              />
              {errors.end_time && (
                <span className="text-xs text-red-500">End time is required</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Textarea
              id="remarks"
              placeholder="Please provide details about your meeting (e.g., Team discussion for 5 pax)"
              {...register("remarks")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Book Now
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ManagerMakeReservationCard;
