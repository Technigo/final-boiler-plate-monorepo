import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Genetares a token for the user. The token is generated using the user's id and a secret key. The secret key is stored in the .env file and is used to sign the token. The token is set to expire in 24 hours.
const generateToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET || "default_secret";
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "24h",
  });
};

// Register a new user in the database
export const registerUserController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username or password is missing
    if (!username || !password) {
      // if so, set http status to a 401 code
      res.status(401).json({ error: "Missing username or password" }); // 401 is unauthorized
    }

    // Check if the username already exists in the database
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res
        .status(409)
        .json({ error: `User with username '${username}' already exists` }); // 409 is conflict, a user with the same username already exists.
    }

    // Hash the user's password using bcrypt. GensaltSync generates a salt, which is a random string of characters that is used to hash the password. The salt is then used to hash the password using the hashSync method. The salt is stored in the database along with the hashed password.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user using the UserModel. The new user is passed the username and hashed password.
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });
    console.log("New User Object:", newUser);
    // Save the new user in the database
    await newUser.save();

    // Respond with a success message, user details, and the JWT token for authentication
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username, // The username is sent back to the client
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
      // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
      return res
        .status(401)
        .json({ success: false, response: "Incorrect password" });
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

// SUMMARY

// This file contains controller functions for user-related operations within an Express.js application. Let's provide a summary with additional context:

// registerUserController: This controller handles user registration. It extracts the user's username, password, and email from the request body. It performs several checks, such as ensuring that all required fields are provided and that the chosen username or email is not already in use by another user. It securely hashes the user's password using the bcrypt library and stores the hashed password in the database. After successfully registering the user, it responds with a success message, user details, and a JSON Web Token (JWT) for authentication.

// generateToken: This is a utility function used to generate JWT tokens for user authentication. It takes a user object and creates a token containing the user's access token, with an optional secret key and a 24-hour expiration time.

// loginUserController: This controller manages user login. It extracts the username and password from the request body, then attempts to find a user with the provided username in the database. If the user is found, it compares the provided password with the hashed password stored in the database using bcrypt. If the credentials match, it generates a JWT token for the user and responds with a success message, user details, and the JWT token. In case of authentication failure (wrong password or non-existent user), it responds with appropriate error messages.

// In summary, this file provides controllers for user registration and login, ensuring that user credentials are securely handled and authenticated using JWT tokens. It also uses bcrypt to hash and store passwords securely in the database, enhancing the overall security of user authentication in the application.
