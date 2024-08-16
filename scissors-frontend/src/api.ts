import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
// import { ACCESS_TOKEN } from './constants';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const back: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API as string,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true
});

back.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const auth: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL as string,
    headers: { 'Content-Type': 'application/json' },
});

auth.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default api;