import { PDFDocument } from "pdf-lib";
import { IPdfRepository } from "../infrastructure/interfaces/IPdfRepository";
import { IPdfService } from "../infrastructure/interfaces/serviceInterface/IPdfService";

export class PdfService implements IPdfService{
    constructor(
        private _pdfRepository:IPdfRepository
    ){}

    async extractPages(fileName: string, pages: number[]): Promise<string> {
        const pdfBytes=await this._pdfRepository.readFile(fileName);

        const originalPdf =await PDFDocument.load(pdfBytes);

        const newPdf=await PDFDocument.create()

        const copiedPages=await newPdf.copyPages(originalPdf,pages);
        copiedPages.forEach(page=>newPdf.addPage(page));

        const newPdfBytes =Buffer.from(await newPdf.save());
        const newFileName =`extracted_${Date.now()}.pdf`;

        await this._pdfRepository.saveFile(newFileName,newPdfBytes);

        return newFileName;
    }
    async upload(fileName: string, data: Buffer): Promise<string> {
        const savedName=`${Date.now()}_${fileName}`
        await this._pdfRepository.saveFile(savedName,data)
        return savedName;
    }
}