import PointsService from "@/services/points.service";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type PointRow = Database["public"]["Tables"]["points"]["Row"];

export function usePoints() {
  const [points, setPoints] = useState<PointRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const data = await PointsService.getAll();
        setPoints(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch points.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return {
    points,
    loading,
    error,
  };
}
