import { supabaseClient } from "@/services/supabase/client";

import { Database } from "@/types/supabase";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export class ProductsService {
  static async getAll(): Promise<ProductRow[]> {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ProductRow[];
  }

  static async getById(id: string): Promise<ProductRow | null> {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(reward: ProductInsert): Promise<ProductRow> {
    const { data, error } = await supabaseClient
      .from("products")
      .insert([reward])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, updates: ProductUpdate): Promise<ProductRow> {
    const { data, error } = await supabaseClient
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}
