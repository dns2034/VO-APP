import CreditsService from "@/services/credits.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type CreditRow = Database["public"]["Tables"]["credits"]["Row"];

export function useCredits() {
  const [credits, setCredits] = useState<CreditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await CreditsService.getAll();
        setCredits(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch credits.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, []);

  return {
    credits,
    loading,
    error,
  };
}
