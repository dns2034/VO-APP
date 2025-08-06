import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LinkVoucherDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleLinkVoucher = () => {
    if (selectedPlan) {
      toast.success("Voucher successfully linked to the co-working space.", {
        description: "Friday, February 16, 2018 at 10:36 AM",
        action: {
          label: "Done",
          onClick: () => {
            setIsOpen(false);
          },
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Link Voucher</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="space-y-1 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
              <Link className="w-4 h-4 text-purple-600" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Link Voucher
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600">
            Enter details to create a new voucher
          </p>
        </DialogHeader>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Select Plan Type
            </label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Plan Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-day">1 Day Coworking Pass</SelectItem>
                <SelectItem value="15-day">15 Day Coworking Pass</SelectItem>
                <SelectItem value="30-day">30 Day Coworking Pass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLinkVoucher}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            disabled={!selectedPlan}
          >
            Link Voucher
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
