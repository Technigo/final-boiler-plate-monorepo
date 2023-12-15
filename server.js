import express from 'express'; // framework: Express.js
import cors from 'cors'; // CORS middleware
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Loads environment variables from the .env file

//import userRoutes from './routes/userRoutes'
import bookingRoutes from './routes/bookingRoutes';
import cinemaHallRoutes from './routes/cinemaHallRoutes';
import showtimeRoutes from './routes/showtimeRoutes';
//import { connectDB } from './config/db' // Import database connection function (not used here)???

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT; // Set the port number for the server
const app = express(); // Create an instance of the Express application
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors()); // CORS = Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming data in JSON-format
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data using the querystring library. Parses simple objects and arrays

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: 'Database is not responding' });
  }
});

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
// app.use('/' userRoutes) // Use the user-controlled routes for user-related requests
app.use('/', bookingRoutes);
app.use('/', cinemaHallRoutes);
app.use('/', showtimeRoutes);
// This asynchronous function connects to the MongoDB database. It uses the MONGO_URL (connection url) stored in the .env-file.
const connectDB = async () => {
  try {
    // Description: Create a connection between the Node.js application and the MongoDB database.
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);

    // Exit the Node.js process. Send exit code 1 which indicates an error
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
