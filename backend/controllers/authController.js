import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(401).send("Unauthorized");
    }

    // Attach decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
};

// REGISTER A NEW USER ---------------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await UserModel.findOne({ username });

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

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// LOGIN A USER ---------------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 3600000,
    });
    res.json({ user: { username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DASHBOARD ---------------------------------------------
export const userDashboard = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(decoded);
      });
    });
    // Here you can fetch user data from the database using the decoded.userId
    // Attach decoded user information to the request object
    req.user = decoded;
    res.send(`Welcome to the dashboard, user ${decoded.userId}`);
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized");
  }
});

// LOGOUT USER ---------------------------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.send("Logout successful");
});
