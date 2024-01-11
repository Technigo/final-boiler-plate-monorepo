//Import the necessary modules and functions
//import express from "express";
//import {
  //registerUserController,
  //loginUserController,
//} from "../controllers/userController"; // Import controller functions for user registration and login

import express from "express";
import userModel from "./User";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
 
//import json webtoken, bcrypt, async

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

router.post("/login", asyncHandler(async (req, res) => {
  //extract username and password from the requested body
const { username, password } = req.body;

try {
  const user = await userModel.findOne({ username });

  //find user in database
  if (!user) {
      return res
      .status(401)
      .json({ success: false, response: "User not found" });
  }

  //compare password to the hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      //if the provided password don't match, throw an error message
      return res
      .status(401)
      .json({ success: false, response: "Incorrect password" });
  }

  //respond with success message, user details, and JWT token
  res.status(200).json({
      success: true,
      response: {
          username: user.username,
          id: user._id,
          accessToken: generateToken(user._id), 
      },
  });
  } catch (e) { 
  //handle any errors occuring during the log in process
  res.status(500).json({ success: false, response: e.message });
  }

})
);

export default router;