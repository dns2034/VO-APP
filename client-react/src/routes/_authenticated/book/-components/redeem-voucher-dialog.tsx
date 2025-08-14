import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { productVouchersService } from "@/services/product-vouchers.service";
import { useState } from "react";
import type { Product } from "@/types";
import { toast } from "sonner";
import { productsService } from "@/services/products.service";

interface RedeemVoucherDialogProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  spaceId: string | null;
  onRedeem: () => void;
}

export default function RedeemVoucherDialog({
  open,
  setIsOpen,
  spaceId,
  onRedeem,
}: RedeemVoucherDialogProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // Fetch products for the space
  const { data: products, isPending } = useQuery({
    queryKey: ["products-for-space", spaceId],
    queryFn: () =>
      spaceId
        ? productsService.getProductsBySpaceId(spaceId)
        : Promise.resolve([]),
    enabled: !!spaceId && open,
  });

  // Mutation for voucher redemption (now uses create)
  const {
    mutate: redeemVoucher,
    isLoading: isRedeeming,
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
            {isPending ? (
              <div>Loading products...</div>
            ) : products && products.length > 0 ? (
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
                        disabled={isRedeeming}
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
              disabled={isRedeeming}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedProductId) redeemVoucher(selectedProductId);
              }}
              disabled={!selectedProductId || isRedeeming}
              type="button"
              loading={isRedeeming ? "true" : undefined}
            >
              {isRedeeming ? "Redeeming..." : "Redeem"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
