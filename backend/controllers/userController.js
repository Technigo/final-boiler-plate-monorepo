import { UserModel } from "../models/UserModel";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc    Register new user
// @route   POST api/register
// @access  Public

export const registerUserController = asyncHandler(async (req, res) => {
  // Extract email, username and password from the request body
  const { username, password, email } = req.body;
  // In this try section of the try catch we will first do some conditional logic and then generate the newUser with a crypted password within the DB.
  try {
    // 1st Condition
    // Check wether all fields of registration logic are NOT [!email] inputted from the request.body object
    if (!username || !email || !password) {
      // if so, set http status to a 400code
      res.status(400);
      // and throw new error with some info
      throw new Error("Please add all fields");
    }

    // 2nd Condition
    // Check if the current user trying to register is using an usernam or email that matches with the same username or email in the database, so they would have to choose something diferent
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }

    // Generate a salt and hash the user's password
    //In this line below, we're using the bcrypt library to create a random value called "salt." The salt is added to the password before hashing it. It adds an extra layer of security by making it more difficult for attackers to use precomputed tables (rainbow tables) to crack passwords. The 10 in genSaltSync(10) represents the cost factor, which determines how computationally intensive the hashing process will be.
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    // In this line below, we're using the generated salt to hash the user's password. Hashing transforms the password into a secure and irreversible string of characters. The bcrypt library handles the entire process for us, ensuring that the password is securely hashed. The resulting hashedPassword is what we store in the database to keep the user's password safe.
    // Create a new user instance with the hashed password
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Description: Save the new user instance to the database
    await newUser.save();

    // Respond with a success message, user details, and the JWT token
    res.status(201).json({
      success: true,
      response: {
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
        accessToken: newUser.accessToken,
      },
    });
  } catch (e) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ success: false, response: e.message });
  }
});

// @desc    Login Existing User
// @route   POST api/login
// @access  Public

export const loginUserController = asyncHandler(async (req, res) => {
  // Extract username and password from the request body
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
        accessToken: user.accessToken, //  token for the user using the acessToken generated from the model, // Use the generated token here
      },
    });
  } catch (e) {
    // Handle any errors that occur during the login process
    res.status(500).json({ success: false, response: e.message });
  }
});

// @desc    Update Existing User Profile - update existing info (except for username) or add new info such as self-introduction, location, profile picture
// @route   PUT api/update/:userId
// @access  Public
export const updateUserController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const { password, email, region, introduction, products } = req.body;

  try {
    // Find a user in the database with the same ID and update the details
    const userToBeUpdated = await UserModel.findByIdAndUpdate({ 
      userId,
      password: password,
      email: email,
      region: region,
      introduction: introduction,
      products: products
    });

    if (userToBeUpdated) {
      res.status(200).json({
        success: true,
        response: userToBeUpdated});
    } else {
      res.status(400).json({
        success: false,
        response: "User not found"
      });
    }
    
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  };
});

// @desc    Delete Existing User - if the user wish to delete their account
// @route   POST api/delete/:userId
// @access  Public
export const deleteUserController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find a user in the database with the same ID and delele
    const userToBeDeleted = await UserModel.findByIdAndDelete({ userId });

    if (userToBeDeleted) {
      res.status(200).json({
        success: true,
        response: {
          message: `User with ID ${userId} deleted successfully`,
          deletedUser: userToBeDeleted        
        }});
    } else {
      res.status(400).json({
        success: false,
        response: "User not found"
      });
    }
    
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  };
});


// SUMMARY

// This file contains controller functions for user-related operations within an Express.js application. Let's provide a summary with additional context:

// registerUserController: This controller handles user registration. It extracts the user's username, password, and email from the request body. It performs several checks, such as ensuring that all required fields are provided and that the chosen username or email is not already in use by another user. It securely hashes the user's password using the bcrypt library and stores the hashed password in the database. After successfully registering the user, it responds with a success message, user details, including access token.

// loginUserController: This controller manages user login. It extracts the username and password from the request body, then attempts to find a user with the provided username in the database. If the user is found, it compares the provided password with the hashed password stored in the database using bcrypt. If the credentials match, it generates a JWT token for the user and responds with a success message, user details including access token. In case of authentication failure (wrong password or non-existent user), it responds with appropriate error messages.

// In summary, this file provides controllers for user registration and login, ensuring that user credentials are securely handled and authenticated using JWT tokens. It also uses bcrypt to hash and store passwords securely in the database, enhancing the overall security of user authentication in the application.
