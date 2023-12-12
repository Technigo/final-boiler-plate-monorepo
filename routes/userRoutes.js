// Import the necessary modules and functions
import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController"; // Import controller functions for user registration and login

// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function

// LOGIN ROUTE: Handle user login
router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for user registration and login operations. It associates each route with the corresponding controller function. These routes define the API endpoints for handling user registration and login within the application.
