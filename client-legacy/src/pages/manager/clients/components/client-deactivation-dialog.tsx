import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clientKeys } from "@/lib/query-factory";
import { queryClient } from "@/main";
import { deactivateClient } from "@/pages/shared/services/client-service";
import type { TUserProfile } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountDeactivationDialog({
  open,
  onOpenChange,
  client,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const deactivationReasons = [
    "Inactive account for an extended period",
    "Suspicious or fraudulent activity",
    "Violation of platform rules",
    "Duplicate account detected",
  ];

  const deactivateMutation = useMutation({
    mutationFn: deactivateClient,
    onSuccess: () => {
      const now = new Date();

      toast.success("Account Deactivated", {
        description: `${format(now, "EEEE, MMMM dd, yyyy")} at ${format(
          now,
          "p"
        )}`,
      });
      onOpenChange(false);
      setConfirmDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to deactivate account");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });

  const handleDeactivate = async (client: TUserProfile | null) => {
    if (!client) return;

    await deactivateMutation.mutateAsync(client.id);
  };

  return (  
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] w-11/12 rounded md:w-full">
          <DialogHeader className="flex flex-row items-start">
            <div className="mr-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="17" x2="22" y1="8" y2="13" />
                  <line x1="22" x2="17" y1="8" y2="13" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle>Account Deactivation</DialogTitle>
              <DialogDescription>
                Select a reason to deactivate the client account.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="reason" className="text-sm font-medium">
                Reason for Deactivation
              </label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="reason" className="w-full">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {deactivationReasons.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add additional details..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              disabled={deactivateMutation.isPending}
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={deactivateMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setConfirmDialogOpen(true)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmDialogOpen}
        onOpenChange={(open) => !open && setConfirmDialogOpen(false)}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to deactivate ${client?.email}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-3 mt-4">
            <Button
              disabled={deactivateMutation.isPending}
              variant={"outline"}
              onClick={() => setConfirmDialogOpen(false)}
              className="mt-0"
            >
              Cancel
            </Button>
            <Button
              disabled={deactivateMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => handleDeactivate(client)}
            >
              Deactivate
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
