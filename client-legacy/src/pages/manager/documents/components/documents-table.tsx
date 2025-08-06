import { ExtendedColumnDef, DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { MoreHorizontal, Upload, Trash } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentViewModal } from "./document-view-modal";
import { FileUploadModal } from "./file-upload-modal";
import { UploadedFile } from "./file-upload-modal";
import { AlertTriangle } from "lucide-react";
import CustomAlertDialog from "@/components/generics/custom-alert-dialog";

type Document = {
  id: string;
  documentName: string;
  category: string;
  uploadDate: Date;
  uploadedBy: string;
};

const sampleData: Document[] = [
  {
    id: "1",
    documentName: "Contract.pdf",
    category: "Contract",
    uploadDate: new Date("2025-02-11"),
    uploadedBy: "John Doe",
  },
  {
    id: "2",
    documentName: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-02-23"),
    uploadedBy: "Michael Smith",
  },
  {
    id: "3",
    documentName: "Permit.pdf",
    category: "Permit",
    uploadDate: new Date("2025-03-13"),
    uploadedBy: "David Johnson",
  },
  {
    id: "4",
    documentName: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-03-14"),
    uploadedBy: "Robert Brown",
  },
  {
    id: "5",
    documentName: "Business.docs",
    category: "Document",
    uploadDate: new Date("2025-03-28"),
    uploadedBy: "Daniel Wilson",
  },
  {
    id: "6",
    documentName: "Permit.pdf",
    category: "Permit",
    uploadDate: new Date("2025-04-10"),
    uploadedBy: "Daniel Wilson",
  },
];

export function DocumentsTable() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [searchParams] = useSearchParams();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: "Contract.pdf", status: "Uploading", progress: 75, type: "Contract" },
    { name: "Information.docx", status: "Completed", type: "Document" },
    { name: "Information.pdf", status: "Canceled", type: "Document" },
    { name: "Contract.docx", status: "Completed", type: "Contract" },
  ]);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 5);

  const handleSelectDocument = (id: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const handleDeleteDocuments = async () => {
    setIsDeleting(true);
    try {
      console.log("Deleting documents:", selectedDocuments);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setSelectedDocuments([]);
      setIsDeleteDialogOpen(false);
      toast.success(`${selectedDocuments.length} document${selectedDocuments.length > 1 ? 's' : ''} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting documents:", error);
      toast.error("There was an error deleting the documents. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: ExtendedColumnDef<Document>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            const pageRows = table.getRowModel().rows;
            if (value) {
              setSelectedDocuments(pageRows.map((row) => row.original.id));
            } else {
              setSelectedDocuments([]);
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedDocuments.includes(row.original.id)}
          onCheckedChange={() => handleSelectDocument(row.original.id)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "documentName",
      header: "Document Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "uploadDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Upload Date
          </Button>
        );
      },
      cell: ({ row }) => {
        const date: Date = row.getValue("uploadDate");
        const formattedDate = format(date, "PPP");
        return <div className="font-medium">{formattedDate}</div>;
      },
      sortable: true,
    },
    {
      accessorKey: "uploadedBy",
      header: "Uploaded By",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const document = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedDocument(document)}>
                View File
              </DropdownMenuItem>
              <DropdownMenuItem>Replace File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = sampleData.filter((document) => {
    const matchesSearch =
      document.documentName.toLowerCase().includes(searchValue.toLowerCase()) ||
      document.category.toLowerCase().includes(searchValue.toLowerCase()) ||
      document.uploadedBy.toLowerCase().includes(searchValue.toLowerCase());

    const matchesDate =
      !selectedDate ||
      format(document.uploadDate, "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd");

    return matchesSearch && matchesDate;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalCount = filteredData.length;

  return (
    <>
      <DataTable
        columns={columns}
        data={paginatedData}
        showDatePicker={false}
        onDateSelect={setSelectedDate}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search documents..."
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        actions={
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={selectedDocuments.length === 0}
              className={selectedDocuments.length > 0 ? "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" : ""}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        }
      />
      <DocumentViewModal
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        documentName={selectedDocument?.documentName ?? ""}
        uploadDate={selectedDocument?.uploadDate ?? new Date()}
      />
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        uploadedFiles={uploadedFiles}
        onUploadFiles={(files) => setUploadedFiles(files)}
      />
      <CustomAlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteDocuments}
        title={`Delete ${selectedDocuments.length > 1 ? `${selectedDocuments.length} Documents` : 'Document'}`}
        description={`Are you sure you want to delete ${selectedDocuments.length > 1 ? 'these documents' : 'this document'}? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="danger"
        icon={<AlertTriangle className="h-5 w-5" />}
        confirmDisabled={isDeleting}
      />
    </>
  );
}
