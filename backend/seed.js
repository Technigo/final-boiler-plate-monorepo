require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Restaurant = require('./models/restaurantModel');
const restaurantData = require('./seeds/databaseRestaurants.json');

const connectionURI = process.env.MONGO_URL;

mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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