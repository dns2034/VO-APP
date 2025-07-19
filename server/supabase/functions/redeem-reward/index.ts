import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import type { Database } from "../../types/supabase.ts";

// Define the expected request body structure
interface RedeemRewardPayload {
  reward_id: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // --- 1. Initialize Supabase Client with User's Auth ---
    // The user's Authorization header is passed to the client,
    // ensuring all subsequent requests respect RLS policies.
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // --- 2. Validate Request Body ---
    const { reward_id }: RedeemRewardPayload = await req.json();
    if (!reward_id) {
      return new Response(JSON.stringify({ error: "reward_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- 3. Execute Redemption Logic via RPC ---
    // The RPC function `redeem_reward` is called without a user_id parameter.
    // It should be defined in the database to use `auth.uid()` to get the
    // current user's ID, ensuring the action is performed for the authenticated user.
    const { data, error: rpcError } = await supabaseClient.rpc(
      "redeem_reward",
      {
        p_reward_id: reward_id,
      }
    );

    if (rpcError) {
      console.error("RPC Error:", rpcError.message);
      // Provide a user-friendly error based on the database message
      const errorMessage = rpcError.message.includes("Insufficient points")
        ? "You do not have enough points to redeem this reward."
        : "Could not redeem reward. Please try again later.";

      // Check for auth error which might come from the RPC call itself
      if (rpcError.code === "401") {
        return new Response(
          JSON.stringify({ error: "Authentication failed" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400, // Bad Request for business logic failures
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- 4. Return Success Response ---
    return new Response(JSON.stringify({ success: true, voucher: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Unhandled error:", error.message);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
