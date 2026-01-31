import { PdfController } from "./controllers/pdf.controller";
import { NodeFileStorage } from "./infrastructure/nodeFileStorage";
import { PdfRepository } from "./repositories/pdf.repository";
import { PdfService } from "./services/pdf.service";

const fileStorage=new NodeFileStorage();
const pdfRepository=new PdfRepository(fileStorage)
const pdfService= new PdfService(pdfRepository)
const pdfController= new PdfController(pdfService)

export {pdfController}