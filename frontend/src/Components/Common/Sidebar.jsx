// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { FaUserFriends, FaWallet } from "react-icons/fa";
// import { AiOutlineBarChart } from "react-icons/ai";
// import { FiMenu, FiX } from "react-icons/fi";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const isAdmin = location.pathname.includes("/admin");
//   const isPartner = location.pathname.includes("/partner");

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // ✅ Sidebar menu items
//   const menuItems = [
//     { title: "Dashboard", icon: <MdDashboard />, path: "dashboard" },
//     { title: "Client Track", icon: <FaUserFriends />, path: "client-track" },
//     { title: "Client Status", icon: <AiOutlineBarChart />, path: "client-status" },
//     { title: "Wallet", icon: <FaWallet />, path: "wallet" },
//   ];

//   // ✅ Dynamic base route
//   const baseRoute = isAdmin ? "/admin" : "/partner";

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <button
//         className="md:hidden fixed top-5 left-5 z-50 bg-gradient-to-br from-emerald-600 to-green-600 text-white p-3 rounded-xl shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-110 hover:rotate-6"
//         onClick={toggleSidebar}
//         aria-label="Toggle sidebar"
//       >
//         {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar container */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 shadow-2xl transform transition-all duration-300 z-40 w-72 border-r border-emerald-500/10
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 lg:w-72`}
//       >
//         {/* Animated background glow */}
//         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

//         {/* Logo + Role */}
//         <div className="relative flex items-center gap-4 px-6 py-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-green-500/5">
//           <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-pulse">
//             <span className="text-2xl font-black text-white">
//               {isAdmin ? "A" : "P"}
//             </span>
//             <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
//           </div>
//           <div>
//             <h2 className="text-xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
//               {isAdmin ? "Admin Panel" : "Partner Panel"}
//             </h2>
//             <p className="text-xs text-emerald-300/60 font-semibold tracking-wide mt-0.5">
//               {isAdmin ? "Full Access Control" : "Revenue Dashboard"}
//             </p>
//           </div>
//         </div>

//         {/* Navigation links */}
//         <nav className="relative flex flex-col mt-8 px-4 space-y-3">
//           {menuItems.map((item, index) => (
//             <NavLink
//               key={item.title}
//               to={`${baseRoute}/${item.path}`}
//               className={({ isActive }) =>
//                 `group relative flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-2xl transition-all duration-300 overflow-hidden
//                 ${
//                   isActive
//                     ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl shadow-emerald-500/40 scale-105"
//                     : "text-gray-300 hover:bg-white/5 hover:text-white hover:scale-105 hover:shadow-lg"
//                 }`
//               }
//               onClick={() => setIsOpen(false)}
//               style={{ animationDelay: `${index * 50}ms` }}
//             >
//               {/* Active indicator glow */}
//               {location.pathname === `${baseRoute}/${item.path}` && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-teal-400/20 animate-pulse"></div>
//               )}
              
//               {/* Icon */}
//               <span className={`relative z-10 text-2xl transition-all duration-300 ${
//                 location.pathname === `${baseRoute}/${item.path}` 
//                   ? "scale-110 drop-shadow-lg" 
//                   : "group-hover:scale-125 group-hover:rotate-12"
//               }`}>
//                 {item.icon}
//               </span>
              
//               {/* Label */}
//               <span className="relative z-10 tracking-wide">{item.title}</span>
              
//               {/* Hover shine effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              
//               {/* Active bar */}
//               {location.pathname === `${baseRoute}/${item.path}` && (
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 via-green-400 to-teal-400 rounded-l-full shadow-lg shadow-emerald-500/50"></div>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Stats Card (Optional Enhancement) */}
//         <div className="relative mx-4 mt-8 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 backdrop-blur-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//             <span className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider">System Status</span>
//           </div>
//           <p className="text-sm font-semibold text-white">All Systems Operational</p>
//           <div className="mt-3 flex items-center gap-2">
//             <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
//               <div className="h-full w-[100%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
//             </div>
//             <span className="text-xs font-bold text-emerald-400">100%</span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-6 left-0 w-full px-6">
//           <div className="relative bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-2xl p-4 border border-emerald-500/20 backdrop-blur-sm overflow-hidden">
//             <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
//             <p className="relative text-xs text-emerald-300/80 font-bold tracking-wide">
//               &copy; {new Date().getFullYear()} Winshine
//             </p>
//             <p className="relative text-xs text-emerald-400/60 mt-1 font-medium">All rights reserved</p>
//             <div className="relative mt-3 flex items-center gap-2">
//               <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
//               <span className="text-xs text-emerald-300/70 font-semibold">v2.0.1</span>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;




