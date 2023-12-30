// Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import listEndpoints from "express-list-endpoints"; // A package that lists all the endpoints of the server.

// Utils
import { connectDB } from "./config/db.js";

// Environment variables
dotenv.config();

// Defines the port number the app (server) will run on.
const port = process.env.PORT || 8080;

// Connection to the database through Mongoose.
connectDB();

const app = express(); // Creates an Express application.

app.use(cors()); // Enable CORS for all origins.
app.use(express.json()); // Parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: false })); // Parse incoming requests with urlencoded payloads.
app.use(cookieParser()); // Parse cookie header and populate req.cookies with an object keyed by the cookie names.

// Error handling for server state.
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({ error: "Service unavailable" });
  }
});

// ROUTES ---------------------------------------------

app.get("/", (req, res) => {
  // The list of endpoints is generated.
  const endpoints = listEndpoints(app);
  // The list of endpoints is returned as a JSON object.
  res.json({ endpoints });
});

// Start the server. The server is listening on port 8080. Logs a message to the console once the server has started.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
