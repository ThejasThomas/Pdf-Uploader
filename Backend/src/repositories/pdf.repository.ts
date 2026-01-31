import path from "node:path";
import { IFileStorage } from "../infrastructure/interfaces/IFileStorage";
import { IPdfRepository } from "../infrastructure/interfaces/IPdfRepository";
import fs from "fs/promises";
import { IPaginatedResult } from "../infrastructure/entity/IPaginatedResult";

export class PdfRepository implements IPdfRepository {
  constructor(private fileStorage: IFileStorage) {}

  async saveFile(
    fileName: string,
    data: Buffer,
    folder: "originals" | "extracted",
  ): Promise<void> {
    const filePath = path.join("uploads", folder, fileName);
    await this.fileStorage.write(filePath, data);
  }

  async readFile(fileName: string): Promise<Buffer> {
    const filePath = path.join("uploads", "originals", fileName);
    return await this.fileStorage.read(filePath);
  }
  async saveExtracted(fileName: string, data: Buffer): Promise<void> {
    const filePath = path.join("uploads", "extracted", fileName);

    await this.fileStorage.write(filePath, data);
  }

  async listOriginals(
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<string>> {
    const dirPath = path.join("uploads", "originals");
    const files = await fs.readdir(dirPath);
    const total = files.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedFiles = files.slice(start, start + limit);
    return {
      files: paginatedFiles,
      total,
      totalPages,
    };
  }
  async listExtracted(
    page: number,
    limit: number,
  ): Promise<IPaginatedResult<string>> {
    const dirPath = path.join("uploads", "extracted");
    const files = await fs.readdir(dirPath);
    const total = files.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedFiles = files.slice(start, start + limit);

    return {
      files: paginatedFiles,
      total,
      totalPages,
    };
  }
}
