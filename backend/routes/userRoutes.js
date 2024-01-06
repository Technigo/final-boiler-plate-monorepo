// Import the necessary modules and functions
import express from "express";
import parser from "../middleware/imageUpload"; // Import the parser middleware for image upload
import {
  registerUserController,
  loginUserController,
  getAllUsersController,
  getUserProfileController,
  updateUserController,
  updateImageController,
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
router.get("/users/:userId", parser.single("image"), getUserProfileController);

// UPDATE ROUTE: Handle user profile update
router.put("/users/:userId", parser.single("image"), updateUserController);

// UPDATE ROUTE: Handle user image update
router.put("/update-image/:userId", parser.single("image"), updateImageController);

// DELETE ROUTE: Hander user removal
router.delete("/users/:userId", deleteUserController);

// Export the router for use in the main application
export default router;

