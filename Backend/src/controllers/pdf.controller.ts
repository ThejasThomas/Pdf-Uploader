import { Request, Response } from "express";
import { IPdfService } from "../infrastructure/interfaces/serviceInterface/IPdfService";
import { CustomError } from "../utils/ErrorHandler";

export class PdfController {
  constructor(private _pdfService: IPdfService) {}

  async extract(req: Request, res: Response) {
    try {
      const { fileName, pages } = req.body;
if (!fileName || !pages) {
      return res.status(400).json({
        message: "fileName and pages are required"
      });
    }
    
      const newFile = await this._pdfService.extractPages(fileName, pages);
    console.log('hey')
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
      console.log('pdfff',pdfUrl)

      res.json({ pdfUrl });
    } catch (error) {
      res.status(500).json({ message: "Upload failed" });
    }
  }

  async list(req:Request,res:Response){
    try{
      const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
      const files=await this._pdfService.listPdfs(page,limit);
      res.json(files);
    }
    catch(error){
      res.status(500).json({message:"List pdfs failed"})
    }
  }
  async listExtracted(
    req:Request,
    res:Response
  ){
    try{
      const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
      const files=await this._pdfService.listExtracted(page,limit);
      res.json(files);
    }catch(error){
      res.status(500).json({message:"List extracted pdf failed"})
    }
  }
}
