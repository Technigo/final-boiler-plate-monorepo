import asyncHandler from "express-async-handler";

import { UserModel } from "../models/userModel.js";

// GET ALL USERS ---------------------------------------------
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});
