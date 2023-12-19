import dotenv from 'dotenv';
dotenv.config();

// Import the database connection from Database.js
import db from './config/db.js'; 

// Import the seeding model
import Restaurant from './models/seedingRestaurant.js';
import restaurantData from './seeds/databaseRestaurants.json' assert { type: 'json' };

// Listen to error events on the database connection
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Listen to the connection event
db.once('open', () => {
  console.log('Using established MongoDB connection...');

  // Insert data
  Restaurant.insertMany(restaurantData)
    .then(() => {
      console.log('Data seeded successfully');
      db.close(); // Close the connection
    })
    .catch((error) => {
      console.error('Error seeding data:', error);
      db.close(); // Close the connection in case of error
    });
});

