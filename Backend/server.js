import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/Mongodb.js";

import CarrerFormRoutes from "./Routes/CarrerFormRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import dashboardRoutes from "./Routes/DashboardRoutes.js";
import partnerRoutes from "./Routes/partnerRoutes.js";
import clientStatusRoutes from "./Routes/clientStatusRoutes.js";
import walletRoutes from "./Routes/walletRoutes.js";
import courseRoutes from "./Routes/courseRoutes.js";

dotenv.config();
const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------------------------------------
   🔐 CORS — secure in production, open in dev
--------------------------------------------- */
const prodOrigins = [
  "https://bsofteducation.in",
  "https://student.bsofteducation.in",
];

const devOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];

const allowedOrigins =
  NODE_ENV === "production"
    ? prodOrigins
    : [...prodOrigins, ...devOrigins];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("CORS blocked"));
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* ---------------------------------------------
   🔰 Security Middlewares
--------------------------------------------- */
app.use(
  helmet({
    crossOriginResourcePolicy: false, // 🔥 allow images across ports
  })
);

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests. Please try again later.",
});


/* ---------------------------------------------
   📦 Request Body & Static
--------------------------------------------- */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const uploadsPath = path.resolve(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

/* ---------------------------------------------
   🧠 Database
--------------------------------------------- */
connectDB();

/* ---------------------------------------------
   🔍 Log requests (only in development)
--------------------------------------------- */
app.use((req, res, next) => {
  if (NODE_ENV !== "production") {
    console.log(`📨 ${req.method} -> ${req.url}`);
  }
  next();
});

/* ---------------------------------------------
   🚏 Routes
--------------------------------------------- */
app.use("/api/carrer-form", CarrerFormRoutes);
app.use("/api/user", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/client-status", clientStatusRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/courses", courseRoutes);


/* ---------------------------------------------
   🌍 Root + 404 + Errors
--------------------------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 API is running securely!");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

/* ---------------------------------------------
   🚀 Start Server
--------------------------------------------- */
app.listen(port, () => {
  console.log(`🔥 Server running on port ${port} in ${NODE_ENV} mode`);
});
