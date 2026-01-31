"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const pdf_lib_1 = require("pdf-lib");
class PdfService {
    constructor(_pdfRepository) {
        this._pdfRepository = _pdfRepository;
    }
    async extractPages(fileName, pages) {
        if (!pages || pages.length === 0) {
            throw new Error("No pages selected");
        }
        const pdfBytes = await this._pdfRepository.readFile(fileName);
        const originalPdf = await pdf_lib_1.PDFDocument.load(pdfBytes);
        const newPdf = await pdf_lib_1.PDFDocument.create();
        const zeroBasedPages = pages.map(p => p - 1);
        const totalPages = originalPdf.getPageCount();
        zeroBasedPages.forEach(index => {
            if (index < 0 || index >= totalPages) {
                throw new Error("Invalid page number selected");
            }
        });
        const copiedPages = await newPdf.copyPages(originalPdf, zeroBasedPages);
        console.log('copieed', copiedPages);
        copiedPages.forEach(page => newPdf.addPage(page));
        const newPdfBytes = Buffer.from(await newPdf.save());
        const newFileName = `extracted_${Date.now()}.pdf`;
        await this._pdfRepository.saveFile(newFileName, newPdfBytes, "extracted");
        return newFileName;
    }
    async upload(fileName, data) {
        const savedName = `${Date.now()}_${fileName}`;
        await this._pdfRepository.saveFile(savedName, data, "originals");
        return savedName;
    }
    async listPdfs(page, limit) {
        return this._pdfRepository.listOriginals(page, limit);
    }
    async listExtracted(page, limit) {
        return this._pdfRepository.listExtracted(page, limit);
    }
}
exports.PdfService = PdfService;
