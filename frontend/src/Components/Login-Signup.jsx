import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { UserPlus, LogIn, Loader2, Mail, Lock, User, KeyRound } from "lucide-react";

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSignupParam = queryParams.get("signup") === "true";

  const [isLogin, setIsLogin] = useState(!isSignupParam);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(!isSignupParam);
  }, [isSignupParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    if (isOtpStep) return; // ❗ Prevent navigating during OTP step
    setIsLogin(!isLogin);
    setError("");
    if (isLogin) navigate("/?signup=true");
    else navigate("/");
  };

  // 🔥 Submit Login / Signup / OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // OTP STEP FIRST
    if (isOtpStep) {
      try {
        const { email } = formData;
        const response = await axiosInstance.post("/user/verify-otp", { email, otp });

        const token = response.data?.token;
        const role = response.data?.role;

        if (!token) throw new Error("Token not found");

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        toast.success("Admin verified successfully 🎉");
        navigate("/admin/dashboard");
      } catch (err) {
        const msg = err?.response?.data?.message || "Invalid OTP";
        setError(msg);
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Normal Login / Signup
    const endpoint = isLogin ? "/user/login" : "/user/register";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const response = await axiosInstance.post(endpoint, payload);
      const role = response.data?.role || response.data?.user?.role;

      // 🔥 ADMIN — require OTP after password success
      if (role === "admin" && response.data?.otpSent) {
        toast.info("OTP sent to admin email 📩");
        setIsOtpStep(true);
        setIsLoading(false);
        return;
      }

      // Partner → normal login
      const token = response.data?.token;
      const agentId = response.data?.user?.agentId;

      if (!token) throw new Error("Token not found");

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      if (role === "partner" && agentId) localStorage.setItem("agentId", agentId);

      toast.success(isLogin ? "Logged in successfully!" : "Account created!");

      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/partner/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Login failed";

      setError(msg);
      toast.error(msg);
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

      {/* Card */}
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 w-full max-w-md transition-all duration-500 hover:shadow-emerald-500/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg mb-4">
            {isOtpStep ? (
              <KeyRound className="w-8 h-8 text-white" />
            ) : isLogin ? (
              <LogIn className="w-8 h-8 text-white" />
            ) : (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </div>

          <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {isOtpStep
              ? "Verify OTP"
              : isLogin
              ? "Welcome Back"
              : "Join Us"}
          </h2>
          <p className="text-white/60 mt-2 text-sm">
            {isOtpStep
              ? "Enter the 6-digit OTP sent to admin email"
              : isLogin
              ? "Log in to your account"
              : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && !isOtpStep && (
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

          {!isOtpStep && (
            <>
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
            </>
          )}

          {isOtpStep && (
            <FloatingInput
              icon={<KeyRound className="w-5 h-5" />}
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          )}

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
                  {isOtpStep ? (
                    <KeyRound className="w-5 h-5" />
                  ) : isLogin ? (
                    <LogIn className="w-5 h-5" />
                  ) : (
                    <UserPlus className="w-5 h-5" />
                  )}
                  <span>
                    {isOtpStep
                      ? "Verify OTP"
                      : isLogin
                      ? "Login"
                      : "Sign Up"}
                  </span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Toggle Signup/Login */}
        {!isOtpStep && (
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="ml-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Input Component
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
