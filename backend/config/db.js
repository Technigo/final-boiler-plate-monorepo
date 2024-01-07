import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define an asynchronous function 'connectDB' to connect to the MongoDB database
export const connectDB = async () => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://127.0.0.1/final-project"; // Get the connection string from the environment variable, or use the default value
    const connection = await mongoose.connect(mongoUrl); // Connect to the database

    // If the connection is successful, log a message indicating that the MongoDB is connected
    console.log(`Mongo DB Connected: ${connection.connection.name}`);
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message
    console.error(`Error: ${error.message}`);

    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1);
  }
};
