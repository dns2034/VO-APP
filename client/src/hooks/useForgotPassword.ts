// src/hooks/useForgotPassword.ts
import { forgotPassword } from "@/services/forgotPassword.service";
import { useState } from "react";
import { toast } from "sonner";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendResetLink = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await forgotPassword(email);
      setSuccess(true);
      toast.success("Password reset email sent successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSuccess(false);
        toast.error("Failed to send password reset email: " + err.message);
        setError(err.message || "Failed to send password reset email.");
      } else {
        setSuccess(false);
        toast.error("Failed to send password reset email.");
        setError("Failed to send password reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendResetLink, loading, error, success };
};

export default useForgotPassword;
