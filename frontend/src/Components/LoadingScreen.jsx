// src/Components/LoadingScreen.jsx
import React from "react";

export const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center p-4">
    <div className="text-center">
      {/* Dual-ring spinner */}
      <div className="relative inline-block">
        <div className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-green-500/30 border-b-green-500 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        ></div>
      </div>

      {/* Message */}
      <p className="mt-6 text-white/80 font-semibold text-lg tracking-wide">{message}</p>

      {/* Pulsing dots */}
      <div className="mt-2 flex items-center justify-center gap-1">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  </div>
);