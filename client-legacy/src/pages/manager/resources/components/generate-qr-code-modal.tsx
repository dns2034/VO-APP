import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { toast } from "sonner";

export default function GenerateQRCodeModal({
  open,
  setClose,
}: {
  open: boolean;
  setClose: () => void;
}) {
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger className="text-sm px-2 hover:bg-slate-100 rounded py-1">
          Generate QR Code
        </DialogTrigger>
        <DialogOverlay
          className="bg-transparent"
          onClick={() => {
            setClose();
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate QR Code</DialogTitle>
              <DialogDescription>
                Create a code for check-in/out.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-start gap-2">
              <p className="text-gray-700">
                <span className="font-semibold text-black">Resource Type</span>{" "}
                Meeting Room A
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-black">Space Type</span>{" "}
                Meeting Room
              </p>
            </div>
            <div className="px-auto w-full p-10 border rounded-md">
              <QRCode
                value="INCUB8SPACE"
                size={256}
                viewBox={`0 0 256 256`}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>

            <div className="flex w-full justify-end gap-2 items-center">
              <Button
                variant={"outline"}
                onClick={() => {
                  setClose();
                }}
              >
                Cancel
              </Button>
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
                Confirm
              </Button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}
