import supabase from "@/config/supabase-client";

interface PasswordResetResponse {
  data: unknown;
  error: Error | null;
}

export const sendPasswordResetEmail = async (
  email: string
): Promise<PasswordResetResponse> => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Password reset failed"),
    };
  }
};

export const resetPassword = async (
  newPassword: string
): Promise<PasswordResetResponse> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Password update error:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Password update failed"),
    };
  }
};
