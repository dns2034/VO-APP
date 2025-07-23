import { supabaseClient } from "./supabase/client";

const resetPassword = async (password: string): Promise<void> => {
  await supabaseClient.auth
    .updateUser({ password: password })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
export default resetPassword;
