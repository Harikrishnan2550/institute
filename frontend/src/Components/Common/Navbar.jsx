import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.includes("/admin");
  const isPartner = location.pathname.includes("/partner");

  const partnerLogo = "/logos/partner1.png"; // change dynamically if needed

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <img
          src={
            isAdmin
              ? "/logos/admin-logo.png"
              : partnerLogo || "/logos/default-partner.png"
          }
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-lg font-semibold">
          {isAdmin ? "Admin Dashboard" : "Partner Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {isPartner && (
          <button
            onClick={() => navigate("/partner/account")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all"
          >
            Account
          </button>
        )}
        <span className="opacity-75 text-sm">{isAdmin ? "Admin" : "Partner"}</span>
      </div>
    </nav>
  );
};

export default Navbar;
