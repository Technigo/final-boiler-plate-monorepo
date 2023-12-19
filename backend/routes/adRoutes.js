// Import the necessary modules and functions
import express from "express";
import { authenticateUser } from "../middleware/authenticateUser"; // Import middleware for user authentication
import {
    getAllAdsController,
    getAdsController,
    updateAdController,
    deleteAllAdsController,
    deleteSpecificAdController,
    addAdController,
} from "../controllers/adController"; // Import controller functions for ads

// Create an instance of the Express router
const router = express.Router();

// Define a route for handling GET requests to retrieve all ads
router.get("/getAllAds", getAllAdsController);

// Define a route for handling GET requests to retrieve all ads
router.get("/get", authenticateUser, getAdsController); // When a GET request is made to /get, authenticate the user using middleware and then execute the getAdsController function

// Define a route for handling PUT requests to update a specific ad by ID
router.put("/update/:id", updateAdController); // When a PUT request is made to /update/:id, execute the updateAdController function

// Define a route for handling DELETE requests to delete all ads
router.delete("/deleteAll", deleteAllAdsController); // When a DELETE request is made to /deleteAll, execute the deleteAllAdsController function

// Define a route for handling DELETE requests to delete a specific ads by ID
router.delete("/delete/:id", deleteSpecificAdController); // When a DELETE request is made to /delete/:id, execute the deleteSpecificAdController function

// Define a route for handling POST requests to add a new AD
router.post("/add", authenticateUser, addAdController); // When a POST request is made to /add, authenticate the user using middleware and then execute the addAdController function

// Export the router for use in the main application
export default router;

