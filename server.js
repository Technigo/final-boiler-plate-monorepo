import express from 'express' // framework: Express.js
import cors from 'cors' // CORS middleware
import dotenv from 'dotenv' // Import dotenv
dotenv.config() // Loads environment variables from the .env file

import userRoutes from './routes/userRoutes'
import { connectDB } from './config/db' // Import database connection function (not used here)???

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080 // Set the port number for the server
const app = express() // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()) // CORS = Cross-Origin Resource Sharing
app.use(express.json()) // Parse incoming data in JSON-format
app.use(express.urlencoded({ extended: false })) // Parse URL-encoded data using the querystring library. Parses simple objects and arrays

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
app.use(userRoutes) // Use the user-controlled routes for user-related requests

// Connection to the database through Mongoose
connectDB()

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
