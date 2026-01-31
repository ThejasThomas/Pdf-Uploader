import { IPaginatedResult } from "../entity/IPaginatedResult";

export interface IPdfRepository{
    saveFile(fileName:string,data:Buffer,folder:"originals"|"extracted"):Promise<void>
    readFile(fileName:string):Promise<Buffer>
    saveExtracted(fileName:string,data:Buffer):Promise<void>
    listOriginals(page:number,limit:number):Promise<IPaginatedResult<string>>
    listExtracted(page:number,limit:number):Promise<IPaginatedResult<string>>;

}