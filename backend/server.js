// Importing modules and files here
import express from "express"; // Express web server framework
import cors from "cors"; // Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Environment variables
import mongoose from "mongoose"; // MongoDB object modeling tool
import listEndpoints from "express-list-endpoints"; // List all endpoints of the server
import cookieParser from "cookie-parser"; // Parse cookie header and populate req.cookies with an object keyed by the cookie names

// Utils
import { connectDB } from "./config/db.js"; // Imports the connectDB function from the db.js file.
import userRoutes from "./routes/userRoutes.js"; // Imports the userRoutes object from the userRoutes.js file.
import plantRoutes from "./routes/plantRoutes.js"; // Imports the plantRoutes object from the plantRoutes.js file.
import favouriteRoutes from "./routes/favouriteRoutes.js"; // Imports the favouriteRoutes object from the favouriteRoutes.js file.
import { PlantModel } from "./models/plantModel.js"; // Imports the PlantModel from the plantModel.js file.
import data from "./data/plants.json" assert { type: "json" }; // Imports the plant data from the plants.json file.

dotenv.config(); // Configure environment variables

const app = express(); // Create an Express application
const port = process.env.PORT; // Set the port to the environment variable PORT

// MIDDLEWARES
app.use(
  // Enable CORS
  cors({
    origin: [`http://localhost:5173`], // Allow access from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    credentials: true, // Allow cookies to be sent to the client
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cookieParser());

// Connect to MongoDB
connectDB();
// Checks the state of your MongoDB connection. If the database is not connected/ready, a 503 Service Unavailable status code returns.
app.use((req, res, next) => {
  // A middleware function with no mount path. This code is executed for every request to the router.
  if (mongoose.connection.readyState === 1) {
    // 1 = Connected
    next(); // Proceed to the next middleware.
  } else {
    // 0 = Disconnected
    res.status(503).json({ error: "Service unavailable" }); // Send an error message.
  }
});

// ROUTES
app.get("/", (req, res) => {
  res.json(listEndpoints(app)); // List all endpoints of the server
});

app.use("/api/users", userRoutes); // All the routes in userRoutes.js will be prefixed with /api/users.
app.use("/api/plants", plantRoutes); // All the routes in plantRoutes.js will be prefixed with /api/plants.
app.use("/api/favourites", favouriteRoutes); // All the routes in favouriteRoutes.js will be prefixed with /api/favourites.

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
