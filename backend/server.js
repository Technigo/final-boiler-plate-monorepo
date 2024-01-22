import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import listEndpoints from "express-list-endpoints";
import userRoutes from "./routes/userRoutes";
import dogRoutes from "./routes/dogRoutes.js"
import { connectDB } from "./config/db.js"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 3000; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(userRoutes)
app.use(dogRoutes)

connectDB()

// List all of the endpoints
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
  });

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
