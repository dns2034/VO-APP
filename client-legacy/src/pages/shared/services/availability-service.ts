import supabase from "@/config/supabase-client";
import { format } from "date-fns";

export const getAvailabilitiesByDate = async ({ date }: { date: Date }) => {
  const query = supabase.from("availability").select("*");

  if (date !== undefined) {
    query.eq("date", format(date, "yyyy-MM-dd"));
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};
