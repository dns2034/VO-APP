import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { TUserProfile } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClientBehaviorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}

interface BookingActivity {
  id: string;
  date: string;
  type: string;
  status: string;
}

export function ClientBehaviorDialog({
  open,
  onOpenChange,
  client,
}: ClientBehaviorDialogProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 10),
  });

  const [action, setAction] = useState<"ban" | "unban" | null>(null);

  const randomAction = Math.random() > 0.5 ? "ban" : "unban";

  const handleBan = () => {
    setAction("ban");
  };

  const handleUnban = () => {
    setAction("unban");
  };

  // Mock data - replace with actual data fetching
  const bookingActivities: BookingActivity[] = [
    {
      id: "1",
      date: "April 16, 2025",
      type: "Meeting Room",
      status: "On-Time",
    },
    {
      id: "2",
      date: "April 17, 2025",
      type: "Meeting Room",
      status: "No-Show",
    },
    { id: "3", date: "April 18, 2025", type: "Meeting Room", status: "Late" },
    { id: "4", date: "April 19, 2025", type: "Desk", status: "No-Show" },
    { id: "5", date: "April 20, 2025", type: "Desk", status: "Late" },
  ];

  const isMobile = useIsMobile();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl w-11/12 md:w-full rounded">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-purple-600">🔍</span>
              Client Behavior Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Review the client's check-in and booking history.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Client Name</Label>
                <Input
                  value={`${client?.first_name} ${client?.last_name}`}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          isMobile ? (
                            <>
                              {format(date.from, "LLL d")} - {format(date.to, date.from.getFullYear() === date.to.getFullYear() && date.from.getMonth() === date.to.getMonth() ? "d, y" : "LLL d, y")}
                            </>
                          ) : (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          )
                        ) : (
                          format(date.from, isMobile ? "LLL d, y" : "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Booking Activity Table
                </h3>
                <Button
                  variant={randomAction === "ban" ? "destructive" : "outline"}
                  onClick={randomAction === "ban" ? handleBan : handleUnban}
                >
                  {randomAction === "ban" ? "Ban User" : "Unban User"}
                </Button>
              </div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>
                          <span>{activity.status}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!action}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              {action === "ban" 
                ? "Ban this client due to frequent cancellations."
                : "Unban this client to allow future bookings."
              }
              {"\n"}Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button
              className={cn(
                action === "unban" && "bg-green-500 hover:bg-green-400"
              )}
              variant={action === "ban" ? "destructive" : "default"}
              onClick={() => setAction(null)}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
