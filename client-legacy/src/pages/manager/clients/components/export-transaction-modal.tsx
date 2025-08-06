import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ExportFormat = "PDF" | "CSV";

type ExportTransactionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport: (format: ExportFormat) => Promise<void> | void;
};

export const ExportTransactionModal = ({
  open,
  onOpenChange,
  onExport,
}: ExportTransactionModalProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    
    try {
      // Create a file input element dynamically
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = format === 'PDF' ? '.pdf' : '.csv';
      input.style.display = 'none';
      
      // Show loading toast
      const toastId = toast.loading(`Preparing ${format} export...`);
      
      // Trigger file selection
      input.click();
      
      // Wait for file selection
      await new Promise<void>((resolve) => {
        input.onchange = () => {
          if (input.files && input.files.length > 0) {
            const fileName = input.files[0].name;
            resolve();
            
            // Update toast to success
            toast.success(`Export successful!`, {
              description: `Transactions exported as ${format} (${fileName})`,
              id: toastId,
            });
          }
        };
      });

      // Call the actual export handler
      await onExport(format);
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Export failed", {
        description: "An error occurred during export",
      });
    } finally {
      setIsExporting(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileDown className="text-purple-600" />
            Export Transaction
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
          Select the document type you want to export
          </p>
        </DialogHeader>

        <div className="flex md:flex-row flex-col gap-4 md:items-center md:justify-center py-4">
          <div 
            className={`flex flex-col items-center gap-3 p-6 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors ${isExporting ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleExport("PDF")}
          >
            <div className="p-3 bg-purple-100 rounded-full">
              <FileDown className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="font-medium">PDF Format</h3>
            <p className="text-sm text-muted-foreground text-center">
              Export transactions as PDF document
            </p>
          </div>

          <div 
            className={`flex flex-col items-center gap-3 p-6 border rounded-lg cursor-pointer hover:bg-purple-50 transition-colors ${isExporting ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleExport("CSV")}
          >
            <div className="p-3 bg-purple-100 rounded-full">
              <FileDown className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="font-medium">CSV Format</h3>
            <p className="text-sm text-muted-foreground text-center">
              Export transactions as CSV spreadsheet
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-purple-700 text-purple-700 hover:border-purple-600 hover:text-purple-600"
            disabled={isExporting}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};