import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // by adding this field browser will send the cookies to server automatically on every single req 
});

// Add Clerk token to every request
axiosInstance.interceptors.request.use(async (config) => {
    try {
        // Access Clerk session token from window
        if (window.__clerk_session) {
            const token = window.__clerk_session.tokens?.sessionToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        // Alternative: try to get from Clerk instance if available
        if (window.Clerk && window.Clerk.session) {
            const token = await window.Clerk.session.getToken({ template: 'integration_jwt' });
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