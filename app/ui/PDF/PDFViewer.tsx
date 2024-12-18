'use client'

import React, { useState } from "react";
import { PDF } from "./PDF";

export type PDFViewerProps = {
  id?: string;
  w?: number;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ id = 'file', w = 400 }) => {
  const [file, setFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrint = () => {
    if (file) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(
          `<iframe src="${URL.createObjectURL(file)}" style="width:100%;height:100%;" frameborder="0"></iframe>`
        );
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleSave = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block">
        Upload File (PDF):
      </label>
      <input
        type="file"
        id={id}
        name={id}
        accept=".pdf"
        onChange={handleFileChange}
        className="p-2 border border-gray-300 rounded"
      />
      {file && (
        <div style={{width: w, border: '1px solid #ccc'}}>
            <div className="mt-2 flex space-x-10">
            <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">
                Print
            </button>
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded ml-2">
                Save
            </button>
            </div>
            <PDF
                file={file}
                currentPage={currentPage}
                onDocumentLoad={setTotalPages}
            />
            <div className="mt-2">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
                </button>
                <span className="mx-4">
                Page {currentPage} of {totalPages}
                </span>
                <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                >
                Next
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
