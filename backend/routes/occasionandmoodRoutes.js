import express from 'express';
import Restaurant from '../models/seedingRestaurant.js'; // Adjust the path as necessary
import asyncHandler from 'express-async-handler'; // Ensure you have this package installed for handling async requests

const router = express.Router();

// Endpoint to search restaurants based on occasion and mood
router.get('/restaurants/search', asyncHandler(async (req, res) => {
    const { category, occasion, mood, city } = req.query;

    // Validate that all required parameters are provided
    if (!category || !occasion || !mood || !city) {
        return res.status(400).json({ message: 'Category, occasion, mood, and city are required parameters' });
    }

    // Ensure only one category is selected
    if (Array.isArray(category)) {
         return res.status(400).json({ message: 'You can only pick one category' });
    }

    // Ensure occasion is provided and only one is selected
    if (Array.isArray(occasion)) {
        return res.status(400).json({ message: 'You can only pick one occasion' });
    }

    // Ensure mood is provided and between 1 to 3 moods are selected
    const moods = mood.split(',');
    if (moods.length === 0 || moods.length > 3) {
        return res.status(400).json({ message: 'You must select between 1 and 3 moods' });
    }

    try {
        // Query the database with the provided filters
        const restaurants = await Restaurant.find({
            category: category,
            occasion: occasion,
            mood: { $all: moods },
            city: city // Include city in the query
        });

        console.log('Query:', { category: category, occasion: occasion, mood: { $all: moods } });
        console.log('Found restaurants:', restaurants);
        // Respond with the found restaurants in JSON format
        res.json(restaurants);
    } catch (err) {
        console.error('Error during search:', err);
        res.status(500).json({ message: err.message });
    }
}));

//Endpoint to get all categories
router.get('/category', async (req, res) => {
    try {
        const categories = await Restaurant.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to get all occasions
router.get('/occasion', async (req, res) => {
    try {
        const occasions = await Restaurant.distinct('occasion');
        res.json(occasions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint to get all moods
router.get('/mood', async (req, res) => {
    try {
        const moods = await Restaurant.distinct('mood');
        res.json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/city', asyncHandler(async (req, res) => {
    try {
        // Fetch all unique cities from the Restaurant collection
        const cities = await Restaurant.distinct('city');
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ message: error.message });
    }
}));



export default router;