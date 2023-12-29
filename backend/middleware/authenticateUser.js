import { UserModel } from "../models/UserModel";
import asyncHandler from "./asyncHandler.js";

// USER AUTHENTICATION
const authenticateUser = asyncHandler(async (req, res, next) => {
  // Retrieve the access token from the request header.
  const accessToken = req.header("Authorization");

  try {
    // Find a user in the database using the retrieved access token.
    const userToken = await UserModel.findOne({ accessToken: accessToken });

    if (userToken) {
      // If a user is found, add the user object to the request object.
      req.user = user;
      next();
    } else {
      // If no user is found, send a 401 Unauthorized response.
      res
        .status(401)
        .json({ success: false, response: "Not authorized. Please login." });
    }
  } catch (error) {
    // Handle any errors that occur during the database query or user authentication.
    res.status(500).json({ success: false, response: error.message });
  }
});

// ADMIN AUTHORIZATION
const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Admin authorization failed.");
  }
};

export { authenticateUser, authorizedAdmin };
