import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Predefined Admin Email
  const ADMIN_EMAIL = "admin@institute.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const endpoint = isLogin
    ? "http://localhost:4000/api/user/login"
    : "http://localhost:4000/api/user/register";

  const { name, email, password } = formData;
  const payload = isLogin ? { email, password } : { name, email, password };

  try {
    const response = await axios.post(endpoint, payload);

    // ✅ Save token + role
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user?.role || response.data.role);

    // ✅ Redirect based on role
    const role = response.data.user?.role || response.data.role;
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/partner/dashboard");
    }
  } catch (err) {
    console.error("Login/Signup Error:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-tight">
          {isLogin ? "Welcome Back 👋" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition-all ${
              isLoading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleForm}
            className="text-indigo-600 font-medium ml-2 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
