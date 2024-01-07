import express from "express";
import {
    registerAdminController,
    loginAdminController,
    listUsersController, // List of all users
    upgradeUserController // Upgrade user to admin
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/authenticateAdmin.js"; // Import middleware to add for protection


// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle admin registration
router.post("/register", registerAdminController);

// LOGIN ROUTE: Handle admin login
router.post("/login", authenticateAdmin, loginAdminController);

// Route for a list of all users
router.get("/users", authenticateAdmin, listUsersController);

// New route for upgrading a user to an admin
router.post("/upgradeUser", authenticateAdmin, upgradeUserController);

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. In addition it has routes to retrieve all users and upgrade user to admin. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.