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

const testProductId = "a8fd26e4-6b73-4ebf-9561-7e07c7c68436";

describe("product_vouchers table", () => {
  it("inserts a product voucher with real data", async () => {
    const { data, error } = await authClient
      .from("product_vouchers")
      .insert([
        {
          product_id: testProductId,
        },
      ])
      .select()
      .single();

    expect(error).toBeNull();
    expect(data?.product_id).toBe(testProductId);
    expect(data?.status).toBe("active");
  });
});
