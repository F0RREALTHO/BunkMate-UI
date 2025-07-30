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
        // Check if the error is a 401 OR 403 error
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Remove the invalid token
            localStorage.removeItem('token');
            // Reload the page to reset the app state and redirect to login
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;