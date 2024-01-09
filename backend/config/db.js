// Import the 'mongoose' library to work with MongoDB
import mongoose from "mongoose";

// Import the 'dotenv' library to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Define an asynchronous function 'connectDB' to connect to the MongoDB database
export const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log a message indicating that the MongoDB is connected
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message
    console.log(error);

    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1);
  }
};

