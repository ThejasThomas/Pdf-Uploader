'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Archive, FileText, Download, Trash2, Clock } from 'lucide-react';
import { getAllPdfs } from '../service/pdf.api';

export const Documents = () => {
  const [pdfList, setPdfList] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const files=await getAllPdfs(page,6)
        setPdfList(files)
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchData();
  }, [page]);

  const isEmpty = pdfList.length === 0;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          All Documents
        </h2>
        <p className="text-gray-600">
          Manage and organize all your uploaded PDF documents in one place.
        </p>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Archive className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            No documents yet
          </p>
          <p className="text-gray-600 text-center max-w-sm mb-6">
            Start uploading PDF files to build your document library. Your files will appear here.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload Your First PDF
          </Link>
        </div>
      ) : (
        <>
          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfList.map((file) => (
              <Link
                key={file}
                to={`/documents/${file}`}
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-200"
              >
                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* File Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* File Name */}
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {file.length > 30 ? file.substring(0, 30) + '...' : file}
                    </p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>

                 
                </div>

               
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8 border-t border-gray-200">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
