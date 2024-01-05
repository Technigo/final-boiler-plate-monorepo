import express from "express";
import {
    registerAdminController,
    loginAdminController,
} from "../controllers/adminController";
import { authenticateAdmin } from "../middleware/authenticateAdmin"; // Import the authenticateAdmin middleware


// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle admin registration
router.post("/register", registerAdminController);

// LOGIN ROUTE: Handle admin login
router.post("/login", authenticateAdmin, loginAdminController);

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.