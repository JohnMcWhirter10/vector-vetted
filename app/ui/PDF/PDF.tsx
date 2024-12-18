import React, { useEffect, useRef, memo, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";

type PDFProps = {
  file: File;
  currentPage: number;
  onDocumentLoad: (totalPages: number) => void;
};

export const PDF: React.FC<PDFProps> = memo(({ file, currentPage, onDocumentLoad }) => {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  const renderPage = useCallback(
    (pageNum) => {
      if (!pdfRef.current) return;

      pdfRef.current.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const context = canvas.getContext("2d");
          if (!context) return;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext).promise;
        }
      });
    },
    []
  );

  useEffect(() => {
    file.arrayBuffer().then((buffer) => {
      pdfjsLib.getDocument(buffer).promise.then((pdf) => {
        pdfRef.current = pdf;
        onDocumentLoad(pdf.numPages);
        renderPage(1);
      });
    });
  }, [file, renderPage, onDocumentLoad]);

  useEffect(() => {
    renderPage(currentPage);
  }, [currentPage, renderPage]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>;
});
