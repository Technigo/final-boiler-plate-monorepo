// Import necessary libraries and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import habitRoutes from "./routes/habitRoutes"; // Import custom habit controlled-routes
import { connectDB } from "./config/db";

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the routes for handling API requests
app.use(taskRoutes);
app.use(userRoutes);
app.use(habitRoutes); // Use the habit-controlled routes for habit-related requests

// Connection to the database through Mongoose
connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
