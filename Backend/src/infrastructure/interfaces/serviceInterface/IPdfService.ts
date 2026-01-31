export interface IPdfService {
    upload(fileName:string,data:Buffer):Promise<string>
    extractPages(fileName:string,pages:number[]):Promise<string>
}