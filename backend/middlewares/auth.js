// Import the UserModel from the User model file
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Create a middleware function to authenticate the access token. The middleware function will be used in the routes that require authentication.
const authenticateUser = asyncHandler(async (req, res, next) => {
  // Get the access token from the Authorization header.
  const authHeader = req.header("Authorization");

  // If there is no access token in the Authorization header, return an error.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If the Authorization header is missing or does not start with Bearer, return an error.
    return res.status(401).json({
      success: false, // If the request is not successful, the success property will be set to false.
      response: "Invalid or missing Authorization header", // The response property will contain an error message.
    });
  }

  // Get the access token without the Bearer prefix.
  const accessToken = authHeader.split(" ")[1]; // The split() method splits the string into an array. The [1] index is the access token. The [0] index is the Bearer prefix.

  // Verify the access token.
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); // The verify() method verifies the access token. If the access token is valid, the method returns the decoded access token.
    const user = await UserModel.findById(decoded.userId); // Find the user by the user ID in the decoded access token.

    // If the user is found, set the user property of the request object to the user document.
    if (user) {
      req.user = user; // The user property of the request object will be used in the route handlers to access the user document.
      next();
    } else {
      res.status(401).json({ success: false, response: "User not found" });
    }
  } catch (error) {
    // If the access token is invalid, the verify() method throws an error.
    res.status(401).json({
      success: false, // If the request is not successful, the success property will be set to false.
      response: "Token expired or invalid. Please log in again",
    });
  }
});

// Export the middleware function.
export { authenticateUser };
