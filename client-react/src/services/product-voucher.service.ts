import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type ProductInsert = Database["public"]["Tables"]["product_vouchers"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["product_vouchers"]["Update"];

export const productVouchersService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("product_vouchers")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("product_vouchers")
      .select("*")
      .eq("id", id)
      .eq("status", "active")
      .single();

    if (error) throw error;
    return data;
  },

  create: async (voucher: ProductInsert) => {
    const { data, error } = await supabase
      .from("product_vouchers")
      .insert([voucher])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to create product voucher");
    }
    return data;
  },

  update: async (id: string, updates: ProductUpdate) => {
    const { data, error } = await supabase
      .from("product_vouchers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw new Error(error.message || "Failed to update product voucher");
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from("product_vouchers")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  getBySpaceId: async ({ spaceId }: { spaceId: string }) => {
    const { data, error } = await supabase
      .from("product_vouchers")
      .select("*, product:products(*)")
      .eq("products.space_id", spaceId);

    if (error) throw error;
    return data;
  },
};
