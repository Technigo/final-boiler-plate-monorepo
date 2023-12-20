// server.js
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import listEndpoints from 'express-list-endpoints';
import restaurantRoutes from './routes/restaurantRoutes.js'; // This handles restaurant-related routes
import occasionandmoodRoutes from './routes/occasionandmoodRoutes.js'; // This handles occasions and moods


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://yourfrontenddomain.com'
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


// Connect to database and start server
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});




// If you have any specific functions to export, add them here
// export { someFunction };