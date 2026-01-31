"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfRepository = void 0;
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("fs/promises"));
class PdfRepository {
    constructor(fileStorage) {
        this.fileStorage = fileStorage;
    }
    async saveFile(fileName, data, folder) {
        const filePath = node_path_1.default.join("uploads", folder, fileName);
        await this.fileStorage.write(filePath, data);
    }
    async readFile(fileName) {
        const filePath = node_path_1.default.join("uploads", "originals", fileName);
        return await this.fileStorage.read(filePath);
    }
    async saveExtracted(fileName, data) {
        const filePath = node_path_1.default.join("uploads", "extracted", fileName);
        await this.fileStorage.write(filePath, data);
    }
    async listOriginals(page, limit) {
        const dirPath = node_path_1.default.join("uploads", "originals");
        const files = await promises_1.default.readdir(dirPath);
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
    async listExtracted(page, limit) {
        const dirPath = node_path_1.default.join("uploads", "extracted");
        const files = await promises_1.default.readdir(dirPath);
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
exports.PdfRepository = PdfRepository;
