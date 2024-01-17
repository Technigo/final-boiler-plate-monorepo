import express from "express";
import { getAllUsers, userProfile } from "../controllers/userController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ROUTES
router.get("/all-users", getAllUsers);
router.get("/profile", userVerification, userProfile);

export default router;
