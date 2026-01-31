import { useState } from "react";
import { uploadPdf } from "../service/pdf.api";

interface Props {
  onUploadSuccess: (fileName: string, pdfUrl: string) => void;
}

export const UploadForm = ({ onUploadSuccess }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // ✅ Validation: Only PDF allowed
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      const data = await uploadPdf(file);

      const fileName = data.pdfUrl.split("/").pop();

      onUploadSuccess(fileName, data.pdfUrl);

      setError("");
    } catch (err) {
      setError("Upload failed.");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};
