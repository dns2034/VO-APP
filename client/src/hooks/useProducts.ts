import { useEffect, useState } from "react";
import { ProductsService } from "@/services/products.service";

import { Database } from "@/types/supabase";
type RewardRow = Database["public"]["Tables"]["products"]["Row"];

export function useProducts() {
  const [products, setProducts] = useState<RewardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await ProductsService.getAll();
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch products.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  return {
    products,
    loading,
    error,
  };
}
