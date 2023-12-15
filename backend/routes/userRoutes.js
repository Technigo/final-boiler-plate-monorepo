// Import the necessary modules and functions
import express from "express";
import {
  registerUserController,
  loginUserController,
  getAllUsersController,
  getUserProfileController,
  updateUserController,
  deleteUserController
} from "../controllers/userController"; // Import controller functions for user registration and login

// Create an instance of the Express router
const router = express.Router();

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUserController); // When a POST request is made to /register, execute the registerUserController function

// LOGIN ROUTE: Handle user login
router.post("/login", loginUserController); // When a POST request is made to /login, execute the loginUserController function

// RETRIEVE ALL USERS ROUTE: Retrieve all users
router.get("/users", getAllUsersController);

// DISPLAY PROFILE ROUTE: Handle user profile display
router.get("/users/:userId", getUserProfileController);

// UPDATE ROUTE: Handle user profile update
router.put("/users/:userId", updateUserController);

// DELETE ROUTE: Hander user removal
router.delete("/users/:userId", deleteUserController);

// Export the router for use in the main application
export default router;

