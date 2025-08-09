import supabase from "@/config/supabase-client";
import type { LoginSchema } from "@/lib/zod-schemas";

export const login = async (data: LoginSchema) => {
  return await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
};
