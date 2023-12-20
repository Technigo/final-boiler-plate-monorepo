
import express from 'express';
import Restaurant from '../models/restaurantModel.js'; 
import asyncHandler from 'express-async-handler'; 

const router = express.Router();

// Endpoint to add a new restaurant
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


export default router;
