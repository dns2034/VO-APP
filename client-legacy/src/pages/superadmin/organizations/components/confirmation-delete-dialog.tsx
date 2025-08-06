import CustomAlertDialog from "@/components/generics/custom-alert-dialog";
import { AlertTriangle } from "lucide-react";

interface ConfirmationDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  count?: number;
}

export const ConfirmationDeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  count = 1
}: ConfirmationDeleteDialogProps) => {
  return (
    <CustomAlertDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title={`Delete ${count > 1 ? `${count} Organizations` : 'Organization'}`}
      description={`Are you sure you want to delete ${count > 1 ? 'these organizations' : 'this organization'}? This action cannot be undone.`}
      confirmText={isLoading ? "Deleting..." : "Delete"}
      cancelText="Cancel"
      variant="danger"
      icon={<AlertTriangle className="h-5 w-5" />}
      confirmDisabled={isLoading}
    />
  );
};


// just push with the #508