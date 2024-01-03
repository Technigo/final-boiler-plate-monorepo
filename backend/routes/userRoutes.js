import express from "express"; // Imports the express package.
import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  currentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js"; // Imports the registerUser function from the userController.js file.
import { authenticateUser, authorizedAdmin } from "../middlewares/auth.js";

const router = express.Router(); // Creates a new router object.

// ROUTES ---------------------------------------------

// ALL USERS ROUTE: List of all users
router.get("/", authenticateUser, authorizedAdmin(["admin"]), getAllUsers); // When a GET request is made to /, execute the getAllUsers function.

// REGISTER ROUTE: Handle user registration
router.post("/register", registerUser); // When a POST request is made to /register, execute the registerUser function.

// LOGIN ROUTE: Handle user login
router.post("/login", loginUser); // When a POST request is made to /login, execute the loginUser function.

// LOGOUT ROUTE: Handle user logout
router.post("/logout", logoutUser); // When a POST request is made to /logout, execute the logoutUser function.

// USER PROFILE ROUTE: Handle users profile.
router
  .route("/profile")
  .get(authenticateUser, currentUserProfile)
  .put(authenticateUser, updateCurrentUserProfile);

export default router; // The router object is exported.
