import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface DocumentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  uploadDate: Date;
}

export function DocumentViewModal({
  isOpen,
  onClose,
  documentName,
  uploadDate,
}: DocumentViewModalProps) {
  const handleDownload = () => {
    console.log("Downloading:", documentName);
  };

  const formattedDate = format(uploadDate, "MMMM dd, yyyy");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-11/12 md:w-full rounded">
        <DialogHeader>
          <DialogTitle>{documentName}</DialogTitle>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </DialogHeader>
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md">
          <img src="/placeholder-image.svg" alt="Document preview" className="w-24 h-24 object-contain" />
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleDownload} className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 