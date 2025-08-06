import { FC, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit2, Trash2 } from "react-feather";
import { Availability, Resource } from "@/types/operator"; // Update import to include Resource
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getAllResources } from "@/api/resourceApi";
import {
  getResourceAvailabilities,
  createAvailability,
  deleteAvailability,
} from "@/api/availabilityApi";
import { toast } from "sonner";

const ResourceAvailability: FC = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAvailability, setEditingAvailability] =
    useState<Availability | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = availabilities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(availabilities.length / ITEMS_PER_PAGE);

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    if (selectedResourceId) {
      loadAvailabilities(selectedResourceId);
    }
  }, [selectedResourceId]);

  const loadResources = async () => {
    try {
      const data = await getAllResources();
      setResources(data);
    } catch {
      toast.error("Error", {
        description: "Failed to load resources",
      });
    }
  };

  const loadAvailabilities = async (resourceId: string) => {
    try {
      const data = await getResourceAvailabilities(resourceId);
      setAvailabilities(data);
    } catch {
      toast.error("Error", {
        description: "Failed to load availabilities",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resourceId = formData.get("resource_id") as string;
    const startDate = new Date(formData.get("start_date") as string);
    const endDate = new Date(formData.get("end_date") as string);
    const fromTime = formData.get("from") as string;
    const toTime = formData.get("to") as string;
    const operatorId = localStorage.getItem("userId") || "";

    try {
      const dates: Date[] = [];
      const currentDate = startDate;

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const availabilities = dates.map((date) => ({
        resource_id: resourceId,
        date: date.toISOString().split("T")[0],
        start_time: fromTime,
        end_time: toTime,
        operator_id: operatorId,
        status: "available",
        is_available: true,
        created_at: new Date().toISOString(),
      }));

      await Promise.all(availabilities.map((a) => createAvailability(a)));
      await loadAvailabilities(resourceId);
      setIsDialogOpen(false);
      setEditingAvailability(null);
      toast.success("Success", {
        description: "Availabilities created",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to create availabilities",
      });
    }
  };

  const handleDelete = async (id: string, resourceId: string) => {
    try {
      await deleteAvailability(id);
      await loadAvailabilities(resourceId);

      toast.success("Success", {
        description: "Availability deleted",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to delete availability",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-auto p-4">
      <Card className="min-h-full">
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-lg font-semibold">Availability</h2>
              <select
                className="p-2 border rounded-md focus:ring-2 focus:ring-[#7643ea] focus:border-transparent"
                value={selectedResourceId}
                onChange={(e) => setSelectedResourceId(e.target.value)}
              >
                <option value="">Select a resource</option>
                {resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="bg-[#7643ea]"
              onClick={() => setIsDialogOpen(true)}
              disabled={!selectedResourceId}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((availability) => {
                  const resource = resources.find(
                    (r) => r.id === availability.resource_id
                  );
                  return (
                    <TableRow key={availability.id}>
                      <TableCell>{resource?.name}</TableCell>
                      <TableCell>
                        {new Date(availability.date).toLocaleDateString()} ({" "}
                        {new Date(
                          `2000-01-01T${availability.start_time}`
                        ).toLocaleTimeString([], { timeStyle: "short" })}
                        {" - "}
                        {new Date(
                          `2000-01-01T${availability.end_time}`
                        ).toLocaleTimeString([], { timeStyle: "short" })}
                        )
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingAvailability(availability);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                          onClick={() =>
                            handleDelete(
                              availability.id,
                              availability.resource_id
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 py-2 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, availabilities.length)} of{" "}
              {availabilities.length} entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAvailability
                  ? "Edit Availability"
                  : "Add New Availability"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Resource</Label>
                <select
                  name="resource_id"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#7643ea] focus:border-transparent"
                  defaultValue={editingAvailability?.resource_id}
                  required
                >
                  <option value="">Select a resource</option>
                  {resources.map((resource) => (
                    <option key={resource.id} value={resource.id}>
                      {resource.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    name="start_date"
                    type="date"
                    defaultValue={editingAvailability?.date}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    name="end_date"
                    type="date"
                    defaultValue={editingAvailability?.date}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Input
                    name="from"
                    type="time"
                    defaultValue={editingAvailability?.start_time}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Input
                    name="to"
                    type="time"
                    defaultValue={editingAvailability?.end_time}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#7643ea]">
                {editingAvailability ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default ResourceAvailability;
