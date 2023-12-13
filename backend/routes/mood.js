import express from 'express';
import Restaurant from '../models/restaurantModel.js'; // Adjust the path as necessary

const router = express.Router();

// Endpoint to get a list of moods
router.get('/moods', async (req, res) => {
  try {
    const moods = await Restaurant.find().distinct('mood');
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

//remodel, user should be able to pick between 1 and 3 moods