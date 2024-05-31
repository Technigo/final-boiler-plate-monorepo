import { TaskModel } from "../models/TaskModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";

// desciption: Get Tasks
// route: /get
// access: Private
export const getTasksController = asyncHandler(async (req, res) => {
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userStorage = req.user;
  // Use the TaskModel to find all tasks associated with the logged-in user
  await TaskModel.find({ user: userStorage })
    .sort("-createdAt")
    .then((result) => res.json(result)) // Respond with the found tasks in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: POST Tasks
// route: /add
// access: Private
export const addTaskController = asyncHandler(async (req, res) => {
  try {
    // Extract the task data from the request body
    const { task } = req.body;
    // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });
    // Define var to pass new task
    const newTask = new TaskModel({
      task: task,
      user: userFromStorage,
    }).save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific task to mark it complete
// route: /update/:id"
// access: Private
export const updateTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use TaskModel to find and update a task by its ID, marking it as done
  // Use TaskModel to delete all tasks in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await TaskModel.findByIdAndUpdate(
    { _id: id },
    { done: true },
    { user: userFromStorage }
  )
    .then((result) => res.json(result)) // Respond with the updated task in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all tasks
// route: /deleteAll
// access: Private
export const deleteAllTasksController = asyncHandler(async (req, res) => {
  // Use TaskModel to delete all tasks in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await TaskModel.deleteMany({ user: userFromStorage })
    .then((result) =>
      res.json({
        message: "All tasks deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted tasks
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE task by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  // Use TaskModel to find and delete a task by its ID
  await TaskModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Task deleted successfully",
          deletedTask: result,
        }); // Respond with a success message and the deleted task
      } else {
        res.status(404).json({ message: "Task not found" }); // Respond with a 404 error if the task is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// IN SUMMARY

//This file defines several controllers for handling tasks in an Express.js application. Here's a summary of what the file does in simple words:

// getTasksController: This controller is responsible for fetching tasks associated with a logged-in user. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, and responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.

// addTaskController: This controller handles the addition of new tasks. It extracts the task data from the request body and the user's authentication token from the request header. It then associates the task with the authenticated user and saves it to the database. The newly created task is sent back as a JSON response. This route is also accessible only to authenticated users.

// updateTaskController: This controller is responsible for marking a specific task as completed. It extracts the task ID from the request parameters, logs it to the console, and updates the task status to "done" in the database. It then responds with the updated task in JSON format. Access to this route is restricted to authenticated users.

// deleteAllTasksController: This controller is used to delete all tasks associated with the authenticated user. It retrieves the user's authentication token from the request header, finds the user in the database, and deletes all tasks associated with that user. It responds with a JSON message indicating the number of deleted tasks. This route can only be accessed by authenticated users.

// deleteSpecificTaskController: Here, the controller is responsible for deleting a specific task by its ID. It extracts the task ID from the request parameters and uses the TaskModel to find and delete the task. If the task is found and deleted, it responds with a success message and the deleted task. If the task is not found, it responds with a 404 error message. Authentication is required to access this route.

// In summary, this file contains controllers for handling tasks within a web application. These controllers ensure that tasks can be retrieved, added, updated, and deleted while enforcing authentication and error handling to maintain the application's integrity and security.
