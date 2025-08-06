import { useState } from "react";
import { Info, FileText, Gift, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface ExportClientDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: { id: string; name: string; email: string } | null;
}

export const ExportClientDataDialog = ({
  open,
  onOpenChange,
  client,
}: ExportClientDataDialogProps) => {
  const [selectedData, setSelectedData] = useState<string[]>([
    "profile",
    "booking",
  ]);

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleExport = () => {
    console.log("Exporting data:", {
      client,
      selectedData,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-purple-600">
            <Info className="h-5 w-5" />
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Export Client Data
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600 font-normal">
            Select the data you want to export and any filters to apply
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Data Selection */}
          <div className="space-y-2">
            <h3 className="text-base font-medium">Data Selection</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="profile"
                  checked={selectedData.includes("profile")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedData([...selectedData, "profile"]);
                    } else {
                      setSelectedData(
                        selectedData.filter((item) => item !== "profile")
                      );
                    }
                  }}
                  className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor="profile"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Profile Information
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="booking"
                  checked={selectedData.includes("booking")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedData([...selectedData, "booking"]);
                    } else {
                      setSelectedData(
                        selectedData.filter((item) => item !== "booking")
                      );
                    }
                  }}
                  className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor="booking"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Booking History
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="redemption"
                  checked={selectedData.includes("redemption")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedData([...selectedData, "redemption"]);
                    } else {
                      setSelectedData(
                        selectedData.filter((item) => item !== "redemption")
                      );
                    }
                  }}
                  className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor="redemption"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Gift className="h-4 w-4" />
                  Redemption Records
                </Label>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <h3 className="text-base font-medium">Date Range</h3>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon />
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
              <p className="text-xs text-gray-500">
                Filter data by date range. Leave empty to export all data
              </p>
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-2">
            <h3 className="text-base font-medium">Export Format</h3>

            <Label
              htmlFor="pdf"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <FileText className="h-4 w-4 text-purple-600" />
              PDF Document
            </Label>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
