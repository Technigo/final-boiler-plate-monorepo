import { TaskModel } from "../models/TaskModel";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

// Denna koden kan användas på profile page också, byt ut modellen til relevant modelss samt user til task (fråga Jonny)
export const getTasksController = asyncHandler(async (req, res) => {
  try {
    // Assuming userStorage contains the user details
    const tasks = await TaskModel.find().sort("-createdAt").populate("user"); // Find all tasks in the database and sort them by creation date
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const getUserTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("userId", userId);
  try {
    // Assuming userStorage contains the user details
    const tasks = await TaskModel.find()
      .sort("-createdAt")
      .populate({
        path: "user",
        match: { _id: userId },
      });
    const userTasks = tasks.filter((task) => task.user !== null);
    // Find all tasks in the database and sort them by creation date

    res.json(userTasks);
  } catch (error) {
    console.error("Error in getUserTasksController:", error);
    res.status(500).json(error);
  }
});

// desciption: POST Tasks
// route: /add
// access: not Private, public
export const addTaskController = asyncHandler(async (req, res) => {
  try {
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "default_secret"
    );
    console.log("accessToken", accessToken);
    const userFromStorage = await UserModel.findById(decoded.id);

    // Define var to pass new task
    const newTask = new TaskModel({
      task: req.body.task, // Assuming your task object has a 'taskTitle' property
      category: req.body.category,
      area: req.body.area,
      description: req.body.description,
      user: userFromStorage,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error in addTaskController:", error);
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific task to mark it complete
// route: /update/:id"
// access: Private
// export const updateTaskController = asyncHandler(async (req, res) => {
//   // Extract the task ID from the request parameters
//   const { id } = req.params;
//   console.log(id); // Log the ID to the console
//   // Use TaskModel to find and update a task by its ID, marking it as done
//   // Use TaskModel to delete all tasks in the database
//   // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
//   const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
//   // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
//   const userFromStorage = await UserModel.findOne({
//     accessToken: accessToken,
//   });
//   await TaskModel.findByIdAndUpdate(
//     { _id: id },
//     { done: true },
//     { user: userFromStorage }
//   )
//     .then((result) => res.json(result)) // Respond with the updated task in JSON format
//     .catch((err) => res.json(err)); // Handle any errors that occur during the operation
// });

export const updateTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { done: true },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: DELETE all tasks
// route: /deleteAll
// access: Private
export const deleteAllTasksController = asyncHandler(async (req, res) => {
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
