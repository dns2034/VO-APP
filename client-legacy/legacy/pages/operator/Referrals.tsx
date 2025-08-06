import { FC, useEffect, useState } from "react";
import supabase from "@/api/supabaseClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, ArrowDown, ArrowUp } from "react-feather";
import { toast } from "sonner";

interface Referral {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  referral_code: string;
  client_name: string; // Add this new field
}

type SortField = keyof Omit<Referral, "id">;

const Referrals: FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  const fetchReferrals = async () => {
    const { data, error } = await supabase
      .from("referrals")
      .select(
        `
                *,
                clients:client_id (
                    first_name,
                    last_name
                )
            `
      )
      .order(sortField, { ascending: sortDirection === "asc" });

    if (error) {
      console.error("Error fetching referrals:", error);
      return;
    }

    const formattedData = (data || []).map((referral) => ({
      ...referral,
      client_name: referral.clients
        ? `${referral.clients.first_name} ${referral.clients.last_name}`
        : "N/A",
    }));

    setReferrals(formattedData);
  };

  useEffect(() => {
    fetchReferrals();
  }, [sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingReferral) return;

    const { error } = await supabase
      .from("referrals")
      .update({
        first_name: editingReferral.first_name,
        last_name: editingReferral.last_name,
        email: editingReferral.email,
        phone_number: editingReferral.phone_number,
      })
      .eq("id", editingReferral.id);

    if (error) {
      toast.error("Error", {
        description: "Failed to update referral",
      });
      return;
    }

    toast.success("Success", {
      description: "Referral updated successfully",
    });

    setEditingReferral(null);
    fetchReferrals();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline w-4 h-4" />
    ) : (
      <ArrowDown className="inline w-4 h-4" />
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Referrals Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("created_at")}
              className="cursor-pointer"
            >
              Date <SortIcon field="created_at" />
            </TableHead>
            <TableHead>Referred By</TableHead>
            <TableHead
              onClick={() => handleSort("first_name")}
              className="cursor-pointer"
            >
              First Name <SortIcon field="first_name" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("last_name")}
              className="cursor-pointer"
            >
              Last Name <SortIcon field="last_name" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("email")}
              className="cursor-pointer"
            >
              Email <SortIcon field="email" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("phone_number")}
              className="cursor-pointer"
            >
              Phone <SortIcon field="phone_number" />
            </TableHead>
            <TableHead>Referral Code</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell>
                {new Date(referral.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{referral.client_name}</TableCell>
              <TableCell>{referral.first_name}</TableCell>
              <TableCell>{referral.last_name}</TableCell>
              <TableCell>{referral.email}</TableCell>
              <TableCell>{referral.phone_number}</TableCell>
              <TableCell>{referral.referral_code}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingReferral(referral)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Referral</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <div>
                        <label>First Name</label>
                        <Input
                          value={editingReferral?.first_name || ""}
                          onChange={(e) =>
                            setEditingReferral((prev) =>
                              prev
                                ? { ...prev, first_name: e.target.value }
                                : null
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Last Name</label>
                        <Input
                          value={editingReferral?.last_name || ""}
                          onChange={(e) =>
                            setEditingReferral((prev) =>
                              prev
                                ? { ...prev, last_name: e.target.value }
                                : null
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <Input
                          value={editingReferral?.email || ""}
                          onChange={(e) =>
                            setEditingReferral((prev) =>
                              prev ? { ...prev, email: e.target.value } : null
                            )
                          }
                        />
                      </div>
                      <div>
                        <label>Phone</label>
                        <Input
                          value={editingReferral?.phone_number || ""}
                          onChange={(e) =>
                            setEditingReferral((prev) =>
                              prev
                                ? { ...prev, phone_number: e.target.value }
                                : null
                            )
                          }
                        />
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Referrals;
