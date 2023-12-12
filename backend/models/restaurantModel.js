const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const restaurantSchema = new mongoose.Schema({
  restaurantID: Number, // This will be auto-generated
  restaurantName: String,
  address: String,
  zipcode: String,
  city: String,
  country: String,
  borough: String,
  cuisine: String,
  occasion: {
    type: String,
    enum: [
      "Have dinner with the in-laws",
      "Have a sunday funday aka brunch",
      "Breakup with someone aka 'the Diego'",
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
  },
  mood: {
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
  },
  description: String,
  url: String,
});

restaurantSchema.plugin(autoIncrement.plugin, {
  model: 'Restaurant',
  field: 'restaurantID',
  startAt: 1, // The initial value for restaurantID
  incrementBy: 1, // Increment by 1 each time a new restaurant is added
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

