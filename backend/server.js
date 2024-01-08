// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv"; // Import dotenv for environment variables
dotenv.config(); // Load environment variables from the .env file
// import taskRoutes from "./routes/taskRoutes"; // Import custom task controlled-routes
// import userRoutes from "./routes/userRoutes"; // Import custom user routes
import mongoose from "mongoose";
import DogModel from "./models/DogModel.js";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Soygirt";
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = Promise

// mongodb+srv://Soygirt:Durkslag1@atlascluster.enkh5cp.mongodb.net/Soygirt?retryWrites=true&w=majority


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 3000; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Use the routes for handling API requests
// ROUTES - These routes USE controller functions ;)
//app.use(taskRoutes); // Use the task-controlled routes for task-related requests
//app.use(userRoutes); // Use the user-controlled routes for user-related requests

app.get("/", (req, res) => {
  res.send(listEndpoints(app));
  });

// Get the list of dogs
app.get('/findDogs', async (req, res) => {
  try {
    const dogs = await DogModel.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
