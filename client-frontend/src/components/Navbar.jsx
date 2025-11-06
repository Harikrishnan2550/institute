import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios"; // ✅ use centralized axios instance

function Navbar() {
  const [partnerLogo, setPartnerLogo] = useState(null);
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    // ✅ Extract agentId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get("agentId") || urlParams.get("studentid");

    if (!agentId) return;

    const fetchLogo = async () => {
      try {
        // ✅ Use axiosInstance with relative path
        const res = await axiosInstance.get(`/api/partners/public/logo/${agentId}`);
        console.log("🧠 Partner logo fetched:", res.data);

        setPartnerLogo(res.data.logo);
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
            />
          </div>

          {/* ✅ Partner info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
              Partnered with
            </p>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
              {partnerName || "BSOFT"}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
