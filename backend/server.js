// Import necessary libraries and modules.

// Packages
import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
const listEndpoints = require("express-list-endpoints"); // A package that lists all the endpoints of the server.

// Utils
import plantRoutes from "./routes/plantRoutes";
import userRoutes from "./routes/userRoutes";
import { PlantModel } from "./models/PlantModel";
import { connectDB } from "./config/db";
import data from "./data/plants";

dotenv.config();
// Defines the port number the app (server) will run on.
const port = process.env.PORT || 8080;

// Connection to the database through Mongoose.
connectDB();

const app = express(); // Create an instance of the Express application.

// Add middlewares to enable cors and json body parsing.
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing).
app.use(express.json()); // Parse incoming JSON data.
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data.

app.get("/", (req, res) => {
  // This function returns a list of all registered routes in the application.
  const endpoints = listEndpoints(app);
  // The list of endpoints is returned as a JSON object.
  res.json({ endpoints });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);

// Seeding the database with the plant data
// const seedDatabase = async () => {
//   try {
//     await PlantModel.deleteMany({});
//     await PlantModel.insertMany(data);
//     console.log("Database has been seeded");
//   } catch (error) {
//     console.error("Error resetting the database:", error.message);
//   }
// };
// seedDatabase();

// Error handling for server state.
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// start the server and log a message indicating that the server has started and on which URL it's running.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
