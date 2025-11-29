// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const axiosInstance = axios.create({
// //   baseURL: import.meta.env.VITE_API_BASE_URL,
// // });

// // // ✅ Automatically attach token
// // axiosInstance.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // // ✅ Auto logout on 401
// // axiosInstance.interceptors.response.use(
// //   (res) => res,
// //   (err) => {
// //     if (err.response?.status === 401) {
// //       toast.error("Session expired. Please log in again.");
// //       localStorage.clear();
// //       window.location.href = "/";
// //     }
// //     return Promise.reject(err);
// //   }
// // );

// // export default axiosInstance;


// import axios from "axios";
// import { toast } from "react-toastify";

// // ✅ FIXED: Point to the generic /api so we can access /dashboard, /partners, etc.
// const axiosInstance = axios.create({
//   baseURL: "/api", 
//   withCredentials: false,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

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




// import axios from "axios";
// import { toast } from "react-toastify";

// // 🔥 Auto-detect base URL (no need to change during deploy)
// const BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:4000/api"  // Local backend
//     : "https://bsofteducation.in/api"; // Live backend

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // 🔐 Attach token on every request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // 🚨 Auto logout on token expiry
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

// 🔥 Auto-detect base URL
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api" // 🏠 Local backend
    : "https://bsofteducation.in/api"; // 🌍 Live backend

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔐 Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🚨 Auto-logout when token expires
axiosInstance.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
