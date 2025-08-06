import { FC, useState, useEffect } from "react";
import supabase from "@/api/supabaseClient";
import { generateHash } from "@/utils/generateHash";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2 } from "react-feather";
import { Operator } from "@/types/operator";
import { toast } from "sonner";

const OperatorManagement: FC = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
    const { data, error } = await supabase.from("operators").select("*");
    if (error) {
      toast.error("Error", {
        description: "Error fetching operators",
      });
      return;
    }
    setOperators(data || []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const hashedPassword = password
        ? await generateHash(password)
        : undefined;

      if (editingOperator) {
        const updateData: Partial<Operator> = {
          name,
          email,
          ...(hashedPassword && { password: hashedPassword }),
        };

        const { error } = await supabase
          .from("operators")
          .update(updateData)
          .eq("id", editingOperator.id);

        if (error) throw error;

        toast.success("Success", {
          description: "Operator updated successfully",
        });
      } else {
        if (!hashedPassword) {
          toast.error("Error", {
            description: "Password is required for new operators",
          });
          return;
        }

        const { error } = await supabase.from("operators").insert({
          name,
          email,
          password: hashedPassword,
        });

        if (error) throw error;
        toast.success("Success", {
          description: "Operator created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingOperator(null);
      fetchOperators();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("operators").delete().eq("id", id);
      if (error) throw error;
      toast.success("Success", {
        description: "Operator deleted successfully",
      });
      fetchOperators();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Error deleting operator",
      });
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Operators</h2>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#7643ea]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Operator
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingOperator ? "Edit Operator" : "Add New Operator"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  defaultValue={editingOperator?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={editingOperator?.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>
                  {editingOperator ? "New Password (optional)" : "Password"}
                </Label>
                <Input
                  name="password"
                  type="password"
                  required={!editingOperator}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingOperator ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operators.map((operator) => (
              <TableRow key={operator.id}>
                <TableCell>{operator.name}</TableCell>
                <TableCell>{operator.email}</TableCell>
                <TableCell>
                  {new Date(operator.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingOperator(operator);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(operator.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default OperatorManagement;
