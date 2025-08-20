import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function NoVoucherPrompt({
  open,
  spaceName,
  onResult,
}: {
  open: boolean;
  spaceName: string | null;
  onResult: (result: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => onResult(false)}>
      <DialogContent>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold text-center">
            You don't have any voucher for the {spaceName ?? "space"}.
          </h2>
          <div className="text-center">Do you want to redeem a voucher?</div>
          <div className="flex gap-4 justify-center">
            <Button variant="default" onClick={() => onResult(true)}>
              Yes
            </Button>
            <Button variant="outline" onClick={() => onResult(false)}>
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
