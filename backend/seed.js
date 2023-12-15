import dotenv from 'dotenv';
dotenv.config();

// Import the database connection from Database.js
import db from './database'; // Update the path as necessary

// Import the seeding model
import Restaurant from './models/seedingRestaurant'; // Update the path if necessary
import restaurantData from './seeds/databaseRestaurants.json';

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
})
.catch((error) => console.error('Error using MongoDB connection:', error));
