
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { extractPdf } from "../service/pdf.api";
import { PdfViewer } from "../components/PDF.viewer";
import { DndContext, closestCenter } from "@dnd-kit/core";
import toast from "react-hot-toast";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ArrowLeft } from "lucide-react";

export const PdfDetail = () => {
  const { fileName } = useParams();
  const navigate = useNavigate();
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const pdfUrl = `http://localhost:5000/uploads/originals/${fileName}`;

  const handlePageSelect = (pageNumber: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageNumber)
        ? prev.filter((p) => p !== pageNumber)
        : [...prev, pageNumber]
    );
  };

  const handleRemovePage = (pageNumber: number) => {
    setSelectedPages((prev) => prev.filter((p) => p !== pageNumber));
  };

  const handleExtract = async () => {
    if (!fileName || selectedPages.length === 0) {
      toast.error("Select at least one page");
      return;
    }

    setIsLoading(true);
    try {
      toast.loading("Extracting PDF...");
      await extractPdf(fileName, selectedPages);
      toast.dismiss();
      navigate("/documents");
      toast.success("PDF extracted successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Extraction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const SortableItem = ({ id }: { id: number }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all ${
          isDragging ? "shadow-lg bg-blue-50 border-blue-300" : "hover:shadow-md"
        }`}
      >
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="w-10 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200 flex-shrink-0">
          <span className="text-xs font-semibold text-blue-600">{id}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm">Page {id}</p>
          <p className="text-xs text-gray-500">Ready to extract</p>
        </div>

        <button
          onClick={() => handleRemovePage(id)}
          className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title="Remove page"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 truncate">{fileName}</h1>
        <p className="text-gray-600 text-sm mt-1">
          Select pages and reorder them before extraction
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PDF Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <PdfViewer
            pdfUrl={pdfUrl}
            onPageSelect={handlePageSelect}
            selectedPages={selectedPages}
          />
        </div>

        {/* Selected Pages Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent">
              <h2 className="font-bold text-gray-900 text-lg">Selected Pages</h2>
              <p className="text-xs text-gray-600 mt-1">
                {selectedPages.length} page{selectedPages.length !== 1 ? "s" : ""} selected
              </p>
            </div>

            {/* Pages List */}
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {selectedPages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Trash2 className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No pages selected</p>
                  <p className="text-xs text-gray-400 mt-1">Select pages to extract</p>
                </div>
              ) : (
                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => {
                    const { active, over } = event;

                    if (!over) return;

                    if (active.id !== over.id) {
                      setSelectedPages((items) => {
                        const oldIndex = items.indexOf(active.id as number);
                        const newIndex = items.indexOf(over.id as number);
                        return arrayMove(items, oldIndex, newIndex);
                      });
                    }
                  }}
                >
                  <SortableContext
                    items={selectedPages}
                    strategy={verticalListSortingStrategy}
                  >
                    {selectedPages.map((page) => (
                      <SortableItem key={page} id={page} />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </div>

            {/* Extract Button */}
            {selectedPages.length > 0 && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
                <button
                  onClick={handleExtract}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  {isLoading ? "Extracting..." : "Extract Pages"}
                </button>
                <button
                  onClick={() => setSelectedPages([])}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
