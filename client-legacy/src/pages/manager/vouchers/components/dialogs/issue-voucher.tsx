import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { format } from "date-fns";
import { CalendarIcon, TicketPercent } from "lucide-react";
import { useState } from "react";
import GenerateQRCodeDialog from "./qr-code-voucher";

export default function IssueVoucherDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [qrDialogOpen, setQRDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resourceType: "",
    voucherCode: "",
    expirationDate: "",
    usageLimit: "",
  });

  const handleCancel = () => {
    setOpen(false);
    // Reset form data
    setFormData({
      name: "",
      resourceType: "",
      voucherCode: "",
      expirationDate: "",
      usageLimit: "",
    });
  };

  const handleConfirm = () => {
    // Handle form submission here
    console.log("Form data:", formData);
    setOpen(false);
    setQRDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-2">Send Voucher</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <TicketPercent className="w-4 h-4 text-purple-600" />
              </div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Issue Voucher
              </DialogTitle>
            </div>
            <p className="text-sm text-gray-600">
              Enter details to issue a new voucher to a user
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="name"
                type="email"
                placeholder="johnsmith@example.com"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="resource-type"
                className="text-sm font-medium text-gray-700"
              >
                Resource Type
              </Label>
              <Select
                value={formData.resourceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, resourceType: value })
                }
              >
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select a workspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference-room">
                    Conference Room
                  </SelectItem>
                  <SelectItem value="desk">Desk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="voucher-code"
                className="text-sm font-medium text-gray-700"
              >
                Voucher Code
              </Label>
              <Input
                id="voucher-code"
                placeholder="Enter voucher code"
                value={formData.voucherCode}
                onChange={(e) =>
                  setFormData({ ...formData, voucherCode: e.target.value })
                }
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="expiration-date"
                  className="text-sm font-medium text-gray-700"
                >
                  Expiration Date
                </Label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="expiration-date"
                        variant="outline"
                        className={cn(
                          "w-full flex items-center text-left font-normal bg-gray-50 border-gray-200",
                          !date && "text-gray-500"
                        )}
                      >
                        {date ? format(date, "PPP") : "Select a date"}
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="usage-limit"
                  className="text-sm font-medium text-gray-700"
                >
                  Usage Limit
                </Label>
                <Input
                  id="usage-limit"
                  placeholder="Enter number of uses"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, usageLimit: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button className="flex-1  text-white" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <GenerateQRCodeDialog
        open={qrDialogOpen}
        setClose={() => {
          setQRDialogOpen(false);
        }}
      />
    </>
  );
}
