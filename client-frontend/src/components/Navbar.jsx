import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function Navbar() {
  const [partnerLogo, setPartnerLogo] = useState(null);
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get("agentId") || urlParams.get("studentid");

    if (!agentId) return;

    const fetchLogo = async () => {
      try {
        const res = await axiosInstance.get(`/api/partners/public/logo/${agentId}`);
        console.log("🧠 Partner logo fetched:", res.data);

        // ✅ Fix logo URL depending on environment
        let logoUrl = res.data.logo;
        if (window.location.origin.includes("localhost")) {
          logoUrl = logoUrl?.replace(
            "https://institute-65ci.onrender.com",
            "http://localhost:4000"
          );
        }

        setPartnerLogo(logoUrl);
        setPartnerName(res.data.name);
      } catch (err) {
        console.error("❌ Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* ✅ Partner logo */}
          <div className="flex-shrink-0">
            <img
              src={partnerLogo || "/logos/default-partner.png"}
              alt="Partner logo"
              className="h-12 w-24 sm:h-16 sm:w-28 object-cover rounded-lg border border-gray-200 shadow-sm"
              onError={(e) => (e.target.src = "/logos/default-partner.png")}
            />
          </div>

          {/* ✅ Partner info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
              Partnered with
            </p>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
              BSOFT
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axios";

// export default function Navbar() {
//   const [partnerLogo, setPartnerLogo] = useState(
//     localStorage.getItem("partnerLogo") || null
//   );
//   const [partnerName, setPartnerName] = useState(
//     localStorage.getItem("partnerName") || ""
//   );
//   const [isLoading, setIsLoading] = useState(!partnerLogo);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const agentId = urlParams.get("agentId") || urlParams.get("studentid");
//     console.log("🧠 Agent ID found in URL:", agentId);

//     if (!agentId || partnerLogo) {
//       // ✅ Skip fetching if already have cached logo
//       setIsLoading(false);
//       return;
//     }

//     const fetchLogo = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/api/partners/public/logo/${agentId}`
//         );

//         let logoUrl = res.data.logo;
//         const backendBase =
//           import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

//         // ✅ Adjust environment domain
//         if (window.location.origin.includes("localhost")) {
//           logoUrl = logoUrl?.replace(
//             "https://institute-65ci.onrender.com",
//             backendBase
//           );
//         }

//         console.log("🖼️ Final logo URL used:", logoUrl);

//         setPartnerLogo(logoUrl);
//         setPartnerName(res.data.name || "Partner");

//         // ✅ Cache for future reloads
//         localStorage.setItem("partnerLogo", logoUrl);
//         localStorage.setItem("partnerName", res.data.name || "Partner");
//       } catch (err) {
//         console.error("❌ Error fetching logo:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLogo();
//   }, []); // ✅ Empty deps → runs once only

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
//         <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
//           <div className="flex-shrink-0">
//             {isLoading ? (
//               <div className="w-24 h-12 sm:w-28 sm:h-16 bg-gray-100 animate-pulse rounded-lg"></div>
//             ) : (
//               <img
//                 src={partnerLogo || "/logos/default-partner.png"}
//                 alt="Partner logo"
//                 className="h-12 w-24 sm:h-16 sm:w-28 object-cover rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105"
//                 onError={(e) => (e.target.src = "/logos/default-partner.png")}
//               />
//             )}
//           </div>

//           <div className="flex flex-col justify-center">
//             <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
//               Partnered with
//             </p>
//             <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
//               {partnerName || "BSOFT"}
//             </h1>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


