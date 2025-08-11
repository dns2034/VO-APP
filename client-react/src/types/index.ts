import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Tables } from "./supabase";

export type User = SupabaseUser
export type Business = Tables<'businesses'>