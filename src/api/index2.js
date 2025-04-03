import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jellyfish-app-us5lp.ondigitalocean.app",
  // baseURL: "http://localhost:1339",
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

const GET2 = (path, params) => axiosInstance.get(path, { params });
const POST2 = (path, params) => axiosInstance.post(path, params);
const PUT2 = (path, params) => axiosInstance.put(path, { ...params });
const DELETE2 = (path, params) => axiosInstance.delete(path, { params });

export { GET2, POST2, PUT2, DELETE2 };
