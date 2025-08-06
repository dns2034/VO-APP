"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useDocumentMutation } from "../mutation";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete?: (files: UploadFile[]) => void;
}

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "error" | "success";
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { mutateAsync: mutate } = useDocumentMutation();
  //   const ALLOWED_FILE_TYPES = [
  //     "application/pdf",
  //     "application/msword",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     "text/plain"
  //   ]

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const newUploadFiles = newFiles.map((file) => {
      return {
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "pending" as const,
      };
    });

    setFiles((prev) => [...prev, ...newUploadFiles]);

    // Auto start upload when files are added
    console.log(newFiles.length > 0);
    if (newFiles.length > 0) {
      setTimeout(() => simulateUpload(newUploadFiles), 500);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  //   const removeFile = (id: string) => {
  //     setFiles((prev) => prev.filter((file) => file.id !== id))
  //   }

  const simulateUpload = async (filesToUpload: UploadFile[]) => {
    console.log("simulateUpload");
    console.log("file length: ", filesToUpload.length);
    if (filesToUpload.length === 0) return;
    console.log("file state: ", files.length);

    setIsUploading(true);

    // Update all files to uploading status
    // setFiles((prev) => prev.map((file) => ({ ...file, status: "uploading" })));

    console.log("uploading: ", filesToUpload);

    // Simulate upload progress for each file
    filesToUpload.forEach((file) => {
      // let progress = 0
      // const interval = setInterval(() => {
      //   progress += Math.floor(Math.random() * 10) + 5

      //   if (progress >= 100) {
      //     progress = 100
      //     clearInterval(interval)

      //     // Set file as completed after a small delay
      //     setTimeout(() => {
      //       setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "success", progress: 100 } : f)))

      //       // Check if all files are done
      //       const allDone = files.every((f) => f.status === "success")

      //       if (allDone) {
      //         setTimeout(() => {
      //           setIsUploading(false)
      //           if (onUploadComplete) {
      //             onUploadComplete(files)
      //           }
      //         }, 1000)
      //       }
      //     }, 500)
      //   }

      //   setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
      // }, 300)

      console.log("uploading file: ", file);

      mutate({
        path: user?.id!,
        file: file.file,
      })
        .then((res) => {
          toast.success("Uploaded successfully!");
          console.log(res);
          setIsUploading(false);
          setFiles([]);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
          setIsUploading(false);
          setFiles([]);
        });
    });
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return (
        <div className="w-5 h-5 text-red-500">
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
      );
    } else if (file.type === "text/plain") {
      return (
        <div className="w-5 h-5 text-gray-500">
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
      );
    } else {
      return (
        <div className="w-5 h-5 text-blue-500">
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
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-3xl">
        {/* Purple Header */}
        <div className="bg-purple-600 text-white p-6 relative">
          <h2 className="text-2xl font-semibold">Upload Files</h2>
          <p className="text-white/80 mt-1">
            Attach your file for quick access and review.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Upload Area */}
          <div
            className={cn(
              "border border-dashed rounded-lg flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors h-64",
              isDragging ? "border-purple-600 bg-purple-50" : "border-gray-300",
              isUploading ? "pointer-events-none opacity-50" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              disabled={isUploading}
            />

            <div className="mb-4">
              <div className="w-16 h-16 mx-auto border-2 border-gray-300 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <h3 className="font-medium text-lg">
              Choose a File or Drag & Drop it here
            </h3>
            <p className="text-sm text-gray-500 mt-2">PDF, DOCS, and TXT</p>

            <Button
              className="mt-6 bg-purple-600 hover:bg-purple-700"
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
            >
              Browse A File
            </Button>
          </div>

          {/* Right Side - File List */}
          <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
            {files.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No files selected
              </div>
            ) : (
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-purple-100 rounded-lg p-4 relative"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getFileIcon(file.file)}
                      <span className="text-sm font-medium">
                        {file.file.name}
                      </span>
                    </div>
                    <Progress
                      value={file.progress}
                      className="h-2 bg-purple-200"
                      indicatorClassName="bg-purple-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
