
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Token is not valid' });
    }

    if (user.role !== 'user') {
      return res.status(403).json({ success: false, message: 'Access denied: requires user role' });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};


/*
//TECHNIGO CODE //
import { UserModel } from "../models/UserModel";

export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header
  const accessToken = req.header("Authorization");
  try {
    // Find a user in the database using the retrieved access token
    // Mongoose Method: UserModel.findOne({ accessToken: accessToken })
    // Description: This line of code serves the purpose of authenticating a user based on the provided access token. It checks if a user with the specified accessToken exists in the database using the UserModel. If a user is found, their user document is stored in the user variable. This allows the middleware to add the user object to the request, making it available for subsequent middleware or routes. If no user is found, it prepares to send a 401 Unauthorized response to indicate that the user needs to log in. This code is an essential part of user authentication in the Node.js application and helps control access to protected routes or endpoints.
    const user = await UserModel.findOne({ accessToken: accessToken });
    if (user) {
      // Check if the user has the 'user' role
      if (user.role === 'user') {
        req.user = user; // Add the user object to the request
        next(); // User is authenticated and has the 'user' role, proceed to the next middleware
      } else {
        // User found but does not have 'user' role
        res.status(403).json({ success: false, response: "Access denied: User role required" });
      }
    } else {
      // No user found with the provided access token
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (e) {
    // Handle any errors during the authentication process
    res.status(500).json({ success: false, response: e.message });
  }
};
*/

// SUMMARY

//In this code, we have a function called authenticateUser that is used as middleware in a Node.js application. This middleware is responsible for checking the authorization header of an incoming request, searching for a user with the provided access token in the database using the UserModel, and adding the user object to the request if found. If no user is found or if there are any errors during the process, appropriate responses are sent back to the client. In summary, this code is handling user authentication by checking the access token in the request header and verifying it against the database to grant access to protected routes or endpoints.
