import { supabaseAdmin } from './supabaseAdmin.ts'

export async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!token) {
    return { error: "Missing token" }
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !user) {
    return { error: "Invalid token" }
  }

  return { user }
}
