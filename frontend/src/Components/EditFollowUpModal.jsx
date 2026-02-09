import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { X, Save, Calendar, MessageSquare, TrendingUp, Flame, Thermometer, Snowflake } from "lucide-react";

const defaultStatuses = [
  "Call Later",
  "Whatsapp Follow Up",
  "New Lead",
  "Contacted",
  "Phone Not Taken",
  "Interested",
  "Not Interested",
  "Registered",
  "Do Not Call Again",
];

export default function EditFollowUpModal({ client, onClose, onUpdated }) {
  const [status, setStatus] = useState(client.adminStatus || "New Lead");
  const [customStatus, setCustomStatus] = useState("");
  const [leadQuality, setLeadQuality] = useState(client.leadQuality || "Cold");
  const [remarks, setRemarks] = useState(client.adminRemarks || "");
  const [remarks2, setRemarks2] = useState(client.adminRemarks2 || "");
  const [date, setDate] = useState(client.followUpDate?.slice(0, 10) || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalStatus = customStatus.trim() ? customStatus : status;

  const update = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.put(`/carrer-form/${client._id}`, {
        adminStatus: finalStatus,
        leadQuality,
        adminRemarks: remarks,
        adminRemarks2: remarks2,
        followUpDate: date,
      });

      toast.success("Follow-up updated successfully!");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLeadQualityIcon = () => {
    switch (leadQuality) {
      case "Hot":
        return <Flame className="w-5 h-5 text-red-400" />;
      case "Warm":
        return <Thermometer className="w-5 h-5 text-orange-400" />;
      case "Cold":
        return <Snowflake className="w-5 h-5 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-5 right-5 text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg pr-12">
                Edit Follow Up
              </h2>
              <p className="text-emerald-100 text-sm mt-1 font-medium">
                Update client status and schedule follow-ups
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Client Info Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-white/60 font-medium mb-1">Client</p>
              <p className="text-lg font-bold text-white">{client.name}</p>
              {client.email && (
                <p className="text-xs text-emerald-300 font-medium">{client.email}</p>
              )}
            </div>

            {/* Lead Stage */}
            <div>
              <label className="flex items-center gap-2 text-emerald-300 text-sm font-bold mb-3">
                <TrendingUp className="w-4 h-4" />
                Lead Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                {defaultStatuses.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">
                    {s}
                  </option>
                ))}
              </select>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Or enter a custom status..."
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium"
                />
                {customStatus.trim() && (
                  <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center gap-1">
                    <span>✓</span> Custom status will be used: "{customStatus}"
                  </p>
                )}
              </div>
            </div>

            {/* Lead Quality */}
            <div>
              <label className="flex items-center gap-2 text-emerald-300 text-sm font-bold mb-3">
                {getLeadQualityIcon()}
                Lead Quality
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setLeadQuality("Hot")}
                  className={`group relative px-4 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    leadQuality === "Hot"
                      ? "bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-lg shadow-red-600/40 scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border-2 border-white/10 hover:border-red-500/30"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Flame className={`w-6 h-6 ${leadQuality === "Hot" ? "text-white" : "text-red-400"}`} />
                    <span>Hot Lead</span>
                  </div>
                </button>

                <button
                  onClick={() => setLeadQuality("Warm")}
                  className={`group relative px-4 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    leadQuality === "Warm"
                      ? "bg-gradient-to-br from-orange-600 to-yellow-600 text-white shadow-lg shadow-orange-600/40 scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border-2 border-white/10 hover:border-orange-500/30"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Thermometer className={`w-6 h-6 ${leadQuality === "Warm" ? "text-white" : "text-orange-400"}`} />
                    <span>Warm Lead</span>
                  </div>
                </button>

                <button
                  onClick={() => setLeadQuality("Cold")}
                  className={`group relative px-4 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    leadQuality === "Cold"
                      ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/40 scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border-2 border-white/10 hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Snowflake className={`w-6 h-6 ${leadQuality === "Cold" ? "text-white" : "text-blue-400"}`} />
                    <span>Cold Lead</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-emerald-300 text-sm font-bold mb-3">
                  <MessageSquare className="w-4 h-4" />
                  Remarks 1
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter first set of remarks..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium resize-none"
                ></textarea>
              </div>

              <div>
                <label className="flex items-center gap-2 text-emerald-300 text-sm font-bold mb-3">
                  <MessageSquare className="w-4 h-4" />
                  Remarks 2
                </label>
                <textarea
                  value={remarks2}
                  onChange={(e) => setRemarks2(e.target.value)}
                  placeholder="Enter additional remarks..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium resize-none"
                ></textarea>
              </div>
            </div>

            {/* Follow Up Date */}
            <div>
              <label className="flex items-center gap-2 text-emerald-300 text-sm font-bold mb-3">
                <Calendar className="w-4 h-4" />
                Next Follow Up Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all duration-300 font-medium"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 p-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 border-2 border-red-500/30 hover:border-red-500 text-red-400 hover:text-white font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Cancel
            </button>
            <button
              onClick={update}
              disabled={isSubmitting}
              className="group relative px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-bold shadow-xl shadow-emerald-600/40 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </span>
              {!isSubmitting && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </div>
  );
}