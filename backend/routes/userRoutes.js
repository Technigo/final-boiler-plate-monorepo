import express from "express"; // Imports the express package.
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userController.js"; // Imports the registerUser function from the userController.js file.
// import {
//   authenticateUser,
//   authorizedAdmin,
// } from "../middlewares/authenticateUser.js"; // Imports the authenticateUser and authorizedAdmin middlewares.

const router = express.Router(); // Creates a new router object.

// ROUTES ---------------------------------------------

// GET api/users | Access: Admin
router.get("/", getAllUsers); // When a GET request is made to /, execute the getAllUsers function.

// POST api/users/register | Access: Public
router.post("/register", registerUser); // When a POST request is made to /register, execute the registerUser function.

// POST api/users/login | Access: Public
router.post("/login", loginUser); // When a POST request is made to /login, execute the loginUser function.

// POST api/users/logout | Access: Private
// router.post("/logout", logoutUser); // When a POST request is made to /logout, execute the logoutUser function.

export default router; // The router object is exported.
