import express from 'express';
import Restaurant from '../models/seedingRestaurant.js'; // Adjust the path as necessary
import asyncHandler from 'express-async-handler'; // Ensure you have this package installed for handling async requests

const router = express.Router();

// Endpoint to search restaurants based on occasion and mood
router.get('/restaurants/search', asyncHandler(async (req, res) => {
  // Extract occasion and mood query parameters from the request
  const { occasion, mood } = req.query;
  console.log('Received request with occasion:', occasion, 'and mood:', mood);

  // Validate that both occasion and mood are provided
  if (!occasion || !mood) {
    return res.status(400).json({ message: 'Both occasion and mood are required parameters' });
  }

  // Ensure occasion is provided and only one is selected
  if (!occasion || Array.isArray(occasion)) {
    return res.status(400).json({ message: 'You can only pick one occasion' });
  }

  // Ensure mood is provided and between 1 to 3 moods are selected
  const moods = Array.isArray(mood) ? mood : [mood];
  if (moods.length === 0 || moods.length > 3) {
    return res.status(400).json({ message: 'You have to make a selection of 1 to 3 moods' });
  }

  // Find restaurants that match the given occasion and mood
  try {
    const restaurants = await Restaurant.find({ 
      occasion: occasion, 
      mood: { $in: mood } 
    });
    console.log('Found restaurants:', restaurants);

    // Check if any restaurants were found
    if (restaurants.length === 0) {
      return res.status(404).json({ message: 'We are sad to say we did not find any matching restaurants, do you want to try again?' });
    }

    res.json(restaurants); // Respond with the found restaurants in JSON format
  } catch (err) {
    console.error('Error during search:', err);
    res.status(500).json({ message: err.message }); // Handle any errors that occur during the operation
  }
}));

// Endpoint to get all occasions
router.get('/occasion', async (req, res) => {
  try {
      const occasions = await Restaurant.distinct('occasion');
      res.json(occasions);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/mood', async (req, res) => {
  try {
      const moods = await Restaurant.distinct('mood');
      res.json(moods);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

export default router;
