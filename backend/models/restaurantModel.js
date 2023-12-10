const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantID: String,
  restaurantName: String,
  address: String,
  zipcode: String,
  city: String,
  country: String,
  borough: String,
  cuisine: String,
  occasion: [String],
  mood: [String],
  description: String,
  url: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
