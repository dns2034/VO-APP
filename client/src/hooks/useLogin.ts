import { LoginService } from "../services/login.service";
import { useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await LoginService(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    }
    return { data, error };
  };

  return { login, loading, error };
};

export default useLogin;
