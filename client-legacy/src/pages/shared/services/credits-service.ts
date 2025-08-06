import type { TCredit } from "@/types";
import supabase from "@/config/supabase-client";

export const getClientCreditsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("credits")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) new Error(error.message);

  return count;
};

export const getClientCreditsByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from("credits")
    .select()
    .eq("user_id", userId);

  if (error) throw error;

  return data;
}

export async function updateClientCreditsByUserId(
  userId: string,
  oldBalance: number,
  newBalance: number
) {
  if (newBalance > oldBalance) {
    const { error } = await supabase.from("credits").insert(
      Array.from({ length: newBalance - oldBalance }).map(() => ({
        user_id: userId,
        is_expired: false,
        status: "ACTIVE" as TCredit["status"],
        expires_at: new Date().toISOString(),
      }))
    );

    if (error) throw error;
  }

  if (newBalance < oldBalance) {
    const { data, error: ferror } = await supabase
      .from("credits")
      .select()
      .eq("user_id", userId)
      .eq("status", "ACTIVE")
      .limit(oldBalance - newBalance)
      .order("created_at", {
        ascending: true,
      });

    if (ferror) throw ferror;

    const { error: serror } = await supabase
      .from("credits")
      .delete()
      .eq("user_id", userId)
      .eq("status", "ACTIVE")
      .in(
        "id",
        data?.map((item) => item.id)
      );

    if (serror) throw serror;
  }
}