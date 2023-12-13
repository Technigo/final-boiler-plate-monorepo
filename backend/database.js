import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionURI = process.env.MONGO_URL;

const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const db = mongoose.createConnection(connectionURI, databaseOptions);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
