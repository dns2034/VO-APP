import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateProductVouchers } from "@/hooks/use-product-vouchers";
import { useQueryClient } from "@tanstack/react-query";
import { productVouchersKeys } from "@/query-keys";

export default function RedeemConfirmDialog({
  open,
  setIsOpen,
  selectedProductId,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  selectedProductId: string;
}) {
  const { createProductVoucher } = useCreateProductVouchers({
    product_id: selectedProductId,
  });
  const queryClient = useQueryClient();
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-lg font-semibold text-center">
            Confirm Voucher Redemption
          </h2>
          <div className="text-center">
            Are you sure you want to redeem this voucher?
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              variant="default"
              onClick={async () => {
                await createProductVoucher();
                queryClient.invalidateQueries({
                  queryKey: productVouchersKeys.bySpace(selectedProductId),
                });
                setIsOpen(false);
              }}
            >
              Yes, Redeem
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
