import { BranchesService } from "@/services/branches.service";
import { Database } from "@/types/supabase";
type BranchRow = Database["public"]["Tables"]["branches"]["Row"];
import { useState, useEffect } from "react";

export function useBranches() {
  const [branches, setBranches] = useState<BranchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    BranchesService.getAll()
      .then((data) => setBranches(data))
      .catch((error) =>
        setError("Failed to fetch branches: " + (error as Error).message)
      )
      .finally(() => setLoading(false));
  }, []);

  const fetchBranchById = async (id: string) => {
    try {
      const branch = await BranchesService.getById(id);
      return branch;
    } catch (error) {
      throw new Error("Failed to fetch branch: " + (error as Error).message);
    }
  };

  const handleCreateBranch = async (branch: Omit<BranchRow, "id">) => {
    try {
      const newBranch = await BranchesService.create(branch);
      setBranches((prev) => [...prev, newBranch]);
    } catch (error) {
      setError("Failed to create branch: " + (error as Error).message);
    }
  };

  return {
    branches,
    loading,
    error,
    fetchBranchById,
    handleCreateBranch,
  };
}
