import axios from "axios";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3011',
    withCredentials: true,
});
const useAxios = () => {
    const { logOut, getIdToken } = useAuth();
    axiosSecure.interceptors.request.use(async (config) => {
        const token = await getIdToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            console.log('Authorization error detected, attempting logout...');
        }
        return Promise.reject(error);
    });
    
    return axiosSecure;
};

export default useAxios;