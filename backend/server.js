// Import necessary libraries and modules
import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
dotenv.config(); 
import plantRoutes from "./routes/plantRoutes";
import userRoutes from "./routes/userRoutes"; 
import { PlantModel } from "./models/PlantModel";
import { connectDB } from "./config/db"; 

import data from "./data/plants"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080; // Set the port number for the server
const app = express(); // Create an instance of the Express application

// Add middlewares to enable cors and json body parsing
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

app.use(userRoutes)
app.use(plantRoutes)

// Seeding the database with the plant data
const seedDatabase = async () => {
  try {
    await PlantModel.deleteMany({})
    await PlantModel.insertMany(data)
    console.log("Database has been seeded")
  } catch (error) {
    console.error("Error resetting the database:", error.message)
  }
}
// seedDatabase()


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



 // -------------------------JAG LA IN EN BILD PÅ EN ANNAN LIKNANDE SUCCULENT, vet inte vad det är för något.
  // {
  //   "plantID": 18,
  //   "plant_title": "Aloe Vera",
  //   "botanical_name": "Asphodelaceae",
  //   "common_names": ["Aloe barbadensis miller"],
  //   "category_type": ["asphodelaceae", "succulent", "green"],
  //   "origin": "Arabian Peninsula",
  //   "description":
  //     "Discover the Aloe Vera, a resilient succulent from the Asphodelaceae family, renowned for its soothing properties and distinctive rosette of fleshy, pointed leaves. Originating from the arid landscapes of the Arabian Peninsula, Aloe barbadensis miller has been a cherished botanical companion for centuries.",
  //   "fun_fact":
  //     "Native to the Arabian Peninsula, Aloe, particularly Aloe vera, has been around for thousands of years and has been widely used for cosmetics and medicinal purposes.",
  //   "height": "±20",
  //   "careDetails": {
  //     "care_description":
  //       "Known to be an incredibly easy-going succulent, an Aloe makes a great indoor plant that can also help to purify the air. Because they are succulents, they require very little water and maintenance. Your Aloe plant will be happiest on a sunny window ledge.",
  //     "care_level": "Easy",
  //     "watering":
  //       "Water your Aloe Vera when the soil volume is 100% dry. Water thoroughly until it flows out of the drainage hole. Discard excess water to discourage root rot.",
  //     "light":
  //       "Your Aloe plant prefers bright indirect light to full sun. Insufficient light will cause the leaves to droop downwards. If you don't have a location with ideal lighting for your plant, use a Grow Light!",
  //     "benefits": "Skin-soothing properties"
  //   },
  //   "images": {
  //     "preview_url": "",
  //     "full_size_url": "https://images.unsplash.com/photo-1463154545680-d59320fd685d?q=80&w=1275&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   "price": 9.95,
  //   "added_to_whishlist": false
  // },