import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// Icons
import { MdDashboard } from "react-icons/md";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.includes("/admin");

  const toggleSidebar = () => setIsOpen(!isOpen);

  // 🔥 Sidebar menu items
  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, path: "dashboard" },
    { title: "Client Track", icon: <FaUserFriends />, path: "client-track" },
    { title: "Client Status", icon: <AiOutlineBarChart />, path: "client-status" },
    { title: "Wallet", icon: <FaWallet />, path: "wallet" },
    ...(isAdmin
      ? [
          {
            title: "Follow Up",
            icon: <RiCustomerService2Fill />,
            path: "follow-up",
          },
        ]
      : []),
  ];

  const baseRoute = isAdmin ? "/admin" : "/partner";

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-5 left-5 z-50 bg-gradient-to-br from-emerald-600 to-green-600 text-white p-3 rounded-xl shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-110 hover:rotate-6"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        // 🛠️ FIX APPLIED:
        // 1. 'flex flex-col': Organizes children vertically to prevent overlap.
        // 2. 'overflow-y-auto': Allows scrolling if screen is too small.
        // 3. '[&::-webkit-scrollbar]:hidden': Hides scrollbar on Chrome/Safari.
        // 4. '[-ms-overflow-style:none] [scrollbar-width:none]': Hides scrollbar on Firefox/IE.
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 shadow-2xl transform transition-all duration-300 z-40 w-72 border-r border-emerald-500/10 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 lg:w-72`}
      >
        {/* Glow background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

        {/* Logo & Role (Stays at top) */}
        <div className="relative flex-none flex items-center gap-4 px-6 py-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-green-500/5">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-pulse">
            <span className="text-2xl font-black text-white">
              {isAdmin ? "A" : "P"}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              {isAdmin ? "Admin Panel" : "Partner Panel"}
            </h2>
            <p className="text-xs text-emerald-300/60 font-semibold tracking-wide mt-0.5">
              {isAdmin ? "Full Access Control" : "Revenue Dashboard"}
            </p>
          </div>
        </div>

        {/* Navigation links (Expands to fill empty space) */}
        <nav className="relative flex-1 flex flex-col mt-6 px-4 space-y-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.title}
              to={`${baseRoute}/${item.path}`}
              className={({ isActive }) =>
                `group relative flex-none flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-2xl transition-all duration-300 overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl shadow-emerald-500/40 scale-105"
                    : "text-gray-300 hover:bg-white/5 hover:text-white hover:scale-105 hover:shadow-lg"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className={`relative z-10 text-2xl transition-all duration-300 ${
                location.pathname === `${baseRoute}/${item.path}`
                  ? "scale-110 drop-shadow-lg"
                  : "group-hover:scale-125 group-hover:rotate-12"
              }`}>
                {item.icon}
              </span>
              <span className="relative z-10 tracking-wide">{item.title}</span>
              
              {/* Active bar */}
              {location.pathname === `${baseRoute}/${item.path}` && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 via-green-400 to-teal-400 rounded-l-full shadow-lg shadow-emerald-500/50"></div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section (Pushed to bottom naturally) */}
        <div className="flex-none mt-auto p-4 pb-6 space-y-4">
          
          {/* System status card */}
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-300/80 uppercase tracking-wider">
                SYSTEM STATUS
              </span>
            </div>
            <p className="text-sm font-semibold text-white">All Systems Operational</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-[100%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-bold text-emerald-400">100%</span>
            </div>
          </div>

          {/* Footer */}
          <div className="relative bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-2xl p-4 border border-emerald-500/20 backdrop-blur-sm overflow-hidden">
            <p className="relative text-xs text-emerald-300/80 font-bold tracking-wide">
              © {new Date().getFullYear()} BSOFT Education
            </p>
            <p className="relative text-xs text-emerald-400/60 mt-1 font-medium">
              All rights reserved
            </p>
            <div className="relative mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-emerald-300/70 font-semibold">v2.0.1 | Developed by Winshine infotech</span>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;