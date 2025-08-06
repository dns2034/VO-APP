import supabase from "@/config/supabase-client";

export async function getOrganizationClient({
  page,
  size,
}: {
  page?: number;
  size?: number;
}) {
  const query = supabase.from("user_profiles").select("*", {
    count: "exact",
  });

  if (typeof page === "number" && typeof size === "number")
    query.range(page, size);

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    data,
    count,
  };
}

export async function deactivateClient(clientId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({ is_active: false })
    .eq("id", clientId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function activateClient(clientId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({ is_active: true })
    .eq("id", clientId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
