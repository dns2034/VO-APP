import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Product } from "@/types";
import { useProductsBySpaceId } from "@/hooks/use-products";
import RedeemConfirmDialog from "./redeem-confirm-dialog";

interface RedeemVoucherDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  spaceId: string;
}

export default function RedeemVoucherDialog({
  open,
  setIsOpen,
  spaceId,
}: RedeemVoucherDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const { products } = useProductsBySpaceId(spaceId);
  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <div>
            <h2 className="text-lg font-semibold mb-2">Redeem Voucher</h2>
            <div className="mb-4">
              {products && products.length > 0 ? (
                <ul className="space-y-2">
                  {products.map((product: Product) => (
                    <li key={product.id}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="product"
                          value={product.id}
                          checked={selectedProductId === product.id}
                          onChange={() => setSelectedProductId(product.id)}
                        />
                        <span>{product.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No products available for this space.</div>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setOpenConfirmDialog(true);
                  setIsOpen(false);
                }}
                disabled={!selectedProductId}
                type="button"
              >
                Redeem
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RedeemConfirmDialog
        open={openConfirmDialog}
        setIsOpen={setOpenConfirmDialog}
        selectedProductId={selectedProductId}
      />
    </>
  );
}
