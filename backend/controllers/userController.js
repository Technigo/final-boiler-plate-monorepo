import { UserModel } from "../models/UserModel";
import asyncHandler from "../middleware/asyncHandler";
import bcrypt from "bcrypt"; // Use bcrypt to securely hash and store passwords in our database.
import { generateToken } from "../utils/generateToken";

// REGISTER A NEW USER | POST api/register | Access: Public
const registerUser = asyncHandler(async (req, res) => {
  // Get user data - Extract email, username and password from the request body.
  const { username, password, email } = req.body;

  // 1st Condition - Check if all fields are inputted.
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  // 2nd Condition - Check if the user already exists.
  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) res.status(400).send("User already exists");

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail)
    res
      .status(400)
      .send("Email already exists. Please use a different email address.");

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
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// LOGIN A USER | POST api/login | Access: Public
const loginUser = asyncHandler(async (req, res) => {
  // Extract username and password from the request body.
  const { username, password } = req.body;

  // Check if it's already a existing user with the provided username in the database.
  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // If user provided the right password.
    if (passwordMatch) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return; // Exit the function after sending the response.
    } else {
      res.status(401);
      throw new Error("Invalid password.");
    }
  } else {
    res.status(401);
    throw new Error("User not found.");
  }
});

// LOGOUT A USER | POST api/logged-out | Access: Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// ADMIN CONTROLLER: GET ALL USERS
const allUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

// USER PROFILE CONTROLLER
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// UPDATE USER PROFILE CONTROLLER if authenticated
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Logged in user wishlist
// @route   GET
// @access  Private

// export const wishlistController = asyncHandler();

// Exports
export {
  registerUser,
  loginUser,
  logoutUser,
  allUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
