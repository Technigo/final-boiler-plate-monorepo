import { UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization"); // Retrieve the access token from the request header
  try {
    if (!accessToken) {
      // If no access token is found, send a 401 Unauthorized response
      return res.status(401).json({ success: false, response: "Unauthorized" });
    }
    console.log("accessToken", accessToken);
    const decoded = jwt.verify(
      // Verify the access token against the JWT_SECRET
      accessToken, // 1st argument: The access token to verify
      process.env.JWT_SECRET || "default_secret" // 2nd argument: The JWT_SECRET used to sign the access token
    );

    const user = await UserModel.findById(decoded.id); // Find a user in the database using the decoded access token
    if (!user) {
      // If no user is found, send a 401 Unauthorized response
      return res
        .status(401)
        .json({ success: false, response: "User not found" });
    }
    req.user = user; // If a user is found, add the user object to the request object
    next(); // Continue to the next middleware or route
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(401).json({ success: false, response: error.message });
  }
};
