import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.includes("/admin");
  const isPartner = location.pathname.includes("/partner");

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ✅ Sidebar menu items
  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, path: "dashboard" },
    { title: "Client Track", icon: <FaUserFriends />, path: "client-track" },
    { title: "Client Status", icon: <AiOutlineBarChart />, path: "client-status" },
    { title: "Wallet", icon: <FaWallet />, path: "wallet" },
  ];

  // ✅ Dynamic base route
  const baseRoute = isAdmin ? "/admin" : "/partner";

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-200 shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64`}
      >
        {/* Logo + Role */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
          <img
            src={
              isAdmin
                ? "/logos/admin-logo.png"
                : "/logos/partner1.png" // can be dynamic from backend
            }
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {isAdmin ? "Admin Panel" : "Partner Panel"}
            </h2>
            <p className="text-xs text-gray-400">
              {isAdmin ? "Full Access" : "Restricted Access"}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col mt-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={`${baseRoute}/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 
                hover:bg-gray-800 hover:text-white ${
                  isActive ? "bg-gray-800 text-white border-l-4 border-indigo-500" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 w-full px-6 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} MyCompany</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
