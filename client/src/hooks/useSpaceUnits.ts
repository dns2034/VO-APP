import { SpaceUnitsService } from "@/services/spaceUnits.service";
import { useState, useEffect, useCallback } from "react";
import { Database } from "@/types/supabase";

type SpaceUnitRow = Database["public"]["Tables"]["space_units"]["Row"];
type SpaceUnitInsert = Database["public"]["Tables"]["space_units"]["Insert"];
type SpaceUnitUpdate = Database["public"]["Tables"]["space_units"]["Update"];

export function useSpaceUnits() {
  const [spaceUnits, setSpaceUnits] = useState<SpaceUnitRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaceUnits = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SpaceUnitsService.getAll();
      setSpaceUnits(data);
    } catch (error) {
      setError("Failed to fetch space units: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpaceUnits();
  }, [fetchSpaceUnits]);

  const fetchSpaceUnitById = async (id: string) => {
    try {
      const spaceUnit = await SpaceUnitsService.getById(id);
      return spaceUnit;
    } catch (error) {
      throw new Error(
        "Failed to fetch space unit: " + (error as Error).message
      );
    }
  };

  const handleCreateSpaceUnit = async (
    spaceUnit: Omit<SpaceUnitRow, "id">
  ): Promise<SpaceUnitRow> => {
    try {
      const newSpaceUnit = await SpaceUnitsService.create(
        spaceUnit as SpaceUnitInsert
      );
      setSpaceUnits((prev) => [...prev, newSpaceUnit]);
      return newSpaceUnit;
    } catch (error) {
      setError("Failed to create space unit: " + (error as Error).message);
      throw error;
    }
  };

  const handleUpdateSpaceUnit = async (
    id: string,
    updates: SpaceUnitUpdate
  ): Promise<SpaceUnitRow> => {
    try {
      const updatedSpaceUnit = await SpaceUnitsService.update(id, updates);
      setSpaceUnits((prev) =>
        prev.map((unit) => (unit.id === id ? updatedSpaceUnit : unit))
      );
      return updatedSpaceUnit;
    } catch (error) {
      setError("Failed to update space unit: " + (error as Error).message);
      throw error;
    }
  };

  const handleDeleteSpaceUnit = async (id: string): Promise<void> => {
    try {
      await SpaceUnitsService.delete(id);
      setSpaceUnits((prev) => prev.filter((unit) => unit.id !== id));
    } catch (error) {
      setError("Failed to delete space unit: " + (error as Error).message);
      throw error;
    }
  };
  return {
    spaceUnits,
    loading,
    error,
    fetchSpaceUnitById,
    handleCreateSpaceUnit,
    handleUpdateSpaceUnit,
    handleDeleteSpaceUnit,
    fetchSpaceUnits,
  };
}
