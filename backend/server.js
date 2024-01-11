// Importing necessary libraries and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import cocktailRoutes from "./routes/cocktailRoutes";

// Import database connection functions
import { connectAtlasDB } from "./config/db";

dotenv.config(); // Load and parse environment variables from the .env file

// const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Retrieve the port number from environment variables or set default
const port = process.env.PORT || 3000;

// Create an Express application instance
const app = express();

// Middlewares setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add express-fileupload middleware
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // Optional: Set file size limit
  useTempFiles: true,
  tempFileDir: '/tmp/' //store temporarily
}));

// Registering API routes with the Express application
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cocktails', cocktailRoutes);

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connecting to Mongo DB Atlas Instance
connectAtlasDB(); // Connects to MongoDB Atlas

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





/*

import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload'; // Import express-fileupload

///////////

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware to handle file uploads
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // You can set file size limits
  useTempFiles: true, // Use temporary file storage
  tempFileDir: '/tmp/' // Specify the temp file directory
}));
const router = express.Router();


app.use('/api/cocktails', cocktailRoutes);

/////////////////


// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
*/

