import supabase from "@/config/supabase-client";
import { Database } from "@/types/supabase";

// TODO: add pagination
export async function getUserNotifications(
  userId: string,
  isRead: boolean,
  {
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }
) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId)
    .eq("is_read", isRead)
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) throw error;

  console.log("fetched: ", data);

  return data;
}

export async function notificationCount(userId: string, isRead: boolean) {
  const { error, count } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", userId)
    .eq("is_read", isRead);

  if (error) throw error;

  return count;
}

export async function sendNotification(
  userId: string,
  receiverId: string,
  options: {
    contextType?: Database['public']['Enums']['notification_types'];
    contextId?: string;
    title?: string;
    message?: string;
    data?: Database['public']['Tables']['notifications']['Row']['data'];
  }
) {
  const { data, error } = await supabase.from("notifications").insert({
    user_id: userId,
    receiver_id: receiverId,
    context_id: options.contextId,
    context_type: options.contextType,
    title: options.title,
    message: options.message,
    data: options.data,
  });

  if (error) throw error;

  return data;
}

export async function updateNotification(userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("user_id", userId);

  if (error) throw error;
}

export async function realtimeNotification(userId: string) {
  const channel = supabase
    .channel("notification")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        console.log(payload);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "notifications",
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        console.log(payload);
      }
    )
    .subscribe();

  return channel;
}

export async function deleteUserNotification(userId: string) {
  const response = await supabase
    .from("notifications")
    .delete()
    .eq("receiver_id", userId);

  if (response.error) throw response.error;
}
