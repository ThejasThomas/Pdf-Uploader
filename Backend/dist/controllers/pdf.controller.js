"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const ErrorHandler_1 = require("../utils/ErrorHandler");
class PdfController {
    constructor(_pdfService) {
        this._pdfService = _pdfService;
    }
    async extract(req, res) {
        try {
            const { fileName, pages } = req.body;
            if (!fileName || !pages) {
                return res.status(400).json({
                    message: "fileName and pages are required"
                });
            }
            const newFile = await this._pdfService.extractPages(fileName, pages);
            console.log('hey');
            const downloadUrl = `${req.protocol}://${req.get("host")}/uploads/extracted/${newFile}`;
            res.json({ downloadUrl });
        }
        catch (error) {
            res.status(500).json({ message: "Extraction failed" });
        }
    }
    async upload(req, res) {
        try {
            if (!req.file) {
                throw new ErrorHandler_1.CustomError("No file Uploaded", 400);
            }
            if (req.file.mimetype !== "application/pdf") {
                throw new ErrorHandler_1.CustomError("Only PDF files allowed", 400);
            }
            const savedName = await this._pdfService.upload(req.file.originalname, req.file.buffer);
            const pdfUrl = `${req.protocol}://${req.get("host")}/uploads/originals/${savedName}`;
            console.log('pdfff', pdfUrl);
            res.json({ pdfUrl });
        }
        catch (error) {
            res.status(500).json({ message: "Upload failed" });
        }
    }
    async list(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 6;
            const files = await this._pdfService.listPdfs(page, limit);
            res.json(files);
        }
        catch (error) {
            res.status(500).json({ message: "List pdfs failed" });
        }
    }
    async listExtracted(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 6;
            const files = await this._pdfService.listExtracted(page, limit);
            res.json(files);
        }
        catch (error) {
            res.status(500).json({ message: "List extracted pdf failed" });
        }
    }
}
exports.PdfController = PdfController;
