import { FC, useState, useEffect } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "@/api/clientApi";
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
import { Client } from "@/types/operator";
import { Plus, Edit2, Trash2 } from "react-feather";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 10;

const Clients: FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passwordError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);

      toast.error("Error", {
        description: "Failed to load clients",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(clients.length / ITEMS_PER_PAGE);
  const paginatedClients = clients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const operatorId = localStorage.getItem("userId");

    if (!operatorId) {
      toast.error("Error", {
        description: "Operator ID not found",
      });
      return;
    }

    try {
      const clientData = {
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        email: formData.get("email") as string,
        phone_number: formData.get("phone_number") as string,
        ...(editingClient
          ? {}
          : { password: formData.get("password") as string }), // Only include password for new clients
        operator_id: operatorId,
      };

      if (editingClient) {
        await updateClient(editingClient.id, clientData);

        toast.success("Success", {
          description: "Client updated successfully",
        });
      } else {
        await createClient(clientData);

        toast.success("Success", {
          description: "Client created successfully",
        });
      }

      await fetchClients();
      setIsDialogOpen(false);
      setEditingClient(null);
    } catch (error) {
      console.error("Error saving client:", error);

      toast.error("Error", {
        description: "Failed to save client",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    setIsLoading(true);
    try {
      await deleteClient(id);

      toast.success("Success", {
        description: "Client deleted successfully",
      });
      await fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);

      toast.error("Error", {
        description: "Failed to delete client",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Clients</h2>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#7643ea]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7643ea]" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.first_name}</TableCell>
                    <TableCell>{client.last_name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone_number}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingClient(client);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClient ? "Edit Client" : "Add New Client"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="first_name" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="first_name"
                name="first_name"
                defaultValue={editingClient?.first_name}
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="last_name"
                name="last_name"
                defaultValue={editingClient?.last_name}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={editingClient?.email}
                required
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                defaultValue={editingClient?.phone_number}
              />
            </div>
            {!editingClient && (
              <>
                <div>
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingClient(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#7643ea]">
                {editingClient ? "Save Changes" : "Add Client"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
