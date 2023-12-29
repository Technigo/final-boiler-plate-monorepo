import express from "express";
import { authenticateUser } from "../middleware/authenticateUser"; // Import middleware for user authentication.
import {
  getTasksController,
  updateTaskController,
  deleteAllTasksController,
  deleteSpecificTaskController,
  addTaskController,
  getUserTasksController,
  addVolunteerController,
  getVolunteeredTasksController,
} from "../controllers/taskController"; // Import controller functions for tasks.

// Create an instance of the Express router.
const router = express.Router();

// Define a route for handling GET requests to retrieve all tasks. When a GET request is made to /get, authenticate the user using middleware and then execute the getTasksController function.
router.get("/get", authenticateUser, getTasksController);

// Define a route for handling POST requests to add a new task.  When a POST request is made to /add, authenticate the user using middleware and then execute the addTaskController function.
router.post("/add", authenticateUser, addTaskController);

// Define a route for handling GET requests to retrieve tasks for a specific user. When a GET request is made to /userTask, authenticate the user using middleware and then execute the getUserTasksController function.
router.get("/userTask", authenticateUser, getUserTasksController);

// Define a route for handling GET requests to retrieve a specific task by ID. When a GET request is made to /get/:id, authenticate the user using middleware and then execute the getTasksController function.
router.get("/get/:id", authenticateUser, getTasksController);

// Define a route for handling PUT requests to update a specific task by ID. When a PUT request is made to /update/:id, execute the updateTaskController function.
router.put("/update/:id", updateTaskController);

// Define a route for handling PUT requests to add a volunteer to a specific task by ID. When a PUT request is made to /addVolunteer/:id, authenticate the user using middleware and then execute the addVolunteerController function.
router.put("/addVolunteer/:id", authenticateUser, addVolunteerController);

// Define a route for handling GET requests to retrieve all tasks a specific user has volunteered to. When a GET request is made to /getVolunteeredTasks, authenticate the user using middleware and then execute the getVolunteeredTasksController function.
router.get(
  "/getVolunteeredTasks",
  authenticateUser,
  getVolunteeredTasksController
);

// Define a route for handling DELETE requests to delete all tasks. When a DELETE request is made to /deleteAll, execute the deleteAllTasksController function.
router.delete("/deleteAll", deleteAllTasksController);

// Define a route for handling DELETE requests to delete a specific task by ID. When a DELETE request is made to /delete/:id, execute the deleteSpecificTaskController function.
router.delete("/delete/:id", deleteSpecificTaskController);

// Export the router for use in the main application
export default router;
