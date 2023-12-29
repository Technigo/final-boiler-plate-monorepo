import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { validateRegistration } from "../middleware/registrationValidation";
import { UserModel } from "../models/UserModel";
// Import cloudinary configuration
import cloudinary from "../config/cloudinaryConfig";

// @desc    Register new user
// @route   POST api/register
// @access  Public

export const registerUserController = asyncHandler(async (req, res) => {
  // Run validation middleware
  validateRegistration(req, res, () => {});

  // Extract email, username, password and consent from the request body
  const { username, password, email, consent } = req.body;
  // In this try section of the try catch we will first do some conditional logic and then generate the newUser with a crypted password within the DB.
  try {
    // 1st Condition
    // Check whether all fields of registration logic are NOT [!email] inputted from the request.body object
    if (!username || !email || !password || !consent) {
      // if so, set http status to a 400code
      res.status(400);
      // and throw new error with some info
      throw new Error("Please add all fields");
    }

    // 2nd Condition
    // Check if the current user trying to register is using an username or email that matches with the same username or email in the database, so they would have to choose something diferent
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
      consent
    });

    // Description: Save the new user instance to the database
    await newUser.save();

    // Respond with a success message, user details, and the access token
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


// @desc    Retrieve all users
// @route   GET api/users
// @access  Private

export const getAllUsersController = asyncHandler(async (req, res) => {
  try {
    // Find all users in the database
    const users = await UserModel.find();

    if (users.length != 0) {
      res.status(200).json({
        success: true,
        response: users
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Cannot retrieve users"
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});


// @desc    Retrieve Existing User Profile
// @route   GET api/users/:userId
// @access  Private

export const getUserProfileController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find a user in the database with the same ID and get the details
    const userToBeDisplayed = await UserModel.findById(userId);

    if (userToBeDisplayed) {
      res.status(200).json({
        success: true,
        response: {
          username: userToBeDisplayed.username,
          password: userToBeDisplayed.password,
          email: userToBeDisplayed.email,
          consent: userToBeDisplayed.consent,
          image: userToBeDisplayed.image,
          location: userToBeDisplayed.location,
          introduction: userToBeDisplayed.introduction,
          products: userToBeDisplayed.products
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "User not found"
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, response: e.message });
  }
});


// @desc    Update Existing User Profile - update existing info (except for username) or add new info such as self-introduction, location, profile picture
// @route   PUT api/users/:userId
// @access  Private

export const updateUserController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const { password, email, location, introduction, products } = req.body;

  try {
    // Ensure that the username is not included in the update
    if ("username" in req.body) {
      res.status(400).json({
        success: false,
        response: "Username cannot be updated",
      });
      return;
    }

    // Upload image to Cloudinary
    let imageUrl, imageId;
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.url;
      imageId = result.public_id;
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);
      res.status(500).json({
        success: false,
        response: "Error uploading image to Cloudinary.",
        error: uploadError,
      });
    }

    // Find a user in the database with the same ID and update the details
    const userToBeUpdated = await UserModel.findByIdAndUpdate(userId, {
      $set: {
        password: password, // doublecheck how to display password in frontend
        email: email,
        image: imageUrl,
        imageId: imageId,
        location: location,
        introduction: introduction,
        products: products
      }
    }, {
      new: true // add this to return the updated
    });

    if (userToBeUpdated) {
      res.status(200).json({
        success: true,
        response: userToBeUpdated
      });
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
// @route   DELETE api/users/:userId
// @access  Private

export const deleteUserController = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find a user in the database with the same ID and delele
    const userToBeDeleted = await UserModel.findByIdAndDelete(userId);

    if (userToBeDeleted) {
      // Delete the image from Cloudinary using the imageId
      await cloudinary.uploader.destroy(userToBeDeleted.imageId);
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

