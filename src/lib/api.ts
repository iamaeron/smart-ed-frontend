import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

// 1. Request Interceptor: Inject Bearer token into headers automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Response Interceptor: Catch your custom $this->error format
api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error === true) {
      return Promise.reject({
        response: response,
        message: response.data.message || "Custom Error",
      });
    }
    return response;
  },
  (error) => {
    // If the backend returns a real 401, clear storage (token expired/invalid)
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  },
);
