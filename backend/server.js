import express from 'express';
import cors from 'cors';
import occasionRoutes from "./routes/occasionandmoodRoutes.js";
import db from './config/db.js';
import listEndpoints from 'express-list-endpoints';


// Import your routes (make sure these are also converted to ES Modules)
import moodRoutes from './routes/occasionandmoodRoutes.js';


const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://yourfrontenddomain.com' // Replace with your actual frontend domain
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the routes
app.use('/api/moods', moodRoutes); 
app.use('/api/occasions', occasionRoutes); 

// Endpoint to display the list of endpoints
app.get('/', (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({ endpoints });
});


// The server starts listening only after the database connection is established
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});


// If you have any specific functions to export, add them here
// export { someFunction };