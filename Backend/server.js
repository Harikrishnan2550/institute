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

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database
connectDB();

// Routes
app.use("/api/carrer-form", CarrerFormRoutes);
app.use("/api/user", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/client-status", clientStatusRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
