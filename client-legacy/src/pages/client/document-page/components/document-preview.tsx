import {  Download, FileText, AlertCircle, File } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docs";
}

interface DocumentPreviewProps {
  document: Document | null;
  onClose: () => void;
}

export const DocumentPreview = ({ document, onClose }: DocumentPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  if (!document) return null;

  const handleDownload = () => {
    console.log(`Downloading ${document.name}`);
  };

  // Simulate document loading
  const handleDocumentLoad = () => {
    setIsLoading(false);
  };

  const handleDocumentError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  // Reset states when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      setIsLoading(true);
      setLoadError(false);
    }
  };

  // Get file extension for display
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || '';
  };

  const fileExtension = getFileExtension(document.name);

  return (
    <Dialog open={!!document} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 sm:max-w-4xl max-h-[90vh] overflow-hidden rounded-xl">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
            <div className="absolute top-1/2 -left-8 w-24 h-24 rounded-full bg-white/20 blur-xl"></div>
          </div>
          
          <div className="flex justify-between items-center relative ">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-white">{document.name}</h3>
            </div>
            <div className=" pr-5 ">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white "
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
             
            </div>
          </div>
        </div>
        
        {/* Document Preview Area */}
        <div className="h-[calc(80vh-80px)] bg-gray-50 overflow-auto p-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-pulse bg-white p-6 rounded-lg shadow-sm">
                <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto flex items-center justify-center mb-4">
                  <File className="h-8 w-8 text-purple-500 animate-pulse" />
                </div>
                <p className="text-center text-gray-500">Loading document...</p>
              </div>
            </div>
          )}
          
          {loadError && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h4 className="text-lg font-medium mb-2">Unable to preview document</h4>
                <p className="text-gray-500 mb-4">
                  The document could not be loaded for preview. You can still download it to view on your device.
                </p>
                <Button 
                  onClick={handleDownload}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </Button>
              </div>
            </div>
          )}
          
          {!isLoading && !loadError && document.type === "pdf" && (
            <iframe 
              src={`/api/documents/${document.id}?preview=true`} 
              className="w-full h-full border-0 rounded-lg"
              onLoad={handleDocumentLoad}
              onError={handleDocumentError}
            />
          )}
          
          {!isLoading && !loadError && document.type === "docs" && (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg p-8 shadow-sm">
              <div className="w-20 h-20 rounded-lg bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                <span className="text-blue-600 font-bold">{fileExtension}</span>
              </div>
              <h4 className="text-lg font-medium mb-2">{document.name}</h4>
              <p className="text-gray-500 mb-4">
                This document type cannot be previewed directly. Please download to view.
              </p>
              <Button 
                onClick={handleDownload}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Document
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
