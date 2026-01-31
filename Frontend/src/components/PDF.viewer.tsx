import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

interface Props {
  pdfUrl: string;
}

export const PdfViewer = ({ pdfUrl }: Props) => {
  const [numPages, setNumPages] = useState<number>(0);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  useEffect(() => {
    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      setNumPages(pdf.numPages);
    };

    loadPdf();
  }, [pdfUrl]);

  return (
    <div>
      <h3>Total Pages: {numPages}</h3>

      {Array.from({ length: numPages }, (_, index) => (
        <Page key={index} pdfUrl={pdfUrl} pageNumber={index + 1} />
      ))}
    </div>
  );
};

import { useRef } from "react";

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
        canvas,
        viewport,
      }).promise;
    };

    renderPage();
  }, [pdfUrl, pageNumber]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        width: "100%",
      }}
    />
  );
};
