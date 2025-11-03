// src/Components/PartnerDashboard.jsx
import React from "react";
import Navbar from "./Common/Navbar";
import { useNavigate } from "react-router-dom";

export default function PartnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Welcome, Partner!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example dashboard stats */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">24</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Pending Orders</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-3xl font-bold mt-2">₹12,540</p>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={() => navigate("/partner/account")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Account
          </button>
        </div>
      </div>
    </div>
  );
}
