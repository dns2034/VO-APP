import type { TPoint } from "@/types";
import supabase from "../../../config/supabase-client";

export const getClientPointsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("points")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) new Error(error.message);

  return count;
};

export const getClientPoints = async (userId: string): Promise<TPoint[]> => {
  const { data, error } = await supabase
    .from("points")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as TPoint[];
};


export async function getClientPointsByUserId(userId: string) {
  const { data, error } = await supabase
    .from("points")
    .select()
    .eq("user_id", userId)
    .eq("status", "ACTIVE")
    .eq("is_expired", false);

  if (error) throw error;

  return data;
}

export async function updateClientPointsByUserId(
  userId: string,
  oldBalance: number,
  newBalance: number
) {
  if (newBalance > oldBalance) {
    const { error } = await supabase.from("points").insert(
      Array.from({ length: newBalance - oldBalance }).map(() => ({
        user_id: userId,
        is_expired: false,
        status: "ACTIVE" as TPoint["status"],
        expires_at: new Date().toISOString(),
      }))
    );

    if (error) throw error;
  }

  if (newBalance < oldBalance) {
    const { data, error: ferror } = await supabase
      .from("points")
      .select()
      .eq("user_id", userId)
      .eq("status", "ACTIVE")
      .limit(oldBalance - newBalance)
      .order("created_at", {
        ascending: true,
      });

    if (ferror) throw ferror;

    const { error: serror } = await supabase
      .from("points")
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