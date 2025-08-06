import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CloudUpload, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOCUMENT_CATEGORY_FILTER_OPTIONS } from "@/lib/constants";
import { useState, useRef } from "react";
import { TDocumentCategoryFilter } from "@/lib/types";
import { Input } from "@/components/ui/input";

export interface UploadedFile {
  name: string;
  status: "Uploading" | "Completed" | "Canceled";
  progress?: number;
  type: TDocumentCategoryFilter;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedFiles: UploadedFile[];
  onUploadFiles: (files: UploadedFile[]) => void;
}

const UploadZone = ({ onFileSelect }: { onFileSelect: (files: FileList | null) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div 
      className={` flex-1 border-2 border-dashed rounded-lg p-4 sm:p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 ${
        isDragging 
          ? 'border-purple-500 bg-purple-100' 
          : 'border-purple-300 bg-purple-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CloudUpload className={`h-16 w-16 sm:h-24 sm:w-24 mb-4 transition-colors duration-200 ${
        isDragging ? 'text-purple-600' : 'text-purple-500'
      }`} />
      <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
        {isDragging ? 'Drop files here' : 'Drag and Drop Files Here'}
      </p>
      <p className="text-sm sm:text-base text-gray-600 mb-4">OR</p>
      <Button 
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg"
        onClick={() => fileInputRef.current?.click()}
      >
        Browse File
      </Button>
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={(e) => onFileSelect(e.target.files)}
      />
    </div>
  );
};

const FileItem = ({ file }: { file: UploadedFile }) => {
  return (
    <div className="flex items-center p-4 border rounded-lg shadow-sm">
      <FileText className="h-6 w-6 text-purple-500 mr-3" />
      <div className="flex-1">
        <p className="font-medium text-gray-800">
          {file.name} {file.status === "Uploading" && `(${file.progress}%)`}
        </p>
        {file.status === "Uploading" && (
          <Progress value={file.progress} className="w-full h-2 mt-1" />
        )}
        {file.status === "Completed" && (
          <p className="text-green-600 text-sm">Completed</p>
        )}
        {file.status === "Canceled" && (
          <p className="text-gray-500 text-sm">Canceled</p>
        )}
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <MoreHorizontal className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  );
};

const FileList = ({ 
  files, 
  selectedCategory, 
  onCategoryChange 
}: { 
  files: UploadedFile[];
  selectedCategory: TDocumentCategoryFilter;
  onCategoryChange: (value: TDocumentCategoryFilter) => void;
}) => {
  const filteredFiles = files.filter(file => {
    if (selectedCategory === "all") return true;
    return file.type === selectedCategory;
  });

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Uploaded Files</h3>
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value as TDocumentCategoryFilter)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_CATEGORY_FILTER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {filteredFiles.map((file, index) => (
          <FileItem key={index} file={file} />
        ))}
      </div>
    </div>
  );
};

export function FileUploadModal({ isOpen, onClose, uploadedFiles, onUploadFiles }: FileUploadModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<TDocumentCategoryFilter>("all");

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        status: "Uploading",
        progress: 0,
        type: "Document",
      } as UploadedFile));
      onUploadFiles([...uploadedFiles, ...newFiles]);
    }
  };

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0  sm:mx-8 px-4 sm:px-0 max-h-[90vh] overflow-y-auto w-11/12 md:w-full rounded">
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl sm:text-2xl text-start font-bold text-purple-700">Upload Files</DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-gray-600">
                Attach your file for quick access and review
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
          <UploadZone onFileSelect={handleFileSelect} />
          <FileList 
            files={uploadedFiles}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 