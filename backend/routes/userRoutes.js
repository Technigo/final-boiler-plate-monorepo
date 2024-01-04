import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
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

// ABOUT US ROUTE: Handle about us
router.get("/about", (req, res) => {
  res.json({ about: "This is about us" });
});

// PROFILE ROUTE: Handle profile page and add the authenticateUser middleware to the route to protect it
router.get("/profile", authenticateUser, (req, res) => {
  res.json({ profile: "This is your profile" });
});

// removed the authenticateUser middleware to be able to see all tasks
router.get("/tasks", (req, res) => {
  res.json({ tasks: "This is all tasks" });
});

router.get("/tasks/:id", authenticateUser, (req, res) => {
  res.json({ tasks: "This is a (private) task" });
});

// Export the router for use in the main application
// export { router }; DETTA FANNS I VÅR KOD
export default router;
