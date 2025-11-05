import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar - fixed position */}
      <Sidebar />

      {/* Navbar - fixed at top */}
      <div className="fixed top-0 left-0 md:left-64 lg:left-72 right-0 z-50">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-64 lg:ml-72 transition-all duration-300">
        <main className="p-4 sm:p-6 lg:p-8 mt-[60px] sm:mt-[64px] overflow-x-auto">
          <div className="min-w-max">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;