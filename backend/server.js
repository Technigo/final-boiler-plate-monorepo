// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables from a .env file
import mongoose from "mongoose"; // Import mongoose library to work with mongodb
import crypto from "crypto" // Imports the Node.js crypto library for generating secure ramdom strings.
// const bcrypt = require('bcrypt')

dotenv.config(); // Load environment variables from the .env file
import taskRoutes from "./routes/taskRoutes"; // Import custom task controlled-routes
import userRoutes from "./routes/userRoutes"; // Import custom user routes

// import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose

// Create a new Mongoose schema named 'userSchema'
// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type
    username: {
      type: String, // Specifies that 'username' should be a string
      required: true, // Indicates that 'username' is a required field
      unique: true, // Ensures that 'username' values are unique
      minlength: 2, // Sets a minimum length of 2 characters for 'username'
    },
    // Define the 'password' field with a String data type
    password: {
      type: String, // Specifies that 'password' should be a string
      required: true, // Indicates that 'password' is a required field
      minlength: 6, // Sets a minimum length of 6 characters for 'password
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Define the 'accessToken' field with a String data type
    accessToken: {
      type: String, // Specifies that 'accessToken' should be a string 
      default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
    },
  },
  {
    timestamps: true,
  }
)

// // Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// // This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
// export const UserModel = mongoose.model("User", userSchema) 

// but im tired of 'users' collection. i had long hard times with this collection before. so ill use 'cats' instead in this case 
// no. im having err with this...
// yes. i cant use User anyway bcs ive used that with w16s project. so lets use Cat instead xD
const UserModel = mongoose.model('Cat', userSchema, 'cats')

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Define an asynchronous function 'connectDB' to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from the environment variables
    // Mongoose Method: mongoose.connect()
    // Description: This line of code serves the crucial purpose of connecting the Node.js application to the MongoDB database specified by the URL provided in the environment variable MONGO_URL. Once this connection is established, the application can perform various database operations, such as querying and modifying data in the MongoDB database. It's a critical step in setting up the database connection for the application to work with MongoDB.
    const conn = await mongoose.connect(process.env.MONGO_URL)

    // If the connection is successful, log a message indicating that the MongoDB is connected
    console.log(`MongoDB Connected: ${conn.connection.host}`) 
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message
    console.log(error)
    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1)
  }
}

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
app.use(taskRoutes); // Use the task-controlled routes for task-related requests
app.use(userRoutes); // Use the user-controlled routes for user-related requests

// Connection to the database through Mongoose
connectDB();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
