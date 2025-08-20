import { useQuery } from "@tanstack/react-query";
import { productKeys } from "@/query-keys";
import { productsService } from "@/services/products.service";

export function useProducts(spaceId: string) {
  const query = useQuery({
    queryKey: productKeys.bySpace(spaceId),
    queryFn: () => productsService.getBySpaceId(spaceId),
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

export function useProductsBySpaceId(spaceId: string) {
  const query = useQuery({
    queryKey: productKeys.bySpace(spaceId),
    queryFn: () => productsService.getBySpaceId(spaceId),
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
