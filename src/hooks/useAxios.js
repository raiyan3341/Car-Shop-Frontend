import axios from "axios";
import useAuth from "./useAuth";

// 1. Create a Base URL instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3011', // আপনার ব্যাকএন্ডের URL
    withCredentials: true,
});

// 2. Interceptor to attach Firebase ID Token to every request
const useAxios = () => {
    const { logOut, getIdToken } = useAuth();
    
    // Request Interceptor: Attach Token
    axiosSecure.interceptors.request.use(async (config) => {
        const token = await getIdToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Response Interceptor: Handle 401/403 (Unauthorized/Forbidden)
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        
        // If the token is expired or invalid (401/403)
        if (status === 401 || status === 403) {
            console.log('Authorization error detected, attempting logout...');
            // In a real app, you might want to silently refresh the token first
            // For simplicity here, we force log out the user.
            // await logOut(); 
            // navigate('/login'); 
        }
        return Promise.reject(error);
    });
    
    return axiosSecure;
};

export default useAxios;