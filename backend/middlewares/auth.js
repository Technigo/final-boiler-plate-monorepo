// Import the UserModel from the User model file
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authenticateUser = asyncHandler(async (req, res, next) => {
  // Retrieve the access token from the request header
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      response: "Invalid or missing Authorization header",
    });
  }
  const accessToken = authHeader.split(" ")[1];
  //const user = await UserModel.findOne({ accessToken: accessToken });
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ success: false, response: "User not found" });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      response: "Token expired or invalid. Please log in again",
    });
  }
});

// // Exports the authenticateUser middleware functions.
export { authenticateUser };
