// Import the 'mongoose' library to work with MongoDB.
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
// Import the 'dotenv' library to load environment variables from a .env file.
import dotenv from "dotenv";

// Load environment variables from the .env file.
dotenv.config();

// Define an asynchronous function 'connectDB' to connect to the MongoDB database.
export const connectDB = asyncHandler(async () => {
  try {
    // Connect to the MongoDB database using the URL from the environment variables.
    await mongoose.connect(process.env.MONGO_URL); // Mongoose Method: mongoose.connect().
    console.log(`Connected to mongoDB 🟢`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the Node.js process with an exit code of 1 to indicate an error.
  }
});
