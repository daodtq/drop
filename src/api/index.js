import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env?.REACT_APP_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error)
);

const GET = (path, params) => axiosInstance.get(path, { params });
const POST = (path, params) => axiosInstance.post(path, params);
const PUT = (path, params) => axiosInstance.put(path, { ...params });
const DELETE = (path, params) => axiosInstance.delete(path, { params });

export { GET, POST, PUT, DELETE };
