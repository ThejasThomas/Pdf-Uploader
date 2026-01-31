import { IPaginatedResult } from "../../entity/IPaginatedResult"

export interface IPdfService {
    upload(fileName:string,data:Buffer):Promise<string>
    extractPages(fileName:string,pages:number[]):Promise<string>
    listPdfs(page:number,limit:number):Promise<IPaginatedResult<string>>
    // extractPages(fileName:string,pages:number[]):Promise<string>
    listExtracted(page:number,limit:number):Promise<IPaginatedResult<string>>
}