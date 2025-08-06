import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface DocumentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: {
    name: string;
    uploadDate: Date;
    url?: string;
  } | null;
}

export function DocumentPreviewDialog({
  open,
  onOpenChange,
  document,
}: DocumentPreviewDialogProps) {
  if (!document) return null;

  const handleDownload = () => {
    // TODO: Implement actual download functionality
    console.log("Downloading document:", document.name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 max-w-3xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <h2 className="text-xl font-semibold">{document.name}</h2>
          <p className="text-sm text-muted-foreground">
            {format(document.uploadDate, "MMMM dd, yyyy")}
          </p>
        </DialogHeader>

        <div className="flex-1 p-6 flex items-center justify-center bg-gray-50">
          {/* Placeholder for document preview */}
          <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Document preview placeholder"
            >
              <title>Document preview</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <DialogFooter className="p-4 border-t">
          <Button
            onClick={handleDownload}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
