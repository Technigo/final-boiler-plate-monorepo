// Import necessary libraries and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import path from "path";
import plantRoutes from "./routes/plantRoutes";
import userRoutes from "./routes/userRoutes";
import { PlantModel } from "./models/PlantModel";
import { connectDB } from "./config/db";

import data from "./data/plants";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Serve static files from the "uploads" folder.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(userRoutes);
app.use(plantRoutes);

// Seeding the database with the plant data
const seedDatabase = async () => {
  try {
    await PlantModel.deleteMany({});
    await PlantModel.insertMany(data);
    console.log("Database has been seeded");
  } catch (error) {
    console.error("Error resetting the database:", error.message);
  }
};

// seedDatabase();

// Connection to the database through Mongoose
connectDB();

// Error handling for server state
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`); // Display a message when the server is successfully started
});
