import mongoose from 'mongoose';
import db from '../config//db.js';


const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    minlength: 5, // Minimum length of 5 characters
  },
  address: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
  },
  zipcode: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
  },
  city: {
    type: String,
    required: true,
    minlength: 5, // Minimum length of 5 characters
  },
  country: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
  },
  borough: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
  },
  cuisine: {
    type: String,
    required: true,
    minlength: 5, // Minimum length of 5 characters
  },
  occasion: [{
    type: String,
    enum: [
      "Have dinner with the in-laws",
      "Have a sunday funday aka brunch",
      "Have dinner with kids present",
      "Have dinner with your bestie",
      "Have dinner with friends to catch up",
      "Say Cheers- a classic Swedish after work",
      "Have dinner with colleagues",
      "Have dinner with the whole family",
      "Have dinner with your parents",
      "Impress your date and the sky is the limit",
      "Impress your date on a tight budget",
      "Celebrate a relationship anniversary",
      "Celebrate you turning 28 again (honey, you ain't fooling anyone)",
      "Have a meparty aka dinner for one",
      "Go on a nice date with that special someone"
    ],
    required: true, // Make it required
  }],
  mood: [{
    type: String,
    enum: [
      "Cozy",
      "Good lighting",
      "Soft-spoken",
      "Bustling",
      "Intimate",
      "Casual",
      "Sophisticated",
      "Family friendly",
      "Homely",
      "Kid friendly",
      "Dog friendly",
      "Calm",
      "Vegan option",
      "Extended dining hours",
      "Romantic"
    ],
    required: true, // Make it required
  }],
  description: {
    type: String,
    required: true,
    minlength: 5, // Minimum length of 5 characters
  },
  url: {
    type: String,
    minlength: 5, // Minimum length of 5 characters
  },
});

const Restaurant = db.model('Restaurant', restaurantSchema);

export default Restaurant;
