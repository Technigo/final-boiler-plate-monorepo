const mongoose = require('mongoose');
const Restaurant = require('./models/restaurantModel'); 
const restaurantData = require('./seeds/databaseRestaurants.json'); 

mongoose.connect('mongodb_connection_uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    
    Restaurant.insertMany(restaurantData)
      .then(() => {
        console.log('Data seeded successfully');
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => console.error('MongoDB connection error:', error));

  //replace 'mongodb_connection_uri' with actual MongoDB connection string.