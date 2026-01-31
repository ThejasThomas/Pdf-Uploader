export interface IPdfRepository{
    saveFile(fileName:string,data:Buffer):Promise<void>
    readFile(fileName:string):Promise<Buffer>
    saveExtracted(fileName:string,data:Buffer):Promise<void>
}