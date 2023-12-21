import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Restaurant from '../models/restaurantModel.js';
import asyncHandler from 'express-async-handler';

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Initialize Express app
const app = express();

// Apply JSON middleware to parse request body
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the domain of your frontend app
  optionsSuccessStatus: 200,
};

// Apply CORS middleware to enable cross-origin requests
app.use(cors(corsOptions));

// Define the router
const router = express.Router();

// Search restaurants based on occasion and mood
// Endpoint to search restaurants based on occasion and mood
router.get('/restaurants/search', asyncHandler(async (req, res) => {
    // Extract occasion and mood query parameters from the request
    const { occasion, mood } = req.query;
  
    // Ensure occasion is provided and only one is selected
    if (!occasion || Array.isArray(occasion)) {
      return res.status(400).json({ message: 'You can only pick one occasion' });
    }
  
    // Ensure mood is provided and between 1 to 3 moods are selected
    const moods = Array.isArray(mood) ? mood : [mood];
    if (mood.length === 0 || mood.length > 3) {
      return res.status(400).json({ message: 'You have to make a selection of 1 to 3 moods' });
    }
  
    // Find restaurants that match the given occasion and mood
    try {
      const restaurants = await Restaurant.find({ 
        occasion: occasion, 
        mood: { $in: mood } 
      });
  
      // Check if any restaurants were found
      if (restaurants.length === 0) {
        return res.status(404).json({ message: 'We are sad to say we did not find any matching restaurants, do you want to try again?' });
      }
  
      res.json(restaurants); // Respond with the found restaurants in JSON format
    } catch (err) {
      res.status(500).json({ message: err.message }); // Handle any errors that occur during the operation
    }
  }));

// Get all occasions
router.get('/occasion', asyncHandler(async (req, res) => {
  const occasions = await Restaurant.distinct('occasion');
  res.json(occasions);
}));

// Get all moods
router.get('/mood', asyncHandler(async (req, res) => {
  const moods = await Restaurant.distinct('mood');
  res.json(moods);
}));

// Add a new restaurant
router.post('/restaurants', asyncHandler(async (req, res) => {
    try {
      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res.status(201).json(newRestaurant);
    } catch (error) {
      console.error('Error adding restaurant:', error);
      res.status(400).json({ message: 'Error adding restaurant' });
    }
  }));

// Use the router
app.use('/', router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
