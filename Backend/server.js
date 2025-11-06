// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// import mongodb from "./config/Mongodb.js";
// import CarrerFormRoutes from "./Routes/CarrerFormRoutes.js";
// import authRoutes from "./Routes/AuthRoutes.js";
// import dashboardRoutes from "./Routes/DashboardRoutes.js";
// import partnerRoutes from "./Routes/partnerRoutes.js"; 
// import clientStatusRoutes from "./Routes/clientStatusRoutes.js";
 
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// mongodb();

// app.use("/api/carrer-form", CarrerFormRoutes);
// app.use("/api/user", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/partners", partnerRoutes); 
// app.use("/api/client-status", clientStatusRoutes);
 
// app.get("/", (req, res) => {
//   res.send("🚀 API is running successfully");
// });

// app.listen(port, () => {
//   console.log(`✅ Server is running on port ${port}`);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// import connectDB from "./config/Mongodb.js";
// import CarrerFormRoutes from "./Routes/CarrerFormRoutes.js";
// import authRoutes from "./Routes/AuthRoutes.js";
// import dashboardRoutes from "./Routes/DashboardRoutes.js";
// import partnerRoutes from "./Routes/partnerRoutes.js";
// import clientStatusRoutes from "./Routes/clientStatusRoutes.js";
// import walletRoutes from "./Routes/walletRoutes.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 4000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Database
// connectDB();

// // Routes
// app.use("/api/carrer-form", CarrerFormRoutes);
// app.use("/api/user", authRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/partners", partnerRoutes);
// app.use("/api/client-status", clientStatusRoutes);
// app.use("/api/wallet", walletRoutes);

// // Root
// app.get("/", (req, res) => {
//   res.send("🚀 API is running successfully");
// });

// // 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

// app.listen(port, () => {
//   console.log(`✅ Server is running on port ${port}`);
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/Mongodb.js";

import CarrerFormRoutes from "./Routes/CarrerFormRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import dashboardRoutes from "./Routes/DashboardRoutes.js";
import partnerRoutes from "./Routes/partnerRoutes.js";
import clientStatusRoutes from "./Routes/clientStatusRoutes.js";
import walletRoutes from "./Routes/walletRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------------------------
   ✅ CORS FIX for Render & Vercel
---------------------------------------------------- */
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://institute-client.vercel.app", // client frontend
  "https://institute-admin-theta.vercel.app", // admin/partner frontend
];

// ✅ Allow CORS for both actual & preflight (OPTIONS) requests
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

/* ----------------------------------------------------
   ✅ Express Middleware
---------------------------------------------------- */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ----------------------------------------------------
   ✅ MongoDB Connection
---------------------------------------------------- */
if (!process.env.MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in .env file");
  process.exit(1);
}
connectDB();

/* ----------------------------------------------------
   ✅ Routes
---------------------------------------------------- */
app.use("/api/carrer-form", CarrerFormRoutes);
app.use("/api/user", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/client-status", clientStatusRoutes);
app.use("/api/wallet", walletRoutes);

/* ----------------------------------------------------
   ✅ Root
---------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully on Render!");
});

/* ----------------------------------------------------
   ✅ 404 & Error Handlers
---------------------------------------------------- */
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ----------------------------------------------------
   ✅ Start Server
---------------------------------------------------- */
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
