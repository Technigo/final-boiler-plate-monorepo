import express from "express";
import { registerUser, loginUser, logoutUser, userDashboard, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/dashboard", verifyToken, userDashboard)

export default router;
