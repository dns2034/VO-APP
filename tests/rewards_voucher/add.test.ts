import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your_anon_key"
);

let authClient: ReturnType<typeof createClient>;

beforeAll(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "jd@incub8space.com",
    password: "Samalamig21",
  });

  if (error || !data.session) {
    throw new Error("Failed to log in");
  }

  // Recreate client with Bearer token for subsequent requests
  authClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "null",
    {
      global: {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      },
    }
  );
});

const testRewardId = "966923b4-8946-4c22-9ef3-851a4d973ed5";

describe("reward_vouchers table", () => {
  it("inserts a reward voucher with real data", async () => {
    // First, get current user's ID
    const {
      data: { user },
      error: userError,
    } = await authClient.auth.getUser();

    if (userError || !user) {
      throw new Error("Could not fetch current user");
    }

    const { data, error } = await authClient
      .from("reward_vouchers")
      .insert([
        {
          reward_id: testRewardId,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    expect(error).toBeNull();
    expect(data?.reward_id).toBe(testRewardId);
    expect(data?.status).toBe("active");
  });
});
