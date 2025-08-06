import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

export default function GenerateQRCodeDialog({
  open,
  setClose,
}: {
  open: boolean;
  setClose: () => void;
}) {
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate QR Code</DialogTitle>
            <DialogDescription>
              Create a code for check-in/out.
            </DialogDescription>
          </DialogHeader>
          <div className="px-auto w-full p-10 border rounded-md">
            <QRCode
              value="INCUB8SPACE"
              size={256}
              viewBox={`0 0 256 256`}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-1">
            <Input value={"INCUBE8SPACE"} className="" />
            <Button variant={"outline"} size={"icon"}>
              <Copy />
            </Button>
          </div>

          <Button
            onClick={() => {
              setClose();
              toast.success("Success: QR Code Generated", {
                description: `${new Date().toDateString()}`,
                action: {
                  label: "Confirm",
                  onClick: () => {},
                },
              });
            }}
          >
            Download QR Code
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
