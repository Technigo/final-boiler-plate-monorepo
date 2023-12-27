// Import the 'mongoose' library to work with MongoDB
import mongoose from "mongoose";

// Import the 'dotenv' library to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Define an asynchronous function 'connectDB' to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from the environment variables
    // Mongoose Method: mongoose.connect()
    // Description: This line of code serves the crucial purpose of connecting the Node.js application to the MongoDB database specified by the URL provided in the environment variable MONGO_URL. Once this connection is established, the application can perform various database operations, such as querying and modifying data in the MongoDB database. It's a critical step in setting up the database connection for the application to work with MongoDB.
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // If the connection is successful, log a message indicating that the MongoDB is connected
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message
    console.log(error);

    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1);
  }
};

// In summary, this code does the following:

// - Imports the necessary libraries (mongoose and dotenv) for working with MongoDB and loading environment variables.
// - Loads environment variables from a .env file, which allows you to store configuration values separately from your code.
// - Defines an asynchronous function named connectDB that attempts to connect to a MongoDB database using the URL specified in the MONGO_URL environment variable.
// - If the connection is successful, it logs a message indicating that the MongoDB database is connected, including the host information.
// - If an error occurs during the connection attempt, it logs the error message and exits the Node.js process with an exit code of 1 to indicate that an error has occurred.
