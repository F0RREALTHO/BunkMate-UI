import axios from 'axios';

const baseURL = import.meta.env.MODE === 'production'
    ? 'https://bunkmate-x3s6.onrender.com/api'
    : 'http://localhost:8080/api';

const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        const isAuthRoute = originalRequest.url?.endsWith('/student/login') ||
            originalRequest.url?.endsWith('/student');

        if (status && (status === 401 || status === 403) && !isAuthRoute) {
            localStorage.removeItem('token');
            window.location.replace('/login');
        }

        return Promise.reject(error);
    }
);

export default api;