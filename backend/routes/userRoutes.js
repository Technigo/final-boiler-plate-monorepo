import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/authController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", userVerification);
router.get("/all-users", getAllUsers);

export default router;