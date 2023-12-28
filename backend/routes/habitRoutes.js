// Import the necessary modules and functions
import express from "express";
import { authenticateUser } from "../middleware/authenticateUser"; // Import middleware for user authentication
import {
  getHabitsController,
  updateHabitController,
  deleteAllHabitsController,
  deleteSpecificHabitController,
  addHabitController,
  markFinishedHabitController,
  markUnfinishedHabitController,
} from "../controllers/habitController"; // Import controller functions for habits

// Create an instance of the Express router
const router = express.Router();

// Define a route for handling GET requests to retrieve all habits
router.get("/get", authenticateUser, getHabitsController); // When a GET request is made to /get, authenticate the user using middleware and then execute the getHabitsController function

// Define a route for handling PUT requests to update a specific Habit by ID
router.put("/update/:id", updateHabitController); // When a PUT request is made to /update/:id, execute the updateHabitController function

// Define a route for handling PUT requests to add a finished date a specific Habit by ID
router.put("/finished/:id", markFinishedHabitController); // When a PUT request is made to /finished/:id, execute the updateHabitController function

// Define a route for handling PUT requests to removes a finished date a specific Habit by ID
router.put("/unfinished/:id", markUnfinishedHabitController); // When a PUT request is made to /unfinished/:id, execute the updateHabitController function

// Define a route for handling DELETE requests to delete all Habits
router.delete("/deleteAll", deleteAllHabitsController); // When a DELETE request is made to /deleteAll, execute the deleteAllHabitsController function

// Define a route for handling DELETE requests to delete a specific Habit by ID
router.delete("/delete/:id", deleteSpecificHabitController); // When a DELETE request is made to /delete/:id, execute the deleteSpecificHabitController function

// Define a route for handling POST requests to add a new Habit
router.post("/add", authenticateUser, addHabitController); // When a POST request is made to /add, authenticate the user using middleware and then execute the addHabitController function

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for various CRUD operations on Habits. It includes middleware for user authentication and associates each route with the corresponding controller function. These routes define the API endpoints for managing Habits within the application.
