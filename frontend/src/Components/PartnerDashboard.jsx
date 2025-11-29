import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import {
  BadgeCheck,
  IndianRupee,
  WalletCards,
  Clock,
  CircleCheck,
  Zap,
  Link2,
  Copy,
  Settings,
  Lightbulb,
} from "lucide-react";

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [partnerLink, setPartnerLink] = useState("");
  // 1. New state for the name
  const [partnerName, setPartnerName] = useState(""); 

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Try to get agentId from local storage, or decode it if missing (like in Navbar)
        let agentId = localStorage.getItem("agentId");

        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        // Decode token to get agentId if not in localStorage
        if (!agentId) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                agentId = decoded.agentId;
            } catch (e) {
                console.error("Error decoding token", e);
            }
        }

        if (agentId) {
          setPartnerLink(`https://student.bsofteducation.in/?agentId=${agentId}`);
          
          // 2. Fetch Partner Profile to get Name (Same logic as Navbar)
          try {
            const profileRes = await axiosInstance.get(`/partners/agent/${agentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (profileRes.data && profileRes.data.name) {
                setPartnerName(profileRes.data.name);
            }
          } catch (error) {
            console.error("Error fetching partner name:", error);
          }
        }

        // Fetch Wallet Data
        const res = await axiosInstance.get("/wallet/my-wallet", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWallet(res.data.wallet || res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/";
        } else {
          toast.error("Failed to fetch dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPending =
    wallet?.withdrawals
      ?.filter((w) => w.status === "pending")
      .reduce((sum, w) => sum + w.amount, 0) || 0;

  const copyLink = () => {
    if (partnerLink) {
      navigator.clipboard.writeText(partnerLink);
      toast.success("Link copied to clipboard!");
    }
  };

  // Loading Screen (Premium Dual-Ring + Dots)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
            ></div>
          </div>
          <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">Loading dashboard...</p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header - PREMIUM WELCOME ICON */}
      <div className="relative mb-10 sm:mb-14">
        <div className="flex items-center gap-2 mb-4">
          {/* Premium Verified Badge */}
          <div className="group relative w-9 h-9 rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 flex items-center justify-center shadow-2xl shadow-emerald-600/50 transition-all duration-500 hover:shadow-emerald-500/70 hover:scale-110">
            <BadgeCheck className="w-11 h-11 text-white drop-shadow-lg" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          <div>
            {/* 3. UPDATED TEXT SIZE AND ADDED DYNAMIC NAME */}
            <h1 className="mt-8 text-xl sm:text-xl lg:text-3xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent leading-snug">
              Welcome Back, {partnerName || "Partner"}
            </h1>
            <p className="text-emerald-300/80 mt-2 text-sm sm:text-base font-medium">
              Your financial command center awaits
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Summary Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-14">
        <SummaryCard
          title="Total Revenue"
          value={wallet?.totalRevenue || 0}
          icon={<IndianRupee className="w-8 h-8" />}
          gradient="from-emerald-500 via-green-500 to-teal-500"
          accentColor="emerald"
        />
        <SummaryCard
          title="Available Balance"
          value={wallet?.availableBalance || 0}
          icon={<WalletCards className="w-8 h-8" />}
          gradient="from-green-500 via-emerald-500 to-green-600"
          accentColor="green"
        />
        <SummaryCard
          title="Pending Withdrawal"
          value={totalPending}
          icon={<Clock className="w-8 h-8" />}
          gradient="from-amber-500 via-orange-500 to-yellow-500"
          accentColor="amber"
        />
        <SummaryCard
          title="Total Withdrawn"
          value={wallet?.totalWithdrawn || 0}
          icon={<CircleCheck className="w-8 h-8" />}
          gradient="from-teal-500 via-emerald-500 to-green-500"
          accentColor="teal"
        />
      </div>

      {/* Quick Actions */}
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-3xl"></div>
        
        <h2 className="relative text-2xl sm:text-3xl font-bold text-white flex items-center gap-3 mb-8">
          <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <Zap className="w-7 h-7 text-white" />
          </span>
          Quick Actions
        </h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => navigate("/partner/wallet")}
            className="group relative px-8 py-5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-600/40 hover:shadow-2xl hover:shadow-emerald-500/60 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <WalletCards className="w-6 h-6" />
              <span>View Wallet</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => navigate("/partner/account")}
            className="group relative px-8 py-5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-slate-900/60 hover:shadow-2xl hover:shadow-slate-800/80 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Settings className="w-6 h-6" />
              <span>Account Settings</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Referral Link */}
        {partnerLink && (
          <div className="relative mt-10 border-t border-white/10 pt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                <Link2 className="w-6 h-6 text-white" />
              </span>
              Your Client Form Link
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:flex-1 group">
                <input
                  type="text"
                  value={partnerLink}
                  readOnly
                  className="w-full px-5 py-4 border-2 border-white/20 rounded-2xl text-white bg-white/5 backdrop-blur-sm font-mono text-sm focus:outline-none focus:border-emerald-500 focus:bg-white/10 transition-all shadow-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-green-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <button
                onClick={copyLink}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-600/50 hover:shadow-2xl hover:shadow-green-500/60 overflow-hidden whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Copy className="w-5 h-5" />
                  <span>Copy Link</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </button>
            </div>
            <p className="text-emerald-300/80 text-sm sm:text-base mt-4 flex items-start gap-2 bg-white/5 rounded-xl p-4 border border-white/10">
              <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>Share this link with clients. All submissions will be automatically linked to your agent ID for commission tracking.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Premium Summary Card
const SummaryCard = ({ title, value, icon, gradient, accentColor }) => {
  const shadowColors = {
    emerald: 'shadow-emerald-500/30 hover:shadow-emerald-500/50',
    green: 'shadow-green-500/30 hover:shadow-green-500/50',
    amber: 'shadow-amber-500/30 hover:shadow-amber-500/50',
    teal: 'shadow-teal-500/30 hover:shadow-teal-500/50'
  };

  return (
    <div className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:bg-white/10 shadow-2xl ${shadowColors[accentColor]}`}>
      <div className="relative z-10 p-6 sm:p-7">
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}
          >
            {icon}
          </div>
          <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-emerald-300/70 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
          {title}
        </h3>
        <p className="text-4xl sm:text-5xl font-black text-white mb-2 transition-all duration-300 group-hover:scale-105">
          ₹{value?.toLocaleString() || 0}
        </p>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div
        className={`absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br ${gradient} opacity-10 rounded-tl-full transform transition-all duration-700 group-hover:scale-150 group-hover:opacity-20`}
      ></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};