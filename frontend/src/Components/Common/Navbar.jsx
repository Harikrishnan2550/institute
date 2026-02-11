// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [partnerLogo, setPartnerLogo] = useState(null);
//   const [partnerName, setPartnerName] = useState("");

//   const isAdmin = location.pathname.includes("/admin");
//   const isPartner = location.pathname.includes("/partner");

//   useEffect(() => {
//     const fetchPartnerLogo = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const decoded = JSON.parse(atob(token.split(".")[1]));
//         if (decoded.role !== "partner") return;

//         const res = await axios.get(
//           `http://localhost:4000/api/partners/agent/${decoded.agentId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res.data) {
//           setPartnerLogo(res.data.logo || null);
//           setPartnerName(res.data.name || "Partner");
//         }
//       } catch (error) {
//         console.error("❌ Error fetching partner logo:", error);
//       }
//     };

//     if (isPartner) fetchPartnerLogo();
//   }, [isPartner]);

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-xl sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-3 sm:py-4">
//           {/* Left Section - Logo & Title */}
//           <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//             {/* Show logo only for partners */}
//             {isPartner && (
//               <div className="flex-shrink-0">
//                 <img
//                   src={
//                     partnerLogo
//                       ? `http://localhost:4000${partnerLogo}`
//                       : "/logos/default-partner.png"
//                   }
//                   alt="Partner Logo"
//                   className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-lg bg-white"
//                 />
//               </div>
//             )}

//             {/* Admin Badge (replaces logo) */}
//             {isAdmin && (
//               <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg border-2 border-white">
//                 <span className="text-lg sm:text-xl font-bold">A</span>
//               </div>
//             )}

//             <div className="min-w-0 flex-1">
//               <h1 className="text-sm sm:text-lg lg:text-xl font-bold truncate">
//                 {isAdmin ? "Admin Dashboard" : `${partnerName}'s Dashboard`}
//               </h1>
//               <p className="text-xs text-gray-300 hidden sm:block">
//                 {isAdmin ? "Manage everything" : "Welcome back"}
//               </p>
//             </div>
//           </div>

//           {/* Right Section - Actions */}
//           <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
//             {isPartner && (
//               <button
//                 onClick={() => navigate("/partner/account")}
//                 className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
//               >
//                 <span className="hidden sm:inline">Account</span>
//                 <span className="sm:hidden">👤</span>
//               </button>
//             )}

//             <div className="hidden sm:flex items-center gap-2 bg-white bg-opacity-10 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm">
//               <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
//               <span className="text-xs sm:text-sm font-medium">
//                 {isAdmin ? "Admin" : "Partner"}
//               </span>
//             </div>

//             {/* Mobile Role Badge */}
//             <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
//               <span className="text-xs font-bold">
//                 {isAdmin ? "A" : "P"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios.js";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react"; // ✅ Import LogOut icon

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [partnerLogo, setPartnerLogo] = useState(null);
  const [partnerName, setPartnerName] = useState("");

  const isAdmin = location.pathname.includes("/admin");
  const isPartner = location.pathname.includes("/partner");

  // ✅ Logout Logic
  const handleLogout = () => {
    // 1. Clear all stored data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("agentId");
    localStorage.clear();

    // 2. Show notification
    toast.success("Logged out successfully");

    // 3. Redirect to Login Page
    navigate("/");
  };

  useEffect(() => {
    const fetchPartnerLogo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.role !== "partner") return;

        // 🔹 1. Get partner name from main API
        const partnerRes = await axiosInstance.get(
          `/partners/agent/${decoded.agentId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (partnerRes.data?.name) {
          setPartnerName(partnerRes.data.name);
        }

        // 🔹 2. Get logo from PUBLIC logo endpoint (same as PartnerAccount)
        const logoRes = await axiosInstance.get(
          `/partners/public/logo/${decoded.agentId}`,
        );

        if (logoRes.data?.logo) {
          const cleanPath = logoRes.data.logo.replace(/\\/g, "/");
          setPartnerLogo(cleanPath);
        }
      } catch (error) {
        console.error("Error fetching partner info:", error);
      }
    };

    if (isPartner) fetchPartnerLogo();
  }, [isPartner]);

  const RAW_BASE = import.meta.env.VITE_API_BASE_URL || "";
  const BASE_URL = RAW_BASE.replace("/api", "").replace(/\/$/, "");

  console.log("API_BASE:", import.meta.env.VITE_API_BASE_URL);
  console.log("Partner Logo from DB:", partnerLogo);

  return (
    <nav className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-emerald-500/20">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* ---------- LEFT SECTION: Logo / Admin Badge + Title ---------- */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Partner Logo */}
            {isPartner && (
              <div className="relative group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <img
                  src={
                    partnerLogo
                      ? partnerLogo.startsWith("http")
                        ? partnerLogo
                        : `${window.location.origin}${partnerLogo.startsWith("/") ? "" : "/"}${partnerLogo}`
                      : "/logos/default-partner.png"
                  }
                  alt="Partner Logo"
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-3 border-emerald-500 shadow-xl shadow-emerald-500/50 bg-white"
                />
              </div>
            )}

            {/* Admin Badge */}
            {isAdmin && (
              <div className="relative group flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shadow-xl shadow-red-500/50 border-2 border-red-400/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <span className="text-xl sm:text-2xl font-black">A</span>
                </div>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent truncate">
                {isAdmin ? "Admin Dashboard" : `${partnerName}'s Dashboard`}
              </h1>
              <p className="text-xs sm:text-sm text-emerald-300/70 font-medium hidden sm:block">
                {isAdmin
                  ? "Manage everything from here"
                  : "Welcome back, let's grow together"}
              </p>
            </div>
          </div>

          {/* ---------- RIGHT SECTION: Hamburger (mobile), Account, Role Badge ---------- */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* === HAMBURGER (mobile only, right side) === */}
            <button
              onClick={toggleSidebar}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Account Button (partner only) */}
            {isPartner && (
              <button
                onClick={() => navigate("/partner/account")}
                className="hidden sm:flex group relative bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-lg shadow-emerald-600/40 hover:shadow-xl hover:shadow-emerald-500/60 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Account</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            )}

            {/* ✅ LOGOUT BUTTON (Desktop) */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all duration-300 border border-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            {/* ✅ LOGOUT ICON (Mobile) */}
            <button
              onClick={handleLogout}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Desktop Role Badge */}
            <div className="hidden sm:flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 sm:px-5 py-2.5 rounded-xl border border-white/10 shadow-lg">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isAdmin ? "bg-red-400 shadow-lg shadow-red-400/50" : "bg-emerald-400 shadow-lg shadow-emerald-400/50"} animate-pulse`}
              ></div>
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                {isAdmin ? "Admin Mode" : "Partner Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;
