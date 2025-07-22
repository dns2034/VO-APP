import { ProductVoucherService } from "@/services/productVoucher.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { toast } from "sonner";

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
        setError("Failed to fetch product vouchers" + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductVouchers();
  }, []);

  const createProductVoucher = async (product_id: string): Promise<void> => {
    try {
      const newVoucher = await ProductVoucherService.create({ product_id });
      setProductVouchers((prev) => [newVoucher, ...prev]);
      toast.success("Product Voucher Created!", {
        description: `Successfully created voucher for product ID ${product_id}.`,
      });
    } catch (error) {
      toast.error("Voucher Creation Failed", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
      setError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return { productVouchers, loading, error, createProductVoucher };
}
