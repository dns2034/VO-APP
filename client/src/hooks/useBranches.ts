import { BranchesService } from "@/services/branches.service";
import { Database } from "@/types/supabase";

type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
import { useState, useEffect, useCallback } from "react";

export function useBranches() {
  const [branches, setBranches] = useState<BranchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    try {
      const data = await BranchesService.getAll();
      setBranches(data);
    } catch (error) {
      setError("Failed to fetch branches: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateBranch = async (branch: Omit<BranchRow, "id">) => {
    try {
      const newBranch = await BranchesService.create(branch);
      setBranches((prev) => [...prev, newBranch]);
    } catch (error) {
      setError("Failed to create branch: " + (error as Error).message);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return { branches, loading, error, fetchBranches, handleCreateBranch };
}
