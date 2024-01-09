import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generates a token for the user. The token is generated using the user's id and a secret key. The secret key is stored in the .env file and is used to sign the token. The token is set to expire in 24 hours.
const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "24h",
  });
};

// Register a new user in the database
export const registerUserController = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username, password or email is missing
    if (!username || !password || !email) {
      // if so, set http status to a 401 code
      res.status(401).json({ error: "Missing username, password or email" }); // 401 is unauthorized
    }

    // Check if the username already exists in the database
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res
        .status(409) // 409 is conflict, a user with the same username already exists.
        .json({ error: `User with username '${username}' already exists` });
    }

    // Check if the email already exists in the database
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      res
        .status(409) // 409 is conflict, a user with the same username already exists.
        .json({ error: `User with email '${email}' already exists` });
    }

    // Hash the user's password using bcrypt. GensaltSync generates a salt, which is a random string of characters that is used to hash the password. The salt is then used to hash the password using the hashSync method. The salt is stored in the database along with the hashed password.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user using the UserModel. The new user is passed the username and hashed password.
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });
    console.log("New User Object:", newUser);
    // Save the new user in the database
    await newUser.save();

    // Respond with a success message, user details, and the JWT token for authentication
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username, // The username is sent back to the client
        email: newUser.email,
        id: newUser._id, // The user's id is sent back to the client
        accessToken: generateToken(newUser._id), // A JWT token is generated and sent back to the client
      },
    });
  } catch (error) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ success: false, response: error.message });
  }
});

// Login a user and generate a JWT token for authentication
export const loginUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a user with the provided username in the database
    const user = await UserModel.findOne({ username });
    if (!user) {
      // If no user is found with the provided username, respond with a 401 Unauthorized and a username not found message
      return res.status(401).json({
        success: false,
        response: "Username not found. Please try again.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
      return res.status(401).json({
        success: false,
        response: "Incorrect password. Please try again.",
      });
    }
    // Respond with a success message, user details, and the JWT token
    res.status(200).json({
      success: true,
      response: {
        username: user.username,
        id: user._id,
        accessToken: generateToken(user._id), // A JWT token is generated and sent back to the client
      },
    });
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, response: error.message });
  }
});
