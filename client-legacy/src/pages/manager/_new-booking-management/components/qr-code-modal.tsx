import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeNode: React.ReactNode; 
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ open, onOpenChange, qrCodeNode }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center w-full">QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          {qrCodeNode}
          <p className="mt-6 text-center text-sm font-medium">
            Scan this code using your mobile device
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="mt-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal; 