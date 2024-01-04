//MIRELA 

import express from 'express'; // Express.js framework for building web applications
import bcrypt from 'bcrypt'; // bcrypt library for password hashing
import jwt from 'jsonwebtoken'; // jsonwebtoken library for handling JSON Web Tokens
import asyncHandler from 'express-async-handler'; // express-async-handler for simplifying error handling in async route handlers
import dotenv from 'dotenv'; // dotenv library for loading environment variables from a .env file
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

// USER REGISTRATION ROUTE //
// Register route - handle user registration
// REGISTER ROUTE: Handle user registration
router.post(
    "/register",
    asyncHandler(async (req, res) => {
        // Extract email, username and password from the request body
        const { username, password, email } = req.body;
        // In this try section of the try catch we do some conditional logic and then generate the newUser with a crypted password within the DB.
        try {
            // 1st Condition
            // Check wether all fields of registration logic filled in from the request.body object
            if (!username || !email || !password) {
                // if not, set http status to a 400code
                res.status(400);
                // and throw error message
                throw new Error("Please fill in your information in all the required fields");
            }
            // 2nd Condition
            // Check if username or email matches a username or email already in the database, and if so let the user know
            const existingUser = await UserModel.findOne({
                $or: [{ username }, { email }],
            });
            if (existingUser) {
                res.status(400);
                throw new Error(
                    `User with ${existingUser.username === username ? "username" : "email"
                    } already exists`
                );
            }

            // Generate a salt and hash the user's password
            // Create a random value called "salt" through bcrypt lib. The salt is added to the password before hashing it. It makes it more difficult to use precomputed tables (rainbow tables) to crack passwords. 
            //The 10 in genSaltSync(10) represents the cost factor, which determines how computationally intensive the hashing process will be.
            const salt = bcrypt.genSaltSync(10);

            const hashedPassword = bcrypt.hashSync(password, salt);
            // Use generated salt to hash the user's password. Hashing transforms the password into a secure and irreversible string of characters. The resulting hashedPassword is what we store in the database to keep the user's password safe.
            // Create a new user instance with the hashed password
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save(); // Mongoose Method: newUser.save() - Save the new user to the database


            // Respond with a success message, user details, and the JWT token
            res.status(201).json({
                success: true,
                response: {
                    username: newUser.username,
                    email: newUser.email,
                    id: newUser._id,
                    accessToken: generateToken(newUser._id), // Generate a JWT token for the new user using the user Id :)
                },
            });
        } catch (e) {
            // Handle any errors that occur during the registration process
            res.status(500).json({ success: false, response: e.message });
        }
    })
);

// Export the route for use in the main application
export default router;

