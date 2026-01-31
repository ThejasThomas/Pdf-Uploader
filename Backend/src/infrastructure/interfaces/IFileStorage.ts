export interface IFileStorage {
    write(filePath:string,data:Buffer):Promise<void>
    read(filePath:string):Promise<Buffer>
}