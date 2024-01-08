// Configuration file for connecting to MongoDB using Mongoose

// Importing the Mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Importing the dotenv library to manage environment variables
import dotenv from "dotenv";
// Execute the config function to load variables from .env file into process.env
dotenv.config();

// Configuration options for Mongoose (with deprecated options removed)
const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
};

/**
 * Asynchronous function to connect to MongoDB.
 * This function tries to establish a connection with the MongoDB server
 * using the connection string provided in the .env file.
 */

// CONNECT TO LOCAL MONGO DB
export const connectDB = async () => {
  // Check if the MONGO_URL environment variable is set
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set in .env");
    // Exit the application if MONGO_URL is not set
    process.exit(1);
  }

  try {
    // Attempting to connect to MongoDB using the provided URL and options
    const conn = await mongoose.connect(process.env.MONGO_URL, mongooseOptions);
    // Logging a success message with the connected database host
    console.log(`Local MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Logging the error if the connection fails
    console.error("Local MongoDB connection error:", error);
    // Exiting the application in case of connection failure
    process.exit(1);
  }
};

// CONNECT TO ATLAS DB
export const connectAtlasDB = async () => {
  // Check if the ATLAS_MONGO_URL environment variable is set
  if (!process.env.ATLAS_MONGO_URL) {
    console.error("ATLAS_MONGO_URL is not set in .env");
    process.exit(1);
  }

  try {
    // Attempting to connect to MongoDB Atlas using the provided URL and options
    const conn = await mongoose.connect(process.env.ATLAS_MONGO_URL, mongooseOptions);
    // Logging a success message with the connected database host
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // Logging the error if the connection fails
    console.error("MongoDB Atlas connection error:", error);
    // Exiting the application in case of connection failure
    process.exit(1);
  }
};
