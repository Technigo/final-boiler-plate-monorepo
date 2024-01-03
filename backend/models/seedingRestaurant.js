import mongoose from 'mongoose';
import db from '../config/db.js';

const seedingRestaurantSchema = new mongoose.Schema({
  restaurantID: {
    type: String,
    required: true
  },
  restaurantName: {
    type: String,
    required: true
  },
  address: String,
  zipcode: String,
  city: String,
  country: String,
  borough: String,
  cuisine: String,
category: [String],
  occasion: [String], // Array of strings without enum restrictions
  mood: [String], // Array of strings without enum restrictions
  description: String,
  url: String,
});

const SeedingRestaurant = db.model('SeedingRestaurant', seedingRestaurantSchema);

export default SeedingRestaurant;