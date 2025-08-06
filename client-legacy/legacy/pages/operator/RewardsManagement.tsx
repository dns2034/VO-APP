import { FC, useState, useEffect } from "react";
import supabase from "@/api/supabaseClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit2, Trash2 } from "react-feather";
import { Reward } from "@/types/operator";
import { toast } from "sonner";

const RewardsManagement: FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const fetchRewards = async () => {
    const { data, error } = await supabase
      .from("rewards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error", {
        description: error.message,
      });
      return;
    }
    setRewards(data || []);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const rewardData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
    };

    try {
      if (editingReward) {
        const { error } = await supabase
          .from("rewards")
          .update(rewardData)
          .eq("id", editingReward.id)
          .select();

        if (error) throw error;
        toast.success("Success", {
          description: "Reward updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("rewards")
          .insert([rewardData])
          .select();

        if (error) throw error;
        toast.success("Success", {
          description: "Reward created successfully",
        });
      }

      setIsDialogOpen(false);
      setEditingReward(null);
      fetchRewards();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reward?")) return;

    try {
      const { error } = await supabase.from("rewards").delete().eq("id", id);

      if (error) throw error;
      toast.success("Success", {
        description: "Reward deleted successfully",
      });
      fetchRewards();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Rewards Management</h2>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#7643ea]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Reward
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[400px]">Description</TableHead>
              <TableHead className="w-[150px]">Price (Credits)</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rewards.map((reward) => (
              <TableRow key={reward.id}>
                <TableCell>{reward.name}</TableCell>
                <TableCell className="max-w-[400px]">
                  <div className="truncate">{reward.description}</div>
                </TableCell>
                <TableCell>{reward.price}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingReward(reward);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(reward.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setEditingReward(null);
            }
            setIsDialogOpen(open);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingReward ? "Edit Reward" : "Add New Reward"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingReward?.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingReward?.description}
                  className="h-32"
                  required
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm font-medium">
                  Price (Credits)
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={editingReward?.price}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingReward(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#7643ea]">
                  {editingReward ? "Update Reward" : "Create Reward"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default RewardsManagement;
