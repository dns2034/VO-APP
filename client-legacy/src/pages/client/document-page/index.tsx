"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import usePaginationState from "@/hooks/use-pagination-state";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plane, Trash, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { deleteDocument, getDocuments } from "../../shared/services/document-service";
import { DeleteConfirmationDialog } from "./components/delete-confirmation";
import { DocumentPreview } from "./components/document-preview";
import { UploadDialog } from "./components/document-upload-dialog";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docs";
}

const DocumentsPage = () => {
  const [searchParams] = useSearchParams();
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(
    null
  );
  const { user } = useAuth();
  const { page, pageSize } = usePaginationState();
  const queryClient = useQueryClient();

  const [documents, setDocuments] = useState<Document[]>([
    // { id: "1", name: "Contract.pdf", type: "pdf" },
    // { id: "2", name: "Permit.pdf", type: "pdf" },
    // { id: "3", name: "Business.docs", type: "docs" },
    // { id: "4", name: "Business.docs", type: "docs" },
    // { id: "5", name: "Business.docs", type: "docs" },
    // { id: "6", name: "Permit.pdf", type: "pdf" },
  ]);

  const { data } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => await getDocuments(user?.id!, page, pageSize),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["documents"] });
  }, [page, pageSize]);

  useEffect(() => {
    if (data) {
      const newDocs = data?.map((doc) => {
        return {
          id: doc.id,
          name: doc.name,
          type: "pdf",
        } as Document;
      });
      setDocuments([...newDocs]);
    }
  }, [data]);

  const handleSelectDocument = (id: string, name: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(documents.map((doc) => doc.name));
    }
  };

  const handleDeleteSingle = (document: Document) => {
    setDocumentToDelete(document);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSelected = () => {
    if (selectedDocuments.length > 0) {
      setDocumentToDelete(null);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments((prev) =>
        prev.filter((doc) => doc.id !== documentToDelete.id)
      );
      setDocumentToDelete(null);
      deleteDocument(`${user?.id!}/${documentToDelete.name}`)
        .then((res) => {
          toast.success("Document has been deleted");
          console.log(res);
          queryClient.invalidateQueries({ queryKey: ["documents"] });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setDocuments((prev) =>
        prev.filter((doc) => !selectedDocuments.includes(doc.id))
      );
      selectedDocuments.forEach((doc) => {
        deleteDocument(`${user?.id!}/${doc}`)
          .then((res) => {
            toast.success("Document has been deleted");
            console.log(res);
            queryClient.invalidateQueries({ queryKey: ["documents"] });
          })
          .catch((error) => {
            console.log(error);
          });
      });
      setSelectedDocuments([]);
    }
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 h-full">
      <h1 className="text-2xl sm:text-3xl font-bold">Documents</h1>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
        Store and Organize Your Important Documents
      </p>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select defaultValue="all-business">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Business" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-business">All Business</SelectItem>
              <SelectItem value="travel">Travel and Tours</SelectItem>
              <SelectItem value="real-and-state">Real and State</SelectItem>
              <SelectItem value="e-comemerce">E-Commerce</SelectItem>
              <SelectItem value="free-lancing">Freelancing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-documents">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Documents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-documents">All Documents</SelectItem>
              <SelectItem value="pdf">PDF Files</SelectItem>
              <SelectItem value="docs">DOC Files</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 justify-end sm:justify-start">
          <Button
            variant="outline"
            onClick={() => setUploadDialogOpen(true)}
            className="flex-1 sm:flex-none"
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Upload File</span>
            <span className="sm:hidden">Upload</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDeleteSelected}
            disabled={selectedDocuments.length === 0}
            className={
              selectedDocuments.length > 0
                ? "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                : ""
            }
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-purple-600 text-white border-none mb-4">
        <CardContent className="p-4 sm:p-6 flex items-center">
          <Plane className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4" />
          <div>
            <h2 className="font-semibold text-base sm:text-lg">
              Travel and Tours
            </h2>
            <p className="text-xs sm:text-sm">
              Upload and Organize Your Travel Business Files
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-2 sm:p-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 mb-2">
            <div className="flex items-center">
              <Checkbox
                id="select-all"
                checked={
                  selectedDocuments.length === documents.length &&
                  documents.length > 0
                }
                onCheckedChange={handleSelectAll}
                className="mr-2 sm:mr-4 ml-0 sm:ml-1"
              />
              <label
                htmlFor="select-all"
                className="text-xs sm:text-sm font-medium"
              >
                {selectedDocuments.length > 0
                  ? `Selected ${selectedDocuments.length} of ${documents.length}`
                  : "Select All"}
              </label>
            </div>
            {selectedDocuments.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDocuments([])}
                className="text-xs sm:text-sm text-gray-500"
              >
                Clear selection
              </Button>
            )}
          </div>

          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between py-2 sm:py-3 border-b border-gray-200 last:border-0 ${
                selectedDocuments.includes(doc.id) ? "bg-purple-50" : ""
              }`}
            >
              <div className="flex items-center overflow-hidden">
                <Checkbox
                  id={`doc-${doc.id}`}
                  checked={selectedDocuments.includes(doc.id)}
                  onCheckedChange={() => handleSelectDocument(doc.id, doc.name)}
                  className="mr-2 sm:mr-4 ml-0 sm:ml-1"
                />
                {doc.type === "pdf" ? (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 text-red-500 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                      <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                      <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 text-blue-500 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                      <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                      <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
                <span className="truncate text-sm sm:text-base">
                  {doc.name}
                </span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteSingle(doc)}
                  className="text-gray-500 hover:text-red-500 h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Trash className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 h-8 px-2 sm:px-4 sm:h-9 text-xs sm:text-sm"
                  onClick={() => setPreviewDocument(doc)}
                >
                  <span className="hidden sm:inline">View Document</span>
                  <span className="sm:hidden">View</span>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="pt-6 sm:pt-10">
        <PaginationWithLinks
          page={Number(searchParams.get("page") ?? 1)}
          pageSize={Number(searchParams.get("pageSize") ?? 5)}
          totalCount={20}
        />
      </div>

      <DocumentPreview
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
      />

      <UploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onUploadComplete={(uploadedFiles) => {
          console.log("Uploaded files:", uploadedFiles);
        }}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        selectedCount={selectedDocuments.length}
        singleFileName={documentToDelete?.name}
      />
    </div>
  );
};

export default DocumentsPage;
