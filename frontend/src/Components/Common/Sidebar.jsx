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
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-100 shadow-2xl transform transition-transform duration-300 z-40 w-72
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 lg:w-72`}
      >
        {/* Logo + Role */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700/50 bg-gray-800/30">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">
              {isAdmin ? "A" : "P"}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-green-600 bg-clip-text text-transparent">
              {isAdmin ? "Admin Panel" : "Partner Panel"}
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              {isAdmin ? "Full Access" : "Restricted Access"}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col mt-8 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={`${baseRoute}/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden
                ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className={`text-xl transition-transform duration-200 ${
                location.pathname === `${baseRoute}/${item.path}` ? "" : "group-hover:scale-110"
              }`}>
                {item.icon}
              </span>
              <span className="tracking-wide">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full px-6">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
            <p className="text-xs text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} Winshine
            </p>
            <p className="text-xs text-gray-500 mt-1">All rights reserved</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;