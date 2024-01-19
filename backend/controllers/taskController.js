import { TaskModel } from "../models/TaskModel";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

//  This controller is responsible for fetching tasks associated with a logged-in user. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, and responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request object
  try {
    const tasks = await TaskModel.find() // Find all tasks in the database
      .sort("-createdAt") // Sort the tasks by creation date
      .populate({
        // Populate the user object
        path: "user",
      })
      .populate({
        // Populate the volunteers object
        path: "volunteers",
        match: { _id: { $ne: userId } }, // Exclude the creator from the volunteers
        select: "username email",
      });
    // Filter out tasks where the creator is the only volunteer
    const filteredTasks = tasks.filter((task) => {
      const creatorId = task.user && task.user._id.toString();

      // Check if user is not creator or if there are other volunteers
      return creatorId !== userId.toString();
    });
    res.json(filteredTasks);
  } catch (error) {
    console.error("Error in getTasksController:", error); // Handle any errors that occur during the operation

    res.status(500).json(error);
  }
});

// This controller is responsible for fetching tasks/needs for a specific user. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, finds all tasks in the database and add the user object to the task object, filters out tasks that is not connected to a user and in the end responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getUserTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request object
  try {
    // Assuming userStorage contains the user details
    const tasks = await TaskModel.find()
      .sort("-createdAt")
      .populate({
        path: "user", // populate the user object
        match: { _id: userId }, // match the user id with the user id from the db
      })
      .populate({
        // Populate the volunteers object with the username and email
        path: "volunteers",
        select: "username email",
      });

    const userTasks = tasks.filter((task) => task.user !== null); // Filter out tasks that is not connected to a user

    res.json(userTasks);
  } catch (error) {
    console.error("Error in getUserTasksController:", error); // Handle any errors that occur during the operation
    res.status(500).json(error);
  }
});

// This controller is responsible for fetching tasks that a specific user has volunteered to. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, finds all tasks in the database and add the user object to the task object and the responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getVolunteeredTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const tasks = await TaskModel.find({
      volunteers: { $elemMatch: { $eq: userId } }, // find all tasks where the volunteers array contains the user id
    })
      .sort("-createdAt")
      .populate({
        // populate the user object with the username
        path: "user",
        select: "username",
      })
      .populate({
        // Populate the volunteers object with the username and email
        path: "volunteers",
        select: "username email",
      });

    res.json(tasks);
  } catch (error) {
    console.error("Error in getVolunteeredTasks:", error);
    res.status(500).json(error);
  }
});

// This controller handles the addition of new tasks. It extracts the task data from the request body and the user's authentication token from the request header. It then associates the task with the authenticated user and saves it to the database. The newly created task is sent back as a JSON response. This route is only accessible to authenticated users.
export const addTaskController = asyncHandler(async (req, res) => {
  try {
    // We are requesting the Authorization key from the headerObject
    const accessToken = req.header("Authorization");
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "default_secret"
    );
    const userFromStorage = await UserModel.findById(decoded.id); // get the user and matchIt with the user from the db.

    // Create a new task object using the TaskModel
    const newTask = new TaskModel({
      task: req.body.task, // Extract the task title from the request body
      category: req.body.category, // Extract the task category from the request body
      area: req.body.area, // Extract the task area from the request body
      description: req.body.description, // Extract the task description from the request body
      user: userFromStorage, // Associate the task with the authenticated user
    });

    // Save the task to the database
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error in addTaskController:", error);
    res.status(500).json(error);
  }
});

// This controller is responsible for adding a volunteer to a specific task. It extracts the task ID from the request parameters, finds the task in the database, adds the user ID to the task's volunteers array, and saves the task to the database. The updated task is sent back as a JSON response. This route is only accessible to authenticated users.

export const addVolunteerController = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id; // Extract the task ID from the request parameters
    const task = await TaskModel.findById(taskId); // Find the task in the database

    if (!task) {
      return res.status(404).json({ message: "Need not found" }); // Respond with a 404 error if the task/need is not found
    }

    const userId = req.user._id; // Get the user ID from the request object
    const user = await UserModel.findById(userId);

    //Check if the user is already a volunteer for this task and respond with a 400 error (Bad request) if they are
    if (task.volunteers.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already volunteered for this Need." });
    }

    task.volunteers.push(user); // Add user and username to the volunteers array
    const savedTask = await task.save(); // Save the task to the database
    res.json(savedTask); // Respond with the updated task in JSON format
  } catch (error) {
    console.error("Error in addVolunteerController:", error); // Handle any errors that occur during the operation
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE task by its ID
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
        }); // Respond with a success message and the deleted task/need
      } else {
        res.status(404).json({ message: "Task not found" }); // Respond with a 404 error if the task/need is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});
