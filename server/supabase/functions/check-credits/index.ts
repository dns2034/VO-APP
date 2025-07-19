import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { supabaseAdmin } from '../../_shared/supabaseAdmin.ts'
import { getUserFromRequest } from '../../_shared/getUserFromRequest.ts'

serve(async (req) => {
  const { user, error } = await getUserFromRequest(req)

  if (error || !user) {
    return new Response(JSON.stringify({ error }), { status: 401 })
  }

  const { count, error: countError } = await supabaseAdmin
    .from("credits")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "active")
    .gt("expires_at", new Date().toISOString())

  if (countError) {
    return new Response(JSON.stringify({ error: countError.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ credits: count }), {
    headers: { "Content-Type": "application/json" }
  })
})
