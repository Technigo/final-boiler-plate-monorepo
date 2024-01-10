import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import listEndpoints from 'express-list-endpoints';
import restaurantRoutes from './routes/restaurantRoutes.js';
import occasionandmoodRoutes from './routes/occasionandmoodRoutes.js';

const app = express();

app.use(cors({
  origin: 'https://foodiemoodie.netlify.app/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use('/api', restaurantRoutes);
app.use('/api', occasionandmoodRoutes);

// Endpoint to list all available endpoints
app.get('/', (req, res) => {
  try {
    const endpoints = listEndpoints(app);
    res.json({ endpoints });
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    res.status(500).json({ message: 'Error fetching endpoints' });
  }
});


db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Connect to database and start server
db.once('open', () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  });
});





// If you have any specific functions to export, add them here
// export { someFunction };
