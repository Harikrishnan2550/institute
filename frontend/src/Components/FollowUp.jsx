import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import EditFollowUpModal from "./EditFollowUpModal";

const tabs = ["Today", "Upcoming", "Pending", "Do Not Follow Up"];

export default function FollowUp() {
  const [activeTab, setActiveTab] = useState("Today");
  const [followUps, setFollowUps] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiMap = {
    Today: "/carrer-form/follow-up/today",
    Upcoming: "/carrer-form/follow-up/upcoming",
    Pending: "/carrer-form/follow-up/pending",
    "Do Not Follow Up": "/carrer-form/follow-up/do-not-follow",
  };

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(apiMap[activeTab]);
      setFollowUps(res.data.data || []);
    } catch (err) {
      console.error("Error fetching follow ups:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [activeTab]);

  /* Group based on admin status — map Do Not Call Again → Do Not Follow Up */
  const grouped = followUps.reduce((acc, item) => {
    let key = item.adminStatus || "Not Assigned";
    if (key === "Do Not Call Again") key = "Do Not Follow Up";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 md:ml-64 lg:ml-0 transition-all duration-300 mt-6">
      {/* Header */}
      <div className="px-8 py-10 mb-8 rounded-2xl bg-gradient-to-r from-teal-900/40 to-emerald-900/40 backdrop-blur-sm border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
          Follow Up
        </h1>
        <p className="text-emerald-300/80 font-medium mt-2 text-lg">
          Track and manage client follow-up tasks
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
              activeTab === t
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/40 scale-105"
                : "bg-slate-800/50 text-emerald-300/70 hover:text-emerald-300 hover:bg-slate-800/80 border border-emerald-500/20"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="text-center mt-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/30 border-t-emerald-500"></div>
          <p className="text-emerald-300/70 mt-4 text-lg">Loading...</p>
        </div>
      ) : followUps.length === 0 ? (
        <div className="text-center mt-20 p-12 bg-slate-800/30 rounded-2xl border border-emerald-500/20">
          <p className="text-emerald-300/70 text-xl">No records found.</p>
        </div>
      ) : activeTab === "Do Not Follow Up" ? (
        /* -----------------------------------------------------------
           🔥 Full-width GRID layout ONLY for Do Not Follow Up
        ----------------------------------------------------------- */
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-emerald-400">Do Not Follow Up</h3>
            <span className="bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-500/40">
              {followUps.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {followUps.map((c, index) => (
              <div
                key={index}
                onClick={() => setSelectedClient(c)}
                className="p-5 bg-slate-800/70 rounded-xl hover:bg-slate-800/90 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <h4 className="font-bold text-emerald-100 text-lg mb-2">{c.name}</h4>
                <p className="text-emerald-300/80">{c.q7_preferredDomain || c.course}</p>
                <p className="text-emerald-300/70 mt-1">📱 {c.whatsappNumber}</p>
                <p className="text-emerald-400/70 mt-2">📅 {c.followUpDate?.slice(0, 10) || "—"}</p>

                {c.adminRemarks && (
                  <p className="text-gray-400 text-xs italic mt-3 border-t border-emerald-500/10 pt-2">
                    {c.adminRemarks}
                  </p>
                )}
                {c.adminRemarks2 && (
                  <p className="text-gray-400 text-xs italic mt-1">{c.adminRemarks2}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* -----------------------------------------------------------
           🔥 Default Kanban Layout for Today / Upcoming / Pending
        ----------------------------------------------------------- */
        <div className="flex gap-6 overflow-x-auto pb-6 mt-6">
          {Object.keys(grouped).map((status) => (
            <div
              key={status}
              className="min-w-[320px] max-w-[360px] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-emerald-500/30 shadow-xl shadow-emerald-500/10 p-5"
            >
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-400">{status}</h3>
                <span className="bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-500/40">
                  {grouped[status].length}
                </span>
              </div>

              <div className="space-y-4">
                {grouped[status].map((c, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedClient(c)}
                    className="p-4 bg-slate-800/60 rounded-xl hover:bg-slate-800/90 transition-all duration-300 cursor-pointer border border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02]"
                  >
                    <h4 className="font-bold text-emerald-100 text-lg mb-2">{c.name}</h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-emerald-300/80">{c.q7_preferredDomain || c.course}</p>
                      <p className="text-emerald-300/70 flex items-center gap-2">
                        <span className="text-emerald-500">📱</span> {c.whatsappNumber}
                      </p>
                      <p className="text-emerald-400/70 flex items-center gap-2 mt-2">
                        <span className="text-emerald-500">📅</span> {c.followUpDate?.slice(0, 10) || "—"}
                      </p>
                    </div>

                    {c.adminRemarks && (
                      <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-emerald-500/10 line-clamp-2 italic">
                        {c.adminRemarks}
                      </p>
                    )}
                    {c.adminRemarks2 && (
                      <p className="text-gray-400 text-xs italic mt-1 line-clamp-2">
                        {c.adminRemarks2}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedClient && (
        <EditFollowUpModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onUpdated={() => {
            setSelectedClient(null);
            fetchFollowUps();
          }}
        />
      )}
    </div>
  );
}
