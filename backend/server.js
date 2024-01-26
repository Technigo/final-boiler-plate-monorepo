// Importing modules and files here
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cookieParser from "cookie-parser";

// Utils
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import data from "./data/plants.json" assert { type: "json" };

dotenv.config();

const app = express();
const port = process.env.PORT;

// MIDDLEWARES
app.use(
  cors({
    origin: "*", // Allow access from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    credentials: true, // Allow cookies to be sent to the client
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Checks the state of your MongoDB connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    // 1 = Connected
    next();
  } else {
    // 0 = Disconnected
    res.status(503).json({ error: "Service unavailable" });
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.json(listEndpoints(app)); // List all endpoints of the server
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/favourites", favouriteRoutes);

//Seeding the database with the plant data.
// const seedDatabase = async () => {
//  try {
//    await PlantModel.deleteMany({});
//    await PlantModel.insertMany(data);
//    console.log("Database has been seeded");
//  } catch (error) {
//    console.error("Error resetting the database:", error.message);
//  }
// };
// seedDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🟢`);
});
