import { supabaseClient } from "./supabase/client";

export class UserService {
  static async getUser() {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    return user;
  }
}
