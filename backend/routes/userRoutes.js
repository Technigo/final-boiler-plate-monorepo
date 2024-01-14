import express from "express"; // Imports the express package.
import {
  getAllUsers,
  loginUser,
  logoutUser,
  currentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js"; // Imports the functions from the userController.js file.
import { authenticateUser } from "../middlewares/auth.js"; // Imports the authenticateUser and authorizedAdmin functions from the auth.js file.

const router = express.Router(); // Creates a new router object.

// USERS ROUTES ---------------------------------------------

// ALL USERS ROUTE: List of all users.
router.get("/", getAllUsers); // When a GET request is made to /, execute the getAllUsers function. The user must be authenticated and authorized as an admin.

// REGISTER ROUTE: Handle user registration
// router.post("/register", registerUser); // When a POST request is made to /register, execute the registerUser function.

// AUTH ROUTE: Handle user authentication.
router
  // LOGIN ROUTE: Handle user login
  .post("/login", loginUser, authenticateUser) // When a GET request is made to /auth, execute the authenticateUser function.
  // LOGOUT ROUTE: Handle user logout
  .post("/logout", logoutUser, authenticateUser); // When a POST request is made to /auth, execute the authenticateUser function.

// USER PROFILE ROUTE: Handle users profile.
router
  .route("/profile")
  .get(authenticateUser, currentUserProfile) // When a GET request is made to /profile, execute the currentUserProfile function.
  .put(authenticateUser, updateCurrentUserProfile); // When a PUT request is made to /profile, execute the updateCurrentUserProfile function.

export default router; // The router object is exported.
