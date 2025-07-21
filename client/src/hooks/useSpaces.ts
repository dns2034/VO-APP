import { Database } from "@/types/supabase";

import { useState, useEffect, useCallback } from "react";
import { SpacesService } from "@/services/spaces.service";

type SpaceRow = Database["public"]["Tables"]["spaces"]["Row"];
type SpaceInsert = Database["public"]["Tables"]["spaces"]["Insert"];
type SpaceUpdate = Database["public"]["Tables"]["spaces"]["Update"];

export function useSpaces() {
  const [spaces, setSpaces] = useState<SpaceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SpacesService.getAll();
      setSpaces(data);
    } catch (error) {
      setError("Failed to fetch spaces: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const createSpace = async (space: SpaceInsert) => {
    try {
      const newSpace = await SpacesService.create(space);
      setSpaces((prev) => [newSpace, ...prev]);
      return newSpace;
    } catch (error) {
      throw new Error("Failed to create space: " + (error as Error).message);
    }
  };

  const updateSpace = async (id: string, space: SpaceUpdate) => {
    try {
      const updatedSpace = await SpacesService.update(id, space);
      setSpaces((prev) => prev.map((s) => (s.id === id ? updatedSpace : s)));
      return updatedSpace;
    } catch (error) {
      throw new Error("Failed to update space: " + (error as Error).message);
    }
  };

  const deleteSpace = async (id: string) => {
    try {
      await SpacesService.delete(id);
      setSpaces((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      throw new Error("Failed to delete space: " + (error as Error).message);
    }
  };

  return {
    spaces,
    loading,
    error,
    fetchSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
  };
}
