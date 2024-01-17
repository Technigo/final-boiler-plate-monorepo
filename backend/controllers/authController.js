import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

import { UserModel } from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";

// REGISTER A NEW USER ---------------------------------------------
export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();

    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "New user was successfully registered",
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.error(error);
  }
});

// LOGIN A USER ---------------------------------------------
export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "Please enter all fields" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect username" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({
      message: "User was successfully logged in",
      success: true,
    });
    next();
  } catch (error) {
    console.error(error);
  }
});
