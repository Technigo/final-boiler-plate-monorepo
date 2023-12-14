// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables
import listEndpoints from "express-list-endpoints"; // Import listEndpoints to get a list of available endpoints
import bookingRouter from './routes/bookingRoutes'; // Import the bookingRouter
import taskRoutes from "./routes/taskRoutes"; // Import custom task controlled-routes
import userRoutes from "./routes/userRoutes"; // Import custom user routes
import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Load environment variables from the .env file
dotenv.config();

// Define the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Define root endpoint to display all available endpoints
app.get('/', (req, res) => {
  try {
    // Gets a list of required endpoints
    const endpoints = listEndpoints(app);
    res.json(endpoints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve endpoints" });
  }
});

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
// Mount the booking router
app.use('/booking', bookingRouter);
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
