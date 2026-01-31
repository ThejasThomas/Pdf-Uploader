import { useState } from "react";
import { UploadForm } from "../components/UploadForm";

export const Home = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUploadSuccess = (
    fileName: string,
    url: string
  ) => {
    setPdfUrl(url);
    setFileName(fileName);
  };

  return (
    <div>
      <h1>PDF Page Extractor</h1>

      <UploadForm onUploadSuccess={handleUploadSuccess} />

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
        />
      )}
    </div>
  );
};
