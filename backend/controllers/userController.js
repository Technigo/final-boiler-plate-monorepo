import { UserModel } from "../models/userModel.js"; // Import the UserModel from the userModel.js file.
import asyncHandler from "../utils/asyncHandler.js"; // Import the asyncHandler function from the asyncHandler.js file.
import bcrypt from "bcrypt"; // Use bcrypt to securely hash and store passwords in our database.
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"; // Import the generateToken function from the generateToken.js file.

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

  // 1st Condition - Check if all fields are inputted.
  if (!username || !email || !password) {
    // If any of the fields are empty, send an error message.
    return res.status(400).send({ message: "Please fill in all the inputs." });
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
  const newUser = new UserModel({ username, email, password: hashedPassword });

  // Save the new user to the database.
  try {
    // Try to save the new user to the database.
    await newUser.save();
    // Generate tokens and send them to the client.
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    newUser.refresh_token = refreshToken;
    await newUser.save();

    // Send the user's information to the client.
    res.status(201).json({
      _id: newUser._id, // Send the user's ID.
      username: newUser.username, // Send the user's username.
      email: newUser.email, // Send the user's email.
      role: newUser.role, // Send the user's role.
      accessToken,
      refreshToken,
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

  // Check if it's already an existing user with the provided username in the database.
  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    return res.status(401).json({ message: "User not found." });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  // If the passwords match, generate a JWT token and send it to the client.
  if (passwordMatch) {
    const accessToken = generateAccessToken(existingUser._id);
    const refreshToken = generateRefreshToken(existingUser._id);

    existingUser.refresh_token = refreshToken;
    await existingUser.save();

    // Send the user's information to the client.
    res.status(201).json({
      _id: existingUser._id, // Send the user's ID.
      username: existingUser.username, // Send the user's username.
      email: existingUser.email, // Send the user's email.
      role: existingUser.role, // Send the user's role.
      accessToken,
      refreshToken,
    });
    return; // Exit the function after sending the response.
  } else {
    // If the passwords don't match, send an error message.
    return res.status(401).json({ message: "Invalid password." });
  }

//   // If there's a user, check if the password provided by the user matches the hashed password stored in the database.
//   if (existingUser) {
//     const passwordMatch = await bcrypt.compare(password, existingUser.password); // Compare the password provided by the user with the hashed password stored in the database.

//     // If the passwords match, generate a JWT token and send it to the client.
//     if (passwordMatch) {
//       generateToken(res, existingUser._id); // Generate a JWT token and send it to the client. The token is stored in an HTTP-only cookie. The cookie is sent only to the same site as the request. This prevents the cookie from being sent when making cross-origin requests. This is to prevent CSRF attacks.

//       // Send the user's information to the client.
//       res.status(201).json({
//         _id: existingUser._id, // Send the user's ID.
//         username: existingUser.username, // Send the user's username.
//         email: existingUser.email, // Send the user's email.
//         role: existingUser.role, // Send the user's role.
//       });
//       return; // Exit the function after sending the response.
//     } else {
//       // If the passwords don't match, send an error message.
//       return res.status(401).json({ message: "Invalid password." });
//     }
//   } else {
//     // If there's no user, send an error message.
//     return res.status(401).json({ message: "User not found." });
//   }
 });

// // LOGOUT AS A USER ---------------------------------------------
// const logoutUser = asyncHandler(async (req, res) => {
//   res.cookie("jwt", "", {
//     // Set the cookie to an empty string.
//     // Clear the cookie.
//     httpOnly: true, // Prevents client-side JavaScript from accessing the cookie. This is to prevent XSS attacks.
//     expires: new Date(0), // Sets the cookie to expire immediately. This will delete the cookie.
//   });
//   res.status(200).json({ message: "Logged out successfully" }); // Send a success message.
// });

// LOGOUT USER ---------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    // Revoke the refresh token on the server side (e.g., remove it from the user's record).
    user.refresh_token = undefined;
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(401).json({ message: "Not authorized" });
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
