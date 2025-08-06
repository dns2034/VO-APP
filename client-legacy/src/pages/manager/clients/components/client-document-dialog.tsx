import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import type { TUserProfile } from "@/types";
import { useState } from "react";
import { DocumentPreviewDialog } from "./document-preview-dialog";

interface ClientDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: TUserProfile | null;
}

interface Document {
  name: string;
  category: string;
  uploadDate: Date;
  id: string;
}

// Sample data - replace with actual API data later
const sampleDocuments: Document[] = [
  {
    id: "doc1",
    name: "Contract.pdf",
    category: "Contract",
    uploadDate: new Date("2025-02-11"),
  },
  {
    id: "doc2",
    name: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-02-23"),
  },
  {
    id: "doc3",
    name: "Permit.pdf",
    category: "Permit",
    uploadDate: new Date("2025-03-13"),
  },
  {
    id: "doc4",
    name: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-03-14"),
  },
  {
    id: "doc5",
    name: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-03-28"),
  },
];

export function ClientDocumentDialog({
  open,
  onOpenChange,
  client,
}: ClientDocumentDialogProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  if (!client) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">Client Documents</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Uploaded Documents for Client: {client.first_name} {client.last_name}
            </p>
          </DialogHeader>

          <div className="flex items-center justify-between gap-4 mb-4">
            <Input
              placeholder="Filter documents by contract, permit..."
              className="max-w-sm"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="permit">Permit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{format(doc.uploadDate, "MMMM dd, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedDocument(doc)}>
                            View File
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Delete File
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <DocumentPreviewDialog
        open={!!selectedDocument}
        onOpenChange={(open) => !open && setSelectedDocument(null)}
        document={selectedDocument}
      />
    </>
  );
} 