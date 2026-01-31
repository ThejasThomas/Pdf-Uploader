import { AxiosInstance } from "../api/axios";

export const uploadPdf =async(file:File)=>{
    const formData=new FormData();
    formData.append("pdf",file);

    const response =await AxiosInstance.post(
        '/upload',
        formData
    )
    return response.data;
}