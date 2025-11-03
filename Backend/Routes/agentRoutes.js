import express from "express";
import { getAllAgents } from "../Controllers/agentController.js";

const router = express.Router();

// 🟢 Route to get all agents
router.get("/all", getAllAgents);

export default router;
