
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getExtractedPdfs } from "../service/pdf.api";

export const Extracted = () => {
  const [pdfList, setPdfList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getExtractedPdfs(page, 6);
      setPdfList(response.files);
      setTotalPages(response.totalPages);
    };

    fetchData();
  }, [page]);

  const isEmpty = pdfList.length === 0;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Extracted PDFs
        </h2>
        <p className="text-gray-600">
          View and manage all your extracted PDF documents.
        </p>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            No extracted documents yet
          </p>
          <p className="text-gray-600 text-center max-w-sm">
            Extract text from your PDF files and they will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Extracted PDFs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfList.map((file) => (
              <a
                key={file}
                href={`${import.meta.env.VITE_API_URI}/uploads/extracted/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200"
              >
                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* File Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>

                  {/* File Name */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                      {file.length > 30 ? file.substring(0, 30) + "..." : file}
                    </p>
                    <p className="text-xs text-gray-500">Extracted PDF</p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <FileText className="w-4 h-4" />
                    <span>Ready to download</span>
                  </div>
                </div>

                
              </a>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="text-sm text-gray-600 font-medium">
              Page <span className="text-blue-600">{page}</span> of{" "}
              <span className="text-blue-600">{totalPages}</span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
