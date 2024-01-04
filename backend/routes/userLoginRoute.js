
import express from 'express'; // Express.js framework for building web applications
import bcrypt from 'bcrypt'; // bcrypt library for password hashing
import jwt from 'jsonwebtoken'; // jsonwebtoken library for handling JSON Web Tokens
import asyncHandler from 'express-async-handler'; // express-async-handler for simplifying error handling in async route handlers
import dotenv from 'dotenv'; // Import environment variables from a .env file
import { UserModel } from '../models/newUser'; // Import the UserModel from the user model file

dotenv.config(); // Load environment variables from the .env file

const router = express.Router(); // Create an Express router for defining API routes

// Function to generalte JWT token for user authentication //
const generateToken = (user) => {
    // Generate token with users unique ID with an optional secret key
    return jwt.sign({ id: user_id }, process.env.
        JWT_SECRET, {
        expiresIn: "24h", // Token expires in 24 hours
    });
};

// USER LOGIN ROUTE //
// Login route: Handle user login
router.post(
    "/login",
    //authenticateUser, // Use authenticateUser middleware here
    asyncHandler(async (req, res) => {
        // Extract username and password from the request body
        const { username, password } = req.body;

        try {
            // Find a user with the provided username in the database
            const user = await UserModel.findOne({ username });
            if (!user) {
                // If no user is found with the provided username, respond with a 401 Unauthorized and a user not found message
                return res
                    .status(401)
                    .json({ success: false, response: "User not found" });
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // If the provided password doesn't match the stored password, respond with a 401 Unauthorized and an incorrect password message
                return res
                    .status(401)
                    .json({ success: false, response: "Incorrect password" });
            }

            // Respond with a success message, user details, and the JWT token
            res.status(200).json({
                success: true,
                response: {
                    username: user.username,
                    id: user._id,
                    accessToken: generateToken(user._id), // Generate a JWT token for the new user using the user Id :)
                },
            });
        } catch (e) {
            // Handle any errors that occur during the login process
            res.status(500).json({ success: false, response: e.message });
        }
    })
);

// Export the router for use in the main application
export default router;

