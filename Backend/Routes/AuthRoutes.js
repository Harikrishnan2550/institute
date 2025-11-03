import express from "express";
import { register, login, getUserInfo } from "../Controllers/UserController.js";
import { verifyToken } from "../MiddleWare/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/userInfo", verifyToken, getUserInfo);

export default router;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDg0YjljMzJhMzA1YjNlODEyNjRlYyIsInJvbGUiOiJwYXJ0bmVyIiwiYWdlbnRJZCI6IkFHVC0wMDA0IiwiaWF0IjoxNzYyMTUxMzUzLCJleHAiOjE3NjIyMzc3NTN9.dtFWbZBwh6w2R3GbW5Xv0N-l9kjXBzeNd-Hfp1j1zo0