import express from "express";
import { authenticateUser } from "../middleware/authenticateUser";
import {
  getTasksController,
  updateTaskController,
  deleteSpecificTaskController,
  addTaskController,
  getUserTasksController,
  addVolunteerController,
  getVolunteeredTasksController,
} from "../controllers/taskController"; // Import controller functions for tasks.

// Create an instance of the Express router.
const router = express.Router();

// Create a route to handle GET requests for fetching all tasks. When a GET request is sent to /get, use middleware to authenticate the user, ensuring only authorized users can access the route, and then execute the getTasksController function to retrieve and respond with the tasks.
router.get("/get", authenticateUser, getTasksController);

// Set up a route to handle POST requests for adding a new task. When a POST request is sent to /add, employ middleware to authenticate the user, ensuring only authorized users can access the route. After authentication, execute the addTaskController function to process and handle the addition of a new task.
router.post("/add", authenticateUser, addTaskController);

// Establish a route to handle GET requests for fetching tasks associated with a specific user. Upon receiving a GET request to /userTask, use middleware to authenticate the user, ensuring that only authorized users can access the route. Subsequently, execute the getUserTasksController function to retrieve and respond with tasks specifically associated with the authenticated user.
router.get("/userTask", authenticateUser, getUserTasksController);

// Establish a route to handle GET requests for fetching a specific task by its ID. When a GET request is directed to /get/:id, utilize middleware to authenticate the user, ensuring that only authorized users can access the route. Subsequently, execute the getTasksController function to retrieve and respond with details of the specific task identified by the provided ID.
router.get("/get/:id", authenticateUser, getTasksController);

// Set up a route to handle PUT requests for updating a specific task by its ID. Upon receiving a PUT request to /update/:id, execute the updateTaskController function to process and apply updates to the task identified by the provided ID.
router.put("/update/:id", updateTaskController);

// Establish a route to handle PUT requests for adding a volunteer to a specific task by its ID. When a PUT request is sent to /addVolunteer/:id, use middleware to authenticate the user, ensuring that only authorized users can access the route. Subsequently, execute the addVolunteerController function to process and handle the addition of a volunteer to the task identified by the provided ID.
router.put("/addVolunteer/:id", authenticateUser, addVolunteerController);

// Set up a route to handle GET requests for fetching all tasks to which a specific user has volunteered. When a GET request is directed to /getVolunteeredTasks, use middleware to authenticate the user, ensuring that only authorized users can access the route. Subsequently, execute the getVolunteeredTasksController function to retrieve and respond with tasks that the authenticated user has volunteered for.
router.get(
  "/getVolunteeredTasks",
  authenticateUser,
  getVolunteeredTasksController
);

// Set up a route to handle DELETE requests for deleting a specific task by its ID. Upon receiving a DELETE request to /delete/:id, execute the deleteSpecificTaskController function to process and handle the deletion of the task identified by the provided ID.
router.delete("/delete/:id", deleteSpecificTaskController);

// Export the router for use in the main application
export default router;
