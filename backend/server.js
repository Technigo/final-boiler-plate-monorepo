// I believe this is the main server file for the Node.js Express application

// Importing necessary libraries and modules
import express from "express"; // Express.js framework for building web applications
import cors from "cors"; // CORS middleware for handling cross-origin requests
import dotenv from "dotenv"; // dotenv for loading environment variables from .env file
//import path from "path"; // path module for handling file paths ELBA
dotenv.config(); // Load and parse environment variables from the .env file

// Importing custom route handlers
import userRoutes from "./routes/userRoutes"; // Routes for user-related API endpoints
//import taskRoutes from "./routes/taskRoutes"; // Routes for task-related API endpoints ELBA
import adminRoutes from "./routes/adminRoutes"; // Routes for admin-related API endpoints
import cocktailRoutes from "./routes/cocktailRoutes"; // Import routes for cocktail-related endpoints

// Import database connection function
import { connectDB } from "./config/db"; // Function to connect to the MongoDB database
import { connectAtlasDB } from "./config/db"; // MIRELA

// Retrieve the port number from environment variables or set default
const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

// Create an Express application instance
const app = express();

// Middlewares setup
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies

// Registering API routes with the Express application
// app.use(taskRoutes); // Use taskRoutes for handling requests related to tasks
app.use('/', userRoutes); // Use userRoutes for handling requests related to users
app.use('/admin', adminRoutes); // Use adminRoutes for handling requests related to admin users
app.use('/cocktails', cocktailRoutes); // Use cocktailRoutes for handling requests related to cocktails, prefixed with '/cocktails'

// app.use('/uploads', express.static('uploads')); 
// // Serving uploaded images from the 'uploads' directory as static files

// app.use((error, req, res, next) => {
//   console.error('Unhandled Error:', error);
//   res.status(500).send('An error occurred');
// });
// // Basic Error Handler - Add this before starting your server

// Establish a connection to the database
connectDB();

// Connect to MongoDB Atlas for cocktail-related data
connectAtlasDB(); // MIRELA

// Note: The Atlas DB connection will be handled in the specific part of your application that needs it
// (e.g., within cocktailRoutes or its controller)

// Start the server and listen for incoming requests
app.listen(port, () => {
  // Log a message when the server starts successfully
  console.log(`Server running on http://localhost:${port}`);
});


