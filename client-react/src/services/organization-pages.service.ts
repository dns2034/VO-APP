import supabaseClient from "@/lib/supabase-client";

export const organizationPagesService = {
  getOrganizationPage: async () => {
    const { data, error } = await supabaseClient
      .from("organization_pages")
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
