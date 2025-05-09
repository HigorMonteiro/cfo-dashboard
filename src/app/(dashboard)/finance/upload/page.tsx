"use client";

/**
 * Bank Statement Upload Page
 * 
 * @description Page for uploading and processing bank statement PDFs
 * @component
 */
export default function UploadStatementsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Bank Statements</h1>
          <p className="text-muted-foreground mt-2">
            Upload your bank statements in PDF format for automatic processing
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <PdfUpload />
          </div>
        </div>
      </div>
    </div>
  );
}

import PdfUpload from "@/components/PdfUpload";