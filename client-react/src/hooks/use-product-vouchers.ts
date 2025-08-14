import { useQuery, useMutation } from "@tanstack/react-query";
import { productVouchersKeys } from "@/query-keys";
import { productVouchersService } from "@/services/product-vouchers.service";
import { toast } from "sonner";
import type { Database } from "@/types/supabase";

type ProductVoucherInsert =
  Database["public"]["Tables"]["product_vouchers"]["Insert"];

export function useProductVouchers(spaceId: string) {
  const query = useQuery({
    queryKey: productVouchersKeys.bySpace(spaceId),
    queryFn: () =>
      productVouchersService.getProductVouchersByProductId(spaceId),
    enabled: !!spaceId,
  });

  return {
    productVouchers: query.data,
    isProductVouchersPending: query.isPending,
    isProductVouchersError: query.isError,
    productVouchersError: query.error,
    refetchProductVouchers: query.refetch,
  };
}

export function useCreateProductVouchers(voucher: ProductVoucherInsert) {
  const mutation = useMutation({
    mutationFn: () => productVouchersService.create(voucher),
    onError: (err) => {
      toast.error(
        "Failed to create product voucher: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    },
    onSuccess: () => {
      toast.success("You redeemed a voucher!");
    },
  });

  return {
    createProductVoucher: mutation.mutateAsync,
    isCreatingProductVoucher: mutation.isPending,
    productVoucherError: mutation.error,
  };
}
