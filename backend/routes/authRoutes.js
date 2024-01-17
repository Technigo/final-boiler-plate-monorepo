import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", userVerification);

export default router;
