import { AxiosInstance } from "../api/axios";

export const uploadPdf =async(file:File)=>{
    console.log('heyy helo')
    const formData=new FormData();
    formData.append("pdf",file);

    const response =await AxiosInstance.post(
        '/api/pdf/upload',
        formData
    )
    return response.data;
}

export const getAllPdfs=async(page:number,limit:number)=>{
    const response =await AxiosInstance.get(`/api/pdf/list?page=${page}&limit=${limit}`);
    return response.data.files;
}

export const extractPdf=async(
    fileName:string,
    pages:number[]
)=>{
    const response=await AxiosInstance.post(
        "/api/pdf/extract",
        {fileName,pages}
    );
    return response.data;
}
export const getExtractedPdfs=async(page:number,limit:number)=>{
    const response=await AxiosInstance.get(
        `/api/pdf/extracted?page=${page}&limit=${limit}`
    )
    return response.data.files;
}