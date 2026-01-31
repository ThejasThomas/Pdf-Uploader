import axios from "axios";

export const AxiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URI,
    withCredentials:true,
})
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong";

    alert(message); 

    return Promise.reject(error);
  }
);
