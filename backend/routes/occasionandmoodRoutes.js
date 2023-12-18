import express from 'express';
import Restaurant from '../models/restaurantModel.js'; // Adjust the path as necessary
import asyncHandler from 'express-async-handler'; // Ensure you have this package installed for handling async requests


const router = express.Router();

router.get('/restaurants/search', asyncHandler(async (req, res) => {
  // Extract occasion and mood query parameters from the request
  const { occasion, mood } = req.query;

  // Ensure occasion is provided and only one is selected
  if (!occasion || Array.isArray(occasion)) {
    return res.status(400).json({ message: 'You can only pick one occasion' });
  }

  // Ensure mood is provided and between 1 to 3 moods are selected
  const moods = Array.isArray(mood) ? mood : [mood]; // Convert to array if not already
  if (moods.length === 0 || moods.length > 3) {
    return res.status(400).json({ message: 'You have to make a selection i 1 to 3 moods' });
  }

  // Find restaurants that match the given occasion and mood
  try {
    const restaurants = await Restaurant.find({ 
      occasion: occasion, 
      mood: { $in: moods } 
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

router.get('/api/occasions', asyncHandler(async (req, res) => {
  try {
    const occasions = await Restaurant.distinct('occasion');
    res.json(occasions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));

export default router;
