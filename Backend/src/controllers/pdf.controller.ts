import { Request, Response } from "express";
import { IPdfService } from "../infrastructure/interfaces/serviceInterface/IPdfService";
import { CustomError } from "../utils/ErrorHandler";

export class PdfController {
  constructor(private _pdfService: IPdfService) {}

  async extract(req: Request, res: Response) {
    try {
      const { fileName, pages } = req.body;

      const newFile = await this._pdfService.extractPages(fileName, pages);

      const downloadUrl = `${req.protocol}://${req.get("host")}/uploads/extracted/${newFile}`;

      res.json({ downloadUrl });
    } catch (error) {
      res.status(500).json({ message: "Extraction failed" });
    }
  }
  async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        throw new CustomError("No file Uploaded", 400);
      }
      if (req.file.mimetype !== "application/pdf") {
        throw new CustomError("Only PDF files allowed", 400);
      }
      const savedName = await this._pdfService.upload(
        req.file.originalname,
        req.file.buffer,
      );

      const pdfUrl = `${req.protocol}://${req.get("host")}/uploads/originals/${savedName}`;

      res.json({ pdfUrl });
    } catch (error) {
      res.status(500).json({ message: "Upload failed" });
    }
  }
}
