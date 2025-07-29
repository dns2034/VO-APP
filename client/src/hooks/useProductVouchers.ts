import { ProductVoucherService } from "@/services/productVoucher.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { toast } from "sonner";
import { ProductsService } from "@/services/products.service";
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
      const product = await ProductsService.getById(product_id);
      const product_name = product ? product.name : "Unknown Product";
      setProductVouchers((prev) => [newVoucher, ...prev]);
      toast.success("Voucher Redeemed!", {
        description: `You have successfully redeemed ${product_name}.`,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Di malamang error";

      toast.error("Voucher Creation Failed", {
        description: errorMessage,
      });

      setError(errorMessage);
    }
  };

  const updateProductVoucherStatus = async (
    voucherId: string,
    status: Database["public"]["Enums"]["voucher_status"]
  ) => {
    try {
      await ProductVoucherService.update(voucherId, { status });
      setProductVouchers((prev) =>
        prev.map((v) => (v.id === voucherId ? { ...v, status } : v))
      );
    } catch (error) {
      toast.error("Failed to update voucher status", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return {
    productVouchers,
    loading,
    error,
    createProductVoucher,
    setProductVouchers,
    updateProductVoucherStatus,
  };
}
