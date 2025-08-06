import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TransferVoucherDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    voucherCode: "VKD1829AD",
  });

  const handleCancel = () => {
    setOpen(false);
    // Reset form data
    setFormData({
      name: "",
      voucherCode: "VKD1829AD",
    });
  };

  const handleConfirm = () => {
    // Handle form submission here
    console.log("Transfer voucher data:", formData);
    toast.success("Voucher transfer completed.", {
      description: new Date().toDateString(),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={null} className="text-purple-700 hover:bg-purple-50">
          Transfer Voucher
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-purple-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Transfer Voucher
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-600">
            Manage and Transfer Client Vouchers
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="name"
              type="email"
              placeholder=""
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-50 border-gray-200"
            />
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
              value={formData.voucherCode}
              onChange={(e) =>
                setFormData({ ...formData, voucherCode: e.target.value })
              }
              className="bg-gray-50 border-gray-200"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
