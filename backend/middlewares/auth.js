import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// Checks if the user is authenticated and have a valid JWT to be able to login and out.
const authenticateUser = asyncHandler(async (req, res, next) => {
  let token; // Declares a variable to store the JWT token.

  token = req.cookies.jwt; // Extracts the JWT token from the cookie.

  // If the token exists, verify the token. If the token is valid, extract the user's information from the database and attach it to the request object.
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token using the JWT secret stored in the .env file.
      req.user = await UserModel.findById(decoded.userId).select("-password"); // Excludes the password from the user object.
      next();
    } catch (error) {
      // If the token is invalid, send an error message.
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    // If the token doesn't exist, send an error message.
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

// Authorization middleware
const authorizedAdmin = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const isAdmin = roles.includes(req.user.role);
    if (!isAdmin) {
      return res.status(403).send("Forbidden");
    }

    next();
  };
};

export { authenticateUser, authorizedAdmin };
