import axios, { AxiosInstance } from "axios";

// 创建 Axios 实例
export const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    withCredentials: true
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如添加 token 到 headers
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        return response;
    },
    error => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);
