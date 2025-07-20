import { supabaseClient } from "@/services/supabase/client";

import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

type ProductRow = Database["public"]["Tables"]["product_vouchers"]["Row"];
type ProductInsert = Database["public"]["Tables"]["product_vouchers"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["product_vouchers"]["Update"];

export class ProductVoucherService {
  static async getAll(): Promise<ProductRow[]> {
    const { data, error } = await supabaseClient
      .from("product_vouchers")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ProductRow[];
  }

  static async getById(id: string): Promise<ProductRow | null> {
    const { data, error } = await supabaseClient
      .from("product_vouchers")
      .select("*")
      .eq("id", id)
      .eq("status", "active")
      .single();

    if (error) throw error;
    return data;
  }

  static async create(voucher: ProductInsert): Promise<ProductRow> {
    const { data, error } = await supabaseClient
      .from("product_vouchers")
      .insert([voucher])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: ProductUpdate): Promise<ProductRow> {
    const { data, error } = await supabaseClient
      .from("product_vouchers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("product_vouchers")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
