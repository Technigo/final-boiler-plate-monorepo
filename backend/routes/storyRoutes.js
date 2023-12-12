// Import the necessary modules and functions
import express from "express";
import Stories from "../stories.json";
import listEndpoints from "express-list-endpoints";

// Create an instance of the Express router
const router = express.Router();

router.get("/", (req, res) => {
  res.send(listEndpoints(router));
});

//routes for all stories
router.get("/stories", async (req, res) => {
  const stories = await Stories.find().sort({ createdAt: "desc" }).exec();
  res.json(stories);
});
// Define a route for handling PUT requests to update a specific task by ID
//router.put("/update/:id", updateTaskController); // When a PUT request is made to /update/:id, execute the updateTaskController function

// Define a route for handling DELETE requests to delete all tasks
//router.delete("/deleteAll", deleteAllTasksController); // When a DELETE request is made to /deleteAll, execute the deleteAllTasksController function

//// Define a route for handling DELETE requests to delete a specific task by ID
//router.delete("/delete/:id", deleteSpecificTaskController); // When a DELETE request is made to /delete/:id, execute the deleteSpecificTaskController function

// Define a route for handling POST requests to add a new task
//router.post("/add", authenticateUser, addTaskController); // When a POST request is made to /add, authenticate the user using middleware and then execute the addTaskController function

// Export the router for use in the main application
export default router;

// In summary, this file sets up routes using the Express router for various CRUD operations on tasks. It includes middleware for user authentication and associates each route with the corresponding controller function. These routes define the API endpoints for managing tasks within the application.
