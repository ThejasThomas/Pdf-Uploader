import path from "node:path";
import { IFileStorage } from "../infrastructure/interfaces/IFileStorage";
import { IPdfRepository } from "../infrastructure/interfaces/IPdfRepository";

export class PdfRepository implements IPdfRepository{
    constructor(
        private fileStorage:IFileStorage
    ){}

    async saveFile(fileName: string, data: Buffer): Promise<void> {
        const filePath=path.join("uploads","extracted",fileName);
        await this.fileStorage.write(filePath,data)
    }

    async readFile(fileName: string): Promise<Buffer> {
        const filePath=path.join("uploads","originals",fileName);
        return await this.fileStorage.read(filePath)
    }
    async saveExtracted(fileName: string, data: Buffer): Promise<void> {
        const filePath=path.join("uploads","extracted",fileName);

        await this.fileStorage.write(filePath,data);
    }
}