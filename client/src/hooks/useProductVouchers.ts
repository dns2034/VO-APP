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
    voucher: Omit<ProductVoucherRow, "id" | "created_at">
  ): Promise<ProductVoucherRow> => {
    try {
      const newVoucher = await ProductVoucherService.create(voucher);
      setProductVouchers((prev) => [newVoucher, ...prev]);
      return newVoucher;
    } catch (error) {
      throw new Error(
        "Failed to create product voucher: " + (error as Error).message
      );
    }
  };

  return { productVouchers, loading, error, createProductVoucher };
}
