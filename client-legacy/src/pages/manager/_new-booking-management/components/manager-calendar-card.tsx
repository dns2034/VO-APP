import { useState } from "react";
import { CalendarDaysIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";


const ManagerCalendarCard = ({ onDateSelect }: { onDateSelect?: (date: Date | undefined) => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const disablePastDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return (
    <Card className="xl:col-span-1 transition-all border-2 border-violet-600/70 shadow-violet-300 ">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <CalendarDaysIcon className="text-violet-700" /> Select a Date
        </CardTitle>
        <CardDescription>Choose a date for your booking</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={disablePastDates}
          className="p-0"
          classNames={{
            months: "w-full",
            head_row: "justify-evenly w-full flex",
            row: "justify-evenly w-full flex cursor-pointer",
            table: "flex flex-col gap-4 w-full",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ManagerCalendarCard;
