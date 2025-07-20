import { supabaseClient } from "@/services/supabase/client";

export const forgotPassword = async (email: string) => {
  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
    email
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const verifyOtp = async (email: string, token: string) => {
  const { data, error } = await supabaseClient.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
