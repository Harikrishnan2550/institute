import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  Calendar,
  Save,
  CheckCircle2,
  MessageSquare,
  Clock,
} from "lucide-react";

const ClientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  const [form, setForm] = useState({
    adminStatus: client?.adminStatus || "",
    adminRemarks: client?.adminRemarks || "",
    adminRemarks2: client?.adminRemarks2 || "",
    followUpDate: client?.followUpDate ? client.followUpDate.split("T")[0] : "",
  });

  // 🔥 New: toggle for showing/hiding Client Responses section
  const [showResponses, setShowResponses] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        navigate("/login");
        return;
      }

      console.log("🟢 Data being sent to backend:", form);

      await axiosInstance.put(`/carrer-form/${client._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Client updated successfully");
      setTimeout(() => navigate("/admin/client-track"), 1000);
    } catch (err) {
      console.error("Error updating client:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        toast.error("Session expired or unauthorized access. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("❌ Failed to update client");
      }
    }
  };

  if (!client)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8 max-w-md"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center border border-red-400/30">
            <FileText className="w-10 h-10 text-red-400" />
          </div>
          <p className="text-white/80 text-lg font-medium">Client data missing.</p>
        </motion.div>
      </div>
    );

  const questions = [
    "Are you a Fresher or Experienced Professional?",
    "Do you have any previous experience in the IT field?",
    "What is your highest educational qualification?",
    "Year of passing:",
    "Are you more interested in:",
    "Do you have an idea about current job opportunities in the IT industry?",
    "Which area of IT do you find more appealing?",
    "What is your main career goal?",
    "How much time can you dedicate for training?",
    "Would you like to receive a personalized course & career guidance call?",
  ];

  const answers = [
    client.q1_experienceLevel,
    client.q2_previousITExperience,
    client.q3_education,
    client.q4_yearOfPassing,
    client.q5_interestArea,
    client.q6_jobAwareness,
    client.q7_preferredDomain,
    client.q8_careerGoal,
    client.q9_trainingTime,
    client.q10_guidanceCall,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative mb-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600/30 to-teal-600/30 backdrop-blur-2xl border border-emerald-400/30 rounded-3xl shadow-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
              <User className="w-6 h-6 text-emerald-300" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              {client.name}
            </h1>
          </div>
          <p className="text-emerald-300/80 mt-2 text-sm sm:text-base font-medium">
            Client Details & Management
          </p>
        </motion.div>
      </div>

      {/* Personal Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 mb-6 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-300" />
            Personal Details
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <p className="text-xs sm:text-sm text-blue-300 font-semibold">Email</p>
              </div>
              <p className="text-sm sm:text-base text-white font-medium break-all">
                {client.email}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-green-300" />
                <p className="text-xs sm:text-sm text-green-300 font-semibold">Mobile</p>
              </div>
              <p className="text-sm sm:text-base text-white font-medium">
                {client.whatsappNumber}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-4 border border-purple-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-purple-300" />
                <p className="text-xs sm:text-sm text-purple-300 font-semibold">City</p>
              </div>
              <p className="text-sm sm:text-base text-white font-medium">
                {client.city}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-4 border border-orange-400/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-orange-300" />
                <p className="text-xs sm:text-sm text-orange-300 font-semibold">State</p>
              </div>
              <p className="text-sm sm:text-base text-white font-medium">
                {client.state}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toggle button for Client Responses */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowResponses(!showResponses)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl shadow-md transition-all"
        >
          {showResponses ? "Hide Client Responses" : "View Client Responses"}
        </button>
      </div>

      {/* Client Responses (hidden until button click) */}
      {showResponses && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 mb-6 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm p-4 sm:p-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-300" />
              Client Responses
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:border-emerald-400/30 transition-all"
                >
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm sm:text-base mb-2">
                        {q}
                      </p>
                      <p className="text-emerald-200/80 text-sm sm:text-base bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        {answers[index] || "—"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Admin Update Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/10 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-600/30 to-teal-600/30 backdrop-blur-sm p-4 sm:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            Admin Update
          </h2>
          <p className="text-emerald-300/80 text-sm mt-1">
            Update client status and remarks
          </p>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* Status - now SELECT with fixed options */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Status
              </label>
              <select
                name="adminStatus"
                value={form.adminStatus}
                onChange={handleChange}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base text-white"
              >
                <option value="">Select status</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Call Later">Call Later</option>
                <option value="Whatsapp Follow Up">Whatsapp Follow Up</option>
                <option value="Phone Not Taken">Phone Not Taken</option>
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Registered">Registered</option>
                <option value="Do Not Call Again">Do Not Call Again</option>
              </select>
            </div>

            {/* Remarks 1 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                Remarks 1
              </label>
              <input
                type="text"
                name="adminRemarks"
                value={form.adminRemarks}
                onChange={handleChange}
                placeholder="Enter remarks"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base text-white placeholder-white/40"
              />
            </div>

            {/* Remarks 2 */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                Remarks 2
              </label>
              <input
                type="text"
                name="adminRemarks2"
                value={form.adminRemarks2}
                onChange={handleChange}
                placeholder="Enter additional remarks"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base text-white placeholder-white/40"
              />
            </div>

            {/* Follow-up Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-300" />
                Follow-up Date
              </label>
              <input
                type="date"
                name="followUpDate"
                value={form.followUpDate}
                onChange={handleChange}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 p-3 rounded-xl w-full transition-all outline-none text-sm sm:text-base text-white"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpdate}
            className="mt-6 w-full sm:w-auto sm:min-w-[200px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientDetails;
