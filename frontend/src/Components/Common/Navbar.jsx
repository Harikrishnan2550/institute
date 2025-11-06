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




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios.js"; // ✅ centralized axios
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [partnerLogo, setPartnerLogo] = useState(null);
  const [partnerName, setPartnerName] = useState("");

  const isAdmin = location.pathname.includes("/admin");
  const isPartner = location.pathname.includes("/partner");

  useEffect(() => {
    const fetchPartnerLogo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (decoded.role !== "partner") return;

        const res = await axiosInstance.get(`/api/partners/agent/${decoded.agentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setPartnerLogo(res.data.logo || null);
          setPartnerName(res.data.name || "Partner");
        }
      } catch (error) {
        console.error("❌ Error fetching partner logo:", error);
        toast.error("Failed to load partner info");
      }
    };

    if (isPartner) fetchPartnerLogo();
  }, [isPartner]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ dynamic base for image

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Left Section - Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Show logo only for partners */}
            {isPartner && (
              <div className="flex-shrink-0">
                <img
  src={
    partnerLogo
      ? partnerLogo.startsWith("http")
        ? partnerLogo
        : `${BASE_URL}${partnerLogo.startsWith("/") ? partnerLogo : "/" + partnerLogo}`
      : "/logos/default-partner.png"
  }
  alt="Partner Logo"
  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-lg bg-white"
/>

              </div>
            )}

            {/* Admin Badge (replaces logo) */}
            {isAdmin && (
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-lg sm:text-xl font-bold">A</span>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold truncate">
                {isAdmin ? "Admin Dashboard" : `${partnerName}'s Dashboard`}
              </h1>
              <p className="text-xs text-gray-300 hidden sm:block">
                {isAdmin ? "Manage everything" : "Welcome back"}
              </p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {isPartner && (
              <button
                onClick={() => navigate("/partner/account")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span className="hidden sm:inline">Account</span>
                <span className="sm:hidden">👤</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 bg-white bg-opacity-10 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  isAdmin ? "bg-red-400" : "bg-green-400"
                } animate-pulse`}
              ></div>
              <span className="text-xs sm:text-sm font-medium">
                {isAdmin ? "Admin" : "Partner"}
              </span>
            </div>

            {/* Mobile Role Badge */}
            <div className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-10 backdrop-blur-sm">
              <span className="text-xs font-bold">{isAdmin ? "A" : "P"}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
