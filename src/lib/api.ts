import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.response.use((response) => {
  if (response.data && response.data.error === true) {
    return Promise.reject({
      response: response,
      message: response.data.message || "Custom Error",
    });
  }
  return response;
});
