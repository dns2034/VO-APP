import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";
import type { Product } from "@/types";

export default function RedeemConfirmDialog({
  open,
  setIsOpen,
  spaceId,
  onSelectProduct,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  spaceId: string | null;
  onSelectProduct?: (product: Product) => void;
}) {
  // Fetch products for the space
  const { data: products, isPending } = useQuery({
    queryKey: ["products-for-space", spaceId],
    queryFn: () =>
      spaceId
        ? productsService.getProductsBySpaceId(spaceId)
        : Promise.resolve([]),
    enabled: !!spaceId && open,
  });

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
          <div className="mb-4 w-full">
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
                        onChange={() => onSelectProduct?.(product)}
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
          <div className="flex gap-4 justify-center">
            <Button variant="default" onClick={() => setIsOpen(false)}>
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
