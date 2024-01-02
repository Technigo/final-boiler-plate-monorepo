import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"; // Use bcrypt to securely hash and store passwords in our database.
import { generateToken } from "../utils/generateToken.js";

// ADMIN ONLY - GET ALL USERS ---------------------------------------------
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

// REGISTER A NEW USER ---------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  // Get user data - Extract email, username and password from the request body.
  const { username, password, email } = req.body;

  // 1st Condition - Check if all fields are inputted.
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Please fill in all the inputs." });
  }

  // 2nd Condition - Check if the user already exists.
  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) {
    return res.status(400).send({ message: "User already exists" });
  }

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return res.status(400).send({
      message: "Email already exists. Please use a different email address.",
    });
  }

  // Generate a salt and hash the user's password from the bcrypt library.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user.
  const newUser = new UserModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// LOGIN AS A USER ---------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  // Extract username and password from the request body.
  const { username, password } = req.body;

  // Check if it's already an existing user with the provided username in the database.
  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password); // Compare the password provided by the user with the hashed password stored in the database.

    // If the passwords match, generate a JWT token and send it to the client.
    if (passwordMatch) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return; // Exit the function after sending the response.
      // If the passwords don't match, send an error message.
    } else {
      return res.status(401).json({ message: "Invalid password." });
    }
  } else {
    return res.status(401).json({ message: "User not found." });
  }
});

// LOGOUT AS A USER ---------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export { getAllUsers, registerUser, loginUser, logoutUser };
