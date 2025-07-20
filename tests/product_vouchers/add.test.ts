import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
  {
    global: {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiJlMjAzOTIwNi1mMzEzLTQ5YzMtYmMxNi0wNTk2YzExZTRhNWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzUyOTc5MzMxLCJpYXQiOjE3NTI5NzU3MzEsImVtYWlsIjoiamRAaW5jdWI4c3BhY2UuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NTI5NzU3MzF9XSwic2Vzc2lvbl9pZCI6IjY1NGZjZmY3LTI0MjktNDNmNS04OTU1LTk0NmI4NzU2ZGU1MiIsImlzX2Fub255bW91cyI6ZmFsc2V9.WYulZepfMWg_hYtFB-worWgtcmFezIEx_8vaO-BMKUU",
      },
    },
  }
);

const testProductId = "a8fd26e4-6b73-4ebf-9561-7e07c7c68436";

describe("reward_vouchers table", () => {
  it("inserts a reward voucher with real data", async () => {
    const { data, error } = await supabase
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
