import { format } from "date-fns";
import { CalendarIcon, Ticket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CreateVoucherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateVoucherDialog({
  open,
  onOpenChange,
}: CreateVoucherDialogProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [pointsToAdd, setPointsToAdd] = useState("");
  const [status, setStatus] = useState("Active");
  const [expirationDate, setExpirationDate] = useState<Date>();
  const [usageLimit, setUsageLimit] = useState("");

  const handleConfirm = () => {
    // TODO: Implement voucher creation logic
    console.log({
      voucherCode,
      pointsToAdd,
      status,
      expirationDate,
      usageLimit,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <DialogTitle>Create New Voucher</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Enter details to create a new voucher
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Voucher Code</Label>
              <Input
                placeholder="Enter voucher code"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Points to Add</Label>
              <Input
                type="number"
                placeholder="Enter number of points to award"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expirationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expirationDate ? (
                        format(expirationDate, "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expirationDate}
                      onSelect={setExpirationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Usage Limit</Label>
                <Input
                  type="number"
                  placeholder="Enter number of uses"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-primary">
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 