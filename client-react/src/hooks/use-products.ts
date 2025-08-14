import { useQuery } from "@tanstack/react-query";
import { productVouchersKeys } from "@/query-keys";
import { productsService } from "@/services/products.service";

export function useProducts(spaceId: string) {
  const query = useQuery({
    queryKey: productVouchersKeys.bySpace(spaceId),
    queryFn: () => productsService.getProductsBySpaceId(spaceId),
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

export function useProductsBySpaceId(spaceId: string) {
  const query = useQuery({
    queryKey: productVouchersKeys.bySpace(spaceId),
    queryFn: () => productsService.getProductsBySpaceId(spaceId),
    enabled: !!spaceId,
  });

  return {
    products: query.data,
    isProductsPending: query.isPending,
    isProductsError: query.isError,
    productsError: query.error,
    refetchProducts: query.refetch,
  };
}
