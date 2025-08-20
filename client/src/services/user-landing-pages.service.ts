import supabaseClient from "@/lib/supabase-client";

export const organizationPagesService = {
  getLandingPage: async () => {
    const { data, error } = await supabaseClient
      .from("user_landing_pages")
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
