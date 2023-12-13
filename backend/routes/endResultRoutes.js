import express from 'express';
import Restaurant from '../models/restaurantModel.js';

const router = express.Router();

router.get('/results', async (req, res) => {
  const { occasion, moods } = req.query; // Expect moods to be an array

  try {
    // Build a query object and handle the case where moods can be an array
    const query = {};
    if (occasion) query.occasion = occasion;
    if (moods) query.mood = { $in: Array.isArray(moods) ? moods : [moods] };

    const results = await Restaurant.find(query, 
      'restaurantName address zipcode city country borough cuisine occasion mood url');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
