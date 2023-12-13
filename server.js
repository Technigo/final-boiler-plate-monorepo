// Import necessary libraries and modules
import express from 'express'; // Import the Express.js framework
import cors from 'cors'; // Import the CORS middleware
import dotenv from 'dotenv'; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file
import mongoose from 'mongoose';
// import userRoutes from './routes/userRoutes'; // Import custom user routes
import bookingRoutes from './routes/bookingRoutes';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080; // Set the port number for the server
const app = express(); // Create an instance of the Express application
const listEndpoints = require('express-list-endpoints');
// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: 'Database is not responding' });
  }
});

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)

// app.use('/', userRoutes); // Use the user-controlled routes for user-related requests
app.use('/', bookingRoutes);

const connectDB = async () => {
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
connectDB();
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
