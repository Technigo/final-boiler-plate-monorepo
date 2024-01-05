import { HabitModel } from "../models/HabitModel";
//asyncHandler: We use asyncHandler to simplify error handling in asynchronous code. It helps us avoid writing repetitive try-catch blocks by automatically catching errors and passing them to our error handling middleware. This makes our code cleaner and more readable, reducing the risk of unhandled exceptions that could crash the server.
import asyncHandler from "express-async-handler";
// We need to import the userModel to check for the famous accesstoken
import { UserModel } from "../models/UserModel";

// desciption: Get Habits
// route: /get
// access: Private
export const getHabitsController = asyncHandler(async (req, res) => {
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userStorage = req.user;
  // Use the HabitModel to find all Habits associated with the logged-in user
  await HabitModel.find({ user: userStorage })
    .sort("-createdAt")
    .then((result) => res.json(result)) // Respond with the found Habits in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: POST Habits
// route: /add
// access: Private
export const addHabitController = asyncHandler(async (req, res) => {
  try {
    // Extract the Habit data from the request body
    const { habit } = req.body;
    // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
    const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
    // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
    const userFromStorage = await UserModel.findOne({
      accessToken: accessToken,
    });
    // Define var to pass new Habit
    const newHabit = new HabitModel({
      habit: habit,
      user: userFromStorage,
    }).save();
    res.json(newHabit);
  } catch (error) {
    res.status(500).json(error);
  }
});

// desciption: PUT/PATCH a specific Habit to mark it complete
// route: /update/:id"
// access: Private
export const updateHabitController = asyncHandler(async (req, res) => {
  // Extract the Habit ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use HabitModel to find and update a Habit by its ID, marking it as done
  // Use HabitModel to delete all Habits in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const { habit } = req.body;
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await HabitModel.findByIdAndUpdate(
    { _id: id },
    { habit },
    { user: userFromStorage },
    { returnDocument: 'after' },
  )
    .then((result) => res.json(result)) // Respond with the updated Habit in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

export const markFinishedHabitController = asyncHandler(async (req, res) => {
  // Extract the Habit ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use HabitModel to find and update a Habit by its ID, marking it as done
  // Use HabitModel to delete all Habits in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const { finished } = req.body;
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  const habit = await HabitModel.findById({ _id: id });
  await HabitModel.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { finished: finished } },
    { returnDocument: 'after' },
  )
    .then((result) => res.json(result)) // Respond with the updated Habit in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});


export const markUnfinishedHabitController = asyncHandler(async (req, res) => {
  // Extract the Habit ID from the request parameters
  const { id } = req.params;
  console.log(id); // Log the ID to the console
  // Use HabitModel to find and update a Habit by its ID, marking it as done
  // Use HabitModel to delete all Habits in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const { unfinished } = req.body;
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  const habit = await HabitModel.findById({ _id: id });
  await HabitModel.findByIdAndUpdate(
    { _id: id },
    { $pull: { finished: unfinished } },
    { returnDocument: 'after' },
  )
    .then((result) => res.json(result)) // Respond with the updated Habit in JSON format
    .catch((err) => res.json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE all Habits
// route: /deleteAll
// access: Private
export const deleteAllHabitsController = asyncHandler(async (req, res) => {
  // Use HabitModel to delete all Habits in the database
  // Extract the accessToken from the request object, but it is not going to be from the req.body but, its going to be from the req.header
  const accessToken = req.header("Authorization"); // we are requesting the Authorization key from the headerObject
  // get the user and matchIt with the user from the db - remmeber that we are using the accessToken to do so :)
  const userFromStorage = await UserModel.findOne({
    accessToken: accessToken,
  });
  await HabitModel.deleteMany({ user: userFromStorage })
    .then((result) =>
      res.json({
        message: "All Habits deleted",
        deletedCount: result.deletedCount,
      })
    ) // Respond with a success message and the count of deleted Habits
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// desciption: DELETE Habit by its ID
// route: /delete/:id
// access: Private
export const deleteSpecificHabitController = asyncHandler(async (req, res) => {
  // Extract the Habit ID from the request parameters
  const { id } = req.params;
  // Use HabitModel to find and delete a Habit by its ID
  await HabitModel.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.json({
          message: "Habit deleted successfully",
          deletedHabit: result,
        }); // Respond with a success message and the deleted Habit
      } else {
        res.status(404).json({ message: "Habit not found" }); // Respond with a 404 error if the Habit is not found
      }
    })
    .catch((err) => res.status(500).json(err)); // Handle any errors that occur during the operation
});

// Controller function to reset finished days and increment finished weeks
export const resetFinishedController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const habit = await HabitModel.findById(id);
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }

  habit.finished = []; // Reset the finished days
  habit.finishedWeeks += 1; // Increment the finished weeks
  await habit.save();

  res.json({ success: true, habit });
});

// IN SUMMARY

//This file defines several controllers for handling Habits in an Express.js application. Here's a summary of what the file does in simple words:

// getHabitsController: This controller is responsible for fetching Habits associated with a logged-in user. It uses the HabitModel to retrieve Habits from the database, sorts them by creation date, and responds with the list of Habits in JSON format. Access to this route is restricted to authenticated users.

// addHabitController: This controller handles the addition of new Habits. It extracts the Habit data from the request body and the user's authentication token from the request header. It then associates the Habit with the authenticated user and saves it to the database. The newly created Habit is sent back as a JSON response. This route is also accessible only to authenticated users.

// updateHabitController: This controller is responsible for marking a specific Habit as completed. It extracts the Habit ID from the request parameters, logs it to the console, and updates the Habit status to "done" in the database. It then responds with the updated Habit in JSON format. Access to this route is restricted to authenticated users.

// deleteAllHabitsController: This controller is used to delete all Habits associated with the authenticated user. It retrieves the user's authentication token from the request header, finds the user in the database, and deletes all Habits associated with that user. It responds with a JSON message indicating the number of deleted Habits. This route can only be accessed by authenticated users.

// deleteSpecificHabitController: Here, the controller is responsible for deleting a specific Habit by its ID. It extracts the Habit ID from the request parameters and uses the HabitModel to find and delete the Habit. If the Habit is found and deleted, it responds with a success message and the deleted Habit. If the Habit is not found, it responds with a 404 error message. Authentication is required to access this route.

// In summary, this file contains controllers for handling Habits within a web application. These controllers ensure that Habits can be retrieved, added, updated, and deleted while enforcing authentication and error handling to maintain the application's integrity and security.
