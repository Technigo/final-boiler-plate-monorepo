import express from 'express';
import cors from 'cors';
import db from './database.js'; 

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
app.use('/moods', moodRoutes); 
app.use('/occasions', occasionRoutes); 


// The server starts listening only after the database connection is established
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

// If you have any specific functions to export, add them here
// export { someFunction };