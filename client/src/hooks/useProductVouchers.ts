import { ProductVoucherService } from "@/services/productVoucher.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type ProductVoucherRow =
  Database["public"]["Tables"]["product_vouchers"]["Row"];

export function useProductVouchers() {
  const [productVouchers, setProductVouchers] = useState<ProductVoucherRow[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductVouchers = async () => {
      try {
        const data = await ProductVoucherService.getAll();
        setProductVouchers(data);
      } catch (error) {
        //console.error("Error fetching product vouchers:", error);
        setError("Failed to fetch product vouchers" + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductVouchers();
  }, []);

  const createProductVoucher = async (
    productId: string
  ): Promise<{ voucher: ProductVoucherRow | null; error: string | null }> => {
    try {
      const newVoucher = await ProductVoucherService.create({
        product_id: productId,
      });
      setProductVouchers((prev) => [...prev, newVoucher]);
      return { voucher: newVoucher, error: null };
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "Failed to create product voucher";
      //console.error("Error creating product voucher:", error);
      setError(errorMessage);
      return { voucher: null, error: errorMessage };
    }
  };

  return { productVouchers, loading, error, createProductVoucher };
}
