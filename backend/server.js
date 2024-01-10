// Importing necessary libraries and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'; // Make sure to import the 'path' module

// Importing custom route handlers
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cocktailRoutes from "./routes/cocktailRoutes";

// Import database connection functions
import { connectAtlasDB } from "./config/db";

dotenv.config(); // Load and parse environment variables from the .env file

// Retrieve the port number from environment variables or set default
const port = process.env.PORT || 3000;

// Create an Express application instance
const app = express();

// Middlewares setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registering API routes with the Express application
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cocktails', cocktailRoutes);

// Connecting to Mongo DB Atlas Instance
connectAtlasDB(); // Connects to MongoDB Atlas

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
