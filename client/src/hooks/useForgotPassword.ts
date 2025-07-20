// src/hooks/useForgotPassword.ts
import { forgotPassword } from "@/services/forgotPassword.service";
import { useState } from "react";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to send password reset email.");
      } else {
        setError("Failed to send password reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleForgotPassword, loading, error, success };
};

export default useForgotPassword;
