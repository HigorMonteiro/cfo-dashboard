"use client";

import { Upload, File, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

/**
 * PDF Upload Component
 * 
 * @description Handles PDF file uploads with drag and drop functionality, preview, and progress
 * @component
 * @returns {JSX.Element} PDF upload interface with drag & drop zone and file preview
 */
export default function PdfUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(
      file => file.type === 'application/pdf'
    );
    setFiles(prev => [...prev, ...pdfFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 10000000 // 10MB
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleUpload = async () => {
    // Simulando upload com progresso
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(progress);
    }
    // Aqui você implementaria a lógica real de upload
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop your PDF files here"
            : "Drag and drop PDF files here, or click to select"}
        </p>
        <p className="text-sm text-gray-400 mt-2">Maximum file size: 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-blue-500" />
                <span className="text-sm">{file.name}</span>
              </div>
              <button
                onClick={() => removeFile(file)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <Button
              onClick={handleUpload}
              className="w-full"
              disabled={uploadProgress > 0 && uploadProgress < 100}
            >
              {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload Files'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
