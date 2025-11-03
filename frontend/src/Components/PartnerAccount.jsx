import React, { useState } from "react";
import Navbar from "./Common/Navbar";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PartnerAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    location: "Chennai",
    accountNumber: "1234567890",
    accountHolderName: "John Doe",
    ifscCode: "HDFC0001234",
    branch: "Chennai Main",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <button
          onClick={() => navigate("/partner/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          My Account
        </h1>

        {/* Personal Details */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Personal Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["name", "email", "mobile", "location"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </div>
        </section>

        {/* Bank Details */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Bank Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["accountNumber", "accountHolderName", "ifscCode", "branch"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              )
            )}
          </div>
        </section>

        {/* Password Change */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Change Password
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Current Password"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
            />
          </div>
        </section>

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
          Save Changes
        </button>
      </div>
    </div>
  );
}
