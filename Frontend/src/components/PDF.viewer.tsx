'use client';

import { useEffect, useState } from "react";
import { useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import { Check } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props {
  pdfUrl: string;
  onPageSelect: (pageNumber: number) => void;
  selectedPages: number[];
}

export const PdfViewer = ({
  pdfUrl,
  onPageSelect,
  selectedPages
}: Props) => {
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      setNumPages(pdf.numPages);
    };

    loadPdf();
  }, [pdfUrl]);

  return (
    <div className="space-y-8">
      {Array.from({ length: numPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <div key={pageNumber} className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPages.includes(pageNumber)}
                  onChange={() => onPageSelect(pageNumber)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Page {pageNumber}
                </span>
              </label>
              {selectedPages.includes(pageNumber) && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">Selected</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Page pdfUrl={pdfUrl} pageNumber={pageNumber} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Page = ({ pdfUrl, pageNumber }: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderPage = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale: 1.2 });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvas: canvas,
        viewport: viewport
      }).promise;
    };

    renderPage();
  }, [pdfUrl, pageNumber]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full block bg-gray-50"
    />
  );
};
