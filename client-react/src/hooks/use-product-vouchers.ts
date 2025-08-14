import { useQuery } from "@tanstack/react-query";
import { productVouchersKeys } from "@/query-keys";
import { productVouchersService } from "@/services/product-vouchers.service";

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
