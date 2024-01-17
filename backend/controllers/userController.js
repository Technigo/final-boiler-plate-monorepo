import asyncHandler from "express-async-handler";

import { UserModel } from "../models/userModel.js";

// GET ALL USERS ---------------------------------------------
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

// GET USER PROFILE ---------------------------------------------
export const userProfile = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
      message: "User profile was successfully retrieved",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No access" });
  }
});
