import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { productVouchersService } from "@/services/product-vouchers.service";
import { useState } from "react";
import type { Product } from "@/types";
import { toast } from "sonner";

interface RedeemVoucherDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  spaceId: string | null;
  onRedeem: () => void;
  products: Product[]; // Add products as a prop
}

export default function RedeemVoucherDialog({
  open,
  setIsOpen,
  onRedeem,
  products, // Accept products as a prop
}: RedeemVoucherDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // Mutation for voucher redemption (now uses create)
  const {
    mutate: redeemVoucher,
    isError: isRedeemError,
    error: redeemError,
  } = useMutation({
    mutationFn: async (productId: string) => {
      if (!productId) throw new Error("No product selected");
      // Use the create service to create a new voucher
      await productVouchersService.create({
        product_id: productId,
        // Add any other required fields for creation here
      });
    },
    onSuccess: () => {
      toast.success("Voucher redeemed!");
      onRedeem();
    },
    onError: (err: any) => {
      toast.error(
        "Failed to redeem voucher: " + (err?.message || "Unknown error")
      );
    },
  });

  return (
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
          {isRedeemError && (
            <div className="text-red-500 text-sm mb-2">
              {redeemError instanceof Error
                ? redeemError.message
                : "Failed to redeem voucher"}
            </div>
          )}
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
                if (selectedProductId) redeemVoucher(selectedProductId);
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
  );
}
