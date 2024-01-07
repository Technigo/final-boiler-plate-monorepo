// Packages
import express from "express"; // A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
import cors from "cors"; // A package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import dotenv from "dotenv"; // A package that loads environment variables from a .env file into process.env.
import mongoose from "mongoose"; // A package for modeling your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
import cookieParser from "cookie-parser"; // A package that parses cookies and populates req.cookies with an object keyed by the cookie names.
import listEndpoints from "express-list-endpoints"; // A package that lists all the endpoints of the server.

// Utils
import { connectDB } from "./config/db.js"; // Imports the connectDB function from the db.js file.
import userRoutes from "./routes/userRoutes.js"; // Imports the userRoutes object from the userRoutes.js file.
import plantRoutes from "./routes/plantRoutes.js"; // Imports the plantRoutes object from the plantRoutes.js file.
import favouriteRoutes from "./routes/favouriteRoutes.js"; // Imports the favouriteRoutes object from the favouriteRoutes.js file.
import { PlantModel } from "./models/plantModel.js"; // Imports the PlantModel from the plantModel.js file.
import data from "./data/plants.json" assert { type: "json" }; // Imports the plant data from the plants.json file.

// Environment variables.
dotenv.config();

// Defines the port number the app (server) will run on.
const port = process.env.PORT || 8080;

// Connection to the database through Mongoose.
connectDB();

const app = express(); // Creates an Express application.

// MIDDLEWARES ---------------------------------------------
app.use(cors({
  origin: 'http://localhost:5173', // replace with the origin of your frontend
  credentials: true,
})); // Enable CORS for all origins.
app.use(express.json()); // Parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: false })); // Parse incoming requests with urlencoded payloads.
app.use(cookieParser()); // Parse cookie header and populate req.cookies with an object keyed by the cookie names.

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

// ROUTES ---------------------------------------------
app.get("/", (req, res) => {
  // The list of endpoints is generated.
  const endpoints = listEndpoints(app);
  // The list of endpoints is returned as a JSON object.
  res.json({ endpoints });
});

app.use("/api/users", userRoutes); // All the routes in userRoutes.js will be prefixed with /api/users.
app.use("/api/plants", plantRoutes); // All the routes in plantRoutes.js will be prefixed with /api/plants.
app.use("/api/favourites", favouriteRoutes); // All the routes in favouriteRoutes.js will be prefixed with /api/favourites.

// Seeding the database with the plant data.
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

// General error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log error stack trace to console
//   res.status(500).send("Something broke!");
// });

// Start the server. The server is listening on port 8080. Logs a message to the console once the server has started.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
