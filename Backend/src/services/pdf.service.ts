import { PDFDocument } from "pdf-lib";
import { IPdfRepository } from "../infrastructure/interfaces/IPdfRepository";
import { IPdfService } from "../infrastructure/interfaces/serviceInterface/IPdfService";
import { IPaginatedResult } from "../infrastructure/entity/IPaginatedResult";

export class PdfService implements IPdfService{
    constructor(
        private _pdfRepository:IPdfRepository
    ){}

    async extractPages(fileName: string, pages: number[]): Promise<string> {
        if (!pages || pages.length === 0) {
    throw new Error("No pages selected");
  }
        const pdfBytes=await this._pdfRepository.readFile(fileName);
        

        const originalPdf =await PDFDocument.load(pdfBytes);
       

        const newPdf=await PDFDocument.create()
         
         const zeroBasedPages = pages.map(p => p - 1);
    const totalPages = originalPdf.getPageCount();
    
  zeroBasedPages.forEach(index => {
    if (index < 0 || index >= totalPages) {
      throw new Error("Invalid page number selected");
    }
  });
  

        const copiedPages=await newPdf.copyPages(originalPdf,zeroBasedPages);
        console.log('copieed',copiedPages)
        copiedPages.forEach(page=>newPdf.addPage(page));
  
        const newPdfBytes =Buffer.from(await newPdf.save());
        const newFileName =`extracted_${Date.now()}.pdf`;

        await this._pdfRepository.saveFile(newFileName,newPdfBytes,"extracted");

        return newFileName;
    }
    async upload(fileName: string, data: Buffer): Promise<string> {
        const savedName=`${Date.now()}_${fileName}`
        await this._pdfRepository.saveFile(savedName,data,"originals")
        return savedName;
    }

    async listPdfs(page:number,limit:number): Promise<IPaginatedResult<string>> {
        return this._pdfRepository.listOriginals(
            page,
            limit
        );
    }
    async listExtracted(page:number,limit:number): Promise<IPaginatedResult<string>> {
        return this._pdfRepository.listExtracted(
            page,
            limit
        )
    }
}