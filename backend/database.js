const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();

const connectionURI = process.env.MONGO_URL;

const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const db = mongoose.createConnection(connectionURI, databaseOptions);

autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;


