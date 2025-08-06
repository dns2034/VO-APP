import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  selectedCount: number
  singleFileName?: string
}

export const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  selectedCount,
  singleFileName,
}: DeleteConfirmationDialogProps) => {
  const isSingleFile = !!singleFileName

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <Trash className="h-5 w-5" />
            <DialogTitle>Delete {isSingleFile ? "Document" : "Documents"}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-3">
          <DialogDescription className="text-gray-700 text-base">
            {isSingleFile ? (
              <>
                Are you sure you want to delete <span className="font-medium">{singleFileName}</span>?
              </>
            ) : (
              <>
                Are you sure you want to delete {selectedCount} selected document{selectedCount !== 1 ? "s" : ""}?
              </>
            )}
          </DialogDescription>

          <div className="mt-4 bg-red-50 rounded-md p-3 border border-red-100">
            <p className="text-sm text-red-600">
              This action cannot be undone. The document{isSingleFile || selectedCount === 1 ? "" : "s"} will be
              permanently deleted.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2 mt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
