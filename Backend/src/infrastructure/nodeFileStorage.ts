import { IFileStorage } from "./interfaces/IFileStorage";
import fs from "fs/promises"

export class NodeFileStorage implements IFileStorage{
    async write(filePath: string, data: Buffer): Promise<void> {
        await fs.writeFile(filePath,data);
    }
    async read(filePath: string): Promise<Buffer> {
        return await fs.readFile(filePath)
    }
}