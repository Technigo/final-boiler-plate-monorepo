import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// ROUTES
router.get("/all-users", getAllUsers);

export default router;
