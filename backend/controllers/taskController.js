import { TaskModel } from "../models/TaskModel";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

//  This controller is responsible for fetching tasks associated with a logged-in user. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, and responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request object
  try {
    const tasks = await TaskModel.find()
      .sort("-createdAt")
      .populate({
        path: "user",

        //select: "username",
      })
      .populate({
        path: "volunteers",
        match: { _id: { $ne: userId } }, // Exclude the creator from the volunteers
        //select: "username",
      });
    console.log("tasks", tasks);
    // Filter out tasks where the creator is the only volunteer
    const filteredTasks = tasks.filter((task) => {
      const creatorId = task.user && task.user._id.toString();

      // Check if user is not creator or if there are other volunteers
      return creatorId !== userId.toString();
    });
    res.json(filteredTasks);
  } catch (error) {
    console.error("Error in getTasksController:", error);

    res.status(500).json(error);
  }
});

// This controller is responsible for fetching tasks for a specific user. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, finds all tasks in the database and add the user object to the task object, filters out tasks that is not connected to a user and in the end responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getUserTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("userId", userId);
  try {
    // Assuming userStorage contains the user details
    const tasks = await TaskModel.find()
      .sort("-createdAt")
      .populate({
        path: "user", // populate the user object
        match: { _id: userId }, // match the user id with the user id from the db
      });
    const userTasks = tasks.filter((task) => task.user !== null); // Filter out tasks that is not connected to a user

    res.json(userTasks);
  } catch (error) {
    console.error("Error in getUserTasksController:", error);
    res.status(500).json(error);
  }
});

// This controller is responsible for fetching tasks that a specific user has volunteered to. It uses the TaskModel to retrieve tasks from the database, sorts them by creation date, finds all tasks in the database and add the user object to the task object and the responds with the list of tasks in JSON format. Access to this route is restricted to authenticated users.
export const getVolunteeredTasksController = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("userId", userId);
  try {
    const tasks = await TaskModel.find({
      volunteers: { $elemMatch: { $eq: userId } }, // find all tasks where the volunteers array contains the user id
    })
      .sort("-createdAt")
      .populate({
        path: "user",
        select: "username",
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
    const accessToken = req.header("Authorization");
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "default_secret"
    );
    console.log("accessToken", accessToken);
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
    console.error("Error in addTaskController:", error);
    res.status(500).json(error);
  }
});

// This controller is responsible for adding a volunteer to a specific task. It extracts the task ID from the request parameters, finds the task in the database, adds the user ID to the task's volunteers array, and saves the task to the database. The updated task is sent back as a JSON response. This route is only accessible to authenticated users.
export const addVolunteerController = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);
    task.volunteers.push(req.user._id);

    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error in addVolunteerController:", error);
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
export const deleteSpecificTaskController = asyncHandler(async (req, res) => {
  // Extract the task ID from the request parameters
  const { id } = req.params;
  console.log("Deleting task on the server:", id);
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
