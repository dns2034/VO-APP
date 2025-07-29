import { useEffect, useState } from "react";
import { SpaceAvailabilityService } from "@/services/spaceAvailability.service";
import { Database } from "@/types/supabase";

type SpaceAvailabilityRow =
  Database["public"]["Tables"]["space_availability"]["Row"];

/**
 * Fetches space availability for a given space and date.
 * @param spaceId - The space id to filter by (optional).
 * @param date - The date to filter by (optional, format: YYYY-MM-DD).
 */
export function useSpaceAvailability(spaceId?: string, date?: Date) {
  const [availability, setAvailability] = useState<SpaceAvailabilityRow | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      setError(null);
      try {
        if (!spaceId || !date) {
          setAvailability(null);
          setLoading(false);
          return;
        }
        // Fetch all availabilities for the date
        const availabilities =
          await SpaceAvailabilityService.getAvailableSpaces(
            date.toISOString().slice(0, 10)
          );
        // Find the one for the given spaceId
        const found =
          availabilities.find((a) => a.space_id === spaceId) || null;
        setAvailability(found);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch availability"
        );
        setAvailability(null);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, [spaceId, date]);

  return { availability, loading, error };
}
