import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Add Clerk session token to every request
axiosInstance.interceptors.request.use(async (config) => {
    try {
        // Get the session token from Clerk
        if (window.Clerk && window.Clerk.session) {
            const token = await window.Clerk.session.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        console.error('Error getting Clerk token:', error);
    }
    return config;
});

export default axiosInstance;