import axios from "axios";
import { getTokenFromStorage } from "../../utils";

export const API_URL = "";
export const VERSION_URL = "v1";
export const USER_API_URL = `${API_URL}/${VERSION_URL}/user`;
export const ADMIN_API_URL = `${API_URL}/${VERSION_URL}/admin`;

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  currentPage: number;
  hasMore: boolean;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    // Add any other default headers here
  },
});

// Optionally add interceptors for requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config before sending
    const token = getTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      window.location.href = "auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
