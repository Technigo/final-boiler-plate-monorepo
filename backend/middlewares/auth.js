import jwt from "jsonwebtoken"; // Imports the jsonwebtoken module, which is used to create, sign, and verify JWTs.
import { UserModel } from "../models/userModel.js"; // Imports the UserModel from the userModel.js file.
import asyncHandler from "../utils/asyncHandler.js"; // Imports the asyncHandler function from the asyncHandler.js file.

// Checks if the user is authenticated and have a valid JWT to be able to login and out.
const authenticateUser = asyncHandler(async (req, res, next) => {
  let token; // Declares a variable to store the JWT token.

  token = req.cookies.jwt; // Extracts the JWT token from the cookie.

  // If the token exists, verify the token. If the token is valid, extract the user's information from the database and attach it to the request object.
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifies the token using the JWT secret stored in the .env file.
      req.user = await UserModel.findById(decoded.userId).select("-password"); // Excludes the password from the user object.
      next(); // Proceed to the next middleware.
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
  // The authorizedAdmin middleware takes in an array of roles as an argument.
  return (req, res, next) => {
    // The authorizedAdmin middleware returns a middleware function.
    if (!req.user) {
      // If the user doesn't exist, send an error message.
      return res.status(401).send("Unauthorized");
    }

    const isAdmin = roles.includes(req.user.role); // Checks if the user's role is included in the array of roles.
    if (!isAdmin) {
      // If the user's role is not included in the array of roles, send an error message.
      return res.status(403).send("Forbidden");
    }

    next(); // Proceed to the next middleware.
  };
};

// Exports the authenticateUser and authorizedAdmin middleware functions.
export { authenticateUser, authorizedAdmin };
