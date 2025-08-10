import type { User as SupabaseUser } from "@supabase/supabase-js";

export type User = Omit<SupabaseUser, "user_metadata"> & {
  user_metadata: {
    avatar_url: string;
    display_name: string;
  };
};
