// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginSignup = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     const endpoint = isLogin
//       ? "http://localhost:4000/api/user/login"
//       : "http://localhost:4000/api/user/register";

//     const { name, email, password } = formData;
//     const payload = isLogin ? { email, password } : { name, email, password };

//     try {
//       const response = await axios.post(endpoint, payload);

//       // ✅ Extract user info safely
//       const token = response.data.token;
//       const role = response.data.user?.role || response.data.role;
//       const agentId = response.data.user?.agentId;

//       if (!token) {
//         throw new Error("Token not received from server");
//       }

//       // ✅ Store login data in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // ✅ For partners only, store their agentId
//       if (role === "partner" && agentId) {
//         localStorage.setItem("agentId", agentId);
//       }

//       // ✅ Redirect based on role
//       if (role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/partner/dashboard");
//       }
//     } catch (err) {
//       console.error("Login/Signup Error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
//       <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all">
//         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-tight">
//           {isLogin ? "Welcome Back 👋" : "Create an Account"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {!isLogin && (
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//                 placeholder="Enter your name"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//               placeholder="Enter your password"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 font-semibold rounded-lg text-white transition-all ${
//               isLoading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {isLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <div className="text-center mt-6 text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={toggleForm}
//             className="text-indigo-600 font-medium ml-2 hover:underline"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;

// src/Components/LoginSignup.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { UserPlus, LogIn, Loader2, Mail, Lock, User } from "lucide-react";

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect signup mode from URL (/?signup=true)
  const queryParams = new URLSearchParams(location.search);
  const isSignupParam = queryParams.get("signup") === "true";

  const [isLogin, setIsLogin] = useState(!isSignupParam);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Auto switch based on URL query (keeps sync when toggling back)
  useEffect(() => {
    setIsLogin(!isSignupParam);
  }, [isSignupParam]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Toggle between Login / Signup manually
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    if (isLogin) {
      navigate("/?signup=true");
    } else {
      navigate("/");
    }
  };

  // ✅ Submit Login / Signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/user/login" : "/user/register";
    const { name, email, password } = formData;
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axiosInstance.post(endpoint, payload);

      // 🔎 Debug: print full response payload
      console.log("🧠 FULL LOGIN/SIGNUP RESPONSE:", response);
      console.log("🧠 response.data:", response.data);

      // Robust token extraction (covers various backend response shapes)
      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.user?.token ||
        response.data?.data?.user?.token ||
        response.data?.tokenString; // extra fallback if named differently

      // If JWT included inside user object (common)
      const userFromResponse =
        response.data?.user ||
        response.data?.data?.user ||
        response.data?.data ||
        response.data;

      const role =
        response.data?.user?.role ||
        response.data?.role ||
        userFromResponse?.role;
      const agentId = userFromResponse?.agentId || response.data?.agentId;

      console.log("🧩 Extracted token:", token);
      console.log("🧩 Extracted role:", role, "agentId:", agentId);

      if (!token) {
        // Show backend message if exists
        const backendMessage =
          response.data?.message ||
          response.data?.data?.message ||
          (typeof response.data === "string" ? response.data : null) ||
          "No token received from backend";
        setError(backendMessage);
        toast.error(backendMessage);
        setIsLoading(false);
        return;
      }

      // Save token + role + agentId
      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      if (role === "partner" && agentId)
        localStorage.setItem("agentId", agentId);

      toast.success(isLogin ? "Logged in successfully!" : "Account created!");
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/partner/dashboard");
      }
    } catch (err) {
      console.error("Login/Signup Error (network/axios):", err);

      let serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err?.message ||
        "Login failed";

      // REMOVE ALL HTML TAGS (important fix)
      serverMessage = String(serverMessage)
        .replace(/<[^>]*>/g, "")
        .slice(0, 200);

      setError(serverMessage);
      toast.error(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Glass Form Card */}
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 w-full max-w-md transition-all duration-500 hover:shadow-emerald-500/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
            {isLogin ? (
              <LogIn className="w-8 h-8 text-white" />
            ) : (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="text-white/60 mt-2 text-sm">
            {isLogin ? "Log in to your account" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <FloatingInput
              icon={<User className="w-5 h-5" />}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          )}

          <FloatingInput
            icon={<Mail className="w-5 h-5" />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          <FloatingInput
            icon={<Lock className="w-5 h-5" />}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center backdrop-blur-sm">
              {String(error)}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? (
                    <LogIn className="w-5 h-5" />
                  ) : (
                    <UserPlus className="w-5 h-5" />
                  )}
                  <span>{isLogin ? "Login" : "Sign Up"}</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          </button>
        </form>

        {/* Toggle Link */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors relative"
            >
              {isLogin ? "Sign Up" : "Login"}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ Floating Label Input Component
const FloatingInput = ({
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all peer"
        placeholder=" "
      />
      <label
        className={`absolute left-12 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none transition-all duration-300 ${
          hasValue || focused
            ? "text-xs -top-2 left-10 bg-gradient-to-br from-emerald-950 to-slate-950 px-2 rounded-full"
            : "text-base"
        } peer-focus:text-xs peer-focus:-top-2 peer-focus:left-10 peer-focus:bg-gradient-to-br peer-focus:from-emerald-950 peer-focus:to-slate-950 peer-focus:px-2 peer-focus:rounded-full peer-focus:text-emerald-400`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default LoginSignup;
