// Import necessary libraries and modules
import express from "express";
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import for environment variables

dotenv.config(); // Load environment variables from the .env file

import recipeRoutes from "./routes/recipeRoutes"
import { connectDB } from "./config/db"; // Import database connection function (not used here)

// Defines the port the app will run on
const port = process.env.PORT;
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the recipeRoutes (in "routes" -> "recipeRoutes")
app.use(recipeRoutes)

//******Flytta denna senare????****
app.use("/openai", require("./routes/openaiRoutes"))

// Connection to the database through Mongoose
connectDB();

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
