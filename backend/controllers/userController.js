// Import packages
import bcrypt from "bcrypt"; // Use bcrypt to securely hash and store passwords in our database.
import jwt from "jsonwebtoken"; // Import the jsonwebtoken dependency.

// Imports
import { UserModel } from "../models/userModel.js"; // Import the UserModel from the userModel.js file.
import asyncHandler from "../utils/asyncHandler.js"; // Import the asyncHandler function from the asyncHandler.js file.

// ADMIN ONLY - GET ALL USERS ---------------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({}); // Find all users in the database.
  // Send the users' information to the client.
  res.json(users);
});

// REGISTER A NEW USER ---------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  // Get user data - Extract email, username and password from the request body.
  const { username, password, email } = req.body;

  try {
    // 1st Condition - Check if all fields are inputted.
    if (!username || !email || !password) {
      // If any of the fields are empty, send an error message.
      return res
        .status(400)
        .send({ message: "Please fill in all the inputs." });
    }

    // 2nd Condition - Check if the username already exists.
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      // If the username already exists, send an error message.
      return res.status(400).send({ message: "User already exists" });
    }

    // 3rd Condition - Check if the email already exists.
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      // If the email already exists, send an error message.
      return res.status(400).send({
        message: "Email already exists. Please use a different email address.",
      });
    }

    // Generate a salt and hash the user's password from the bcrypt library.
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds.
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the user's password with the salt.

    // Create a new user.
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // Send the user's information to the client.
    res.status(201).json({
      _id: newUser._id, // Send the user's ID.
      username: newUser.username, // Send the user's username.
      email: newUser.email, // Send the user's email.
    });
  } catch (error) {
    // If there's an error, send an error message.
    return res.status(400).json({ message: "Could not create user" });
  }
});

// LOGIN AS A USER ---------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  // Extract username and password from the request body.
  const { username, password } = req.body;

  try {
    // Check if it's already an existing user with the provided username in the database.
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a new access token with expiration using JWT
    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    existingUser.accessToken = accessToken;

    await existingUser.save();

    res.status(201).json({
      _id: existingUser._id, // Send the user's ID.
      username: existingUser.username, // Send the user's username.
      email: existingUser.email, // Send the user's email.
      accessToken: existingUser.accessToken,
    });
  } catch (error) {
    // If there's an error, send an error message.
    return res.status(400).json({ message: "Could not login user" });
  }
});

// LOGOUT USER ---------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    // Set the user's access token to null or an empty string
    user.accessToken = "";
    await user.save();

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not log out user" });
  }
});

// USER PROFILE ---------------------------------------------
const currentUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id); // Find the user by ID.

  if (user) {
    // If the user exists, send the user's information to the client.
    res.json({
      _id: user._id, // Send the user's ID.
      username: user.username, // Send the user's username.
      email: user.email, // Send the user's email.
    });
  } else {
    // If the user doesn't exist, send an error message.
    return res.status(404).json({ message: "User profile not found" });
  }
});

// UPDATE USER PROFILE: User can update their information if authenticated.
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id); // Find the user by ID.

  if (user) {
    // If the user exists, update the user's information.
    user.username = req.body.username || user.username; // If the username is provided, update the username. If not, keep the original username.
    user.email = req.body.email || user.email; // If the email is provided, update the email. If not, keep the original email.

    const updatedUser = await user.save(); // Save the updated user to the database.
    res.json({
      // Send the updated user's information to the client.
      username: updatedUser.username, // Send the updated username.
      email: updatedUser.email, // Send the updated email.
    });
  } else {
    // If the user doesn't exist, send an error message.
    return res.status(404).json({ message: "User profile not found" });
  }
});

// Export the functions.
export {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  currentUserProfile,
  updateCurrentUserProfile,
};
