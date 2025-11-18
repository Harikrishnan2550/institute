// import axios from "axios";
// import { toast } from "react-toastify";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// // ✅ Automatically attach token
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // ✅ Auto logout on 401
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       toast.error("Session expired. Please log in again.");
//       localStorage.clear();
//       window.location.href = "/";
//     }
//     return Promise.reject(err);
//   }
// );

// export default axiosInstance;



import axios from "axios";
import { toast } from "react-toastify";

// ✅ Automatically pick correct base URL (local or production)
console.log("🌍 Active API Base URL:", import.meta.env.VITE_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://bsofteducation.in/api",
  withCredentials: true, // helps for cookie/session-based auth if needed
});

// ✅ Automatically attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Auto logout on 401
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
