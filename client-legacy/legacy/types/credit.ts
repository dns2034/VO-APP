export type Credit = {
  id: string;
  user_id: string;
  created_at: string;
  consumed_at: string;
  expires_at: string;
  is_expired: boolean;
  status: "ACTIVE" | "USED" | "EXPIRED";
};
