import { UserModel } from "../models/UserModel";
import { handleErrors } from '../controllers/commonController';

// Define a function called authenticateUser that takes a request (req), response (res), and a next function as parameters
export const authenticateUser = async (req, res, next) => {
  // Retrieve the access token from the request header
  const accessToken = req.header("Authorization");

  try {
    const user = await UserModel.findOne({ accessToken: accessToken });

    if (user) {
      // If a user is found, add the user object to the request object
      req.user = user; // Add user to the request object
      next(); // Continue to the next middleware or route
    } else {
      // If no user is found, send a 401 Unauthorized response
      res.status(401).json({ success: false, response: "Please log in" });
    }
  } catch (error) {
    // Use the handleErrors function for centralized error handling
    handleErrors(res, error);
  }
};

