import supabase from "@/config/supabase-client";
import type { Database } from "@/types/supabase";

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export const productsService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(reward: ProductInsert) {
    const { data, error } = await supabase
      .from("products")
      .insert([reward])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: ProductUpdate) => {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;
  },
  getBySpaceId: async (spaceId: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("space_id", spaceId);

    if (error) throw error;
    return data;
  },
};
