const express = require('express');
const cors = require('cors');
const db = require('./database'); 
const moodRoutes = require('./routes/moodRoutes'); 
const occasionRoutes = require('./routes/occasionRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://yourfrontenddomain.com' // Replace with your actual frontend domain
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import the routes using CommonJS syntax
const moodRoutes = require('./routes/moodRoutes'); 
const occasionRoutes = require('./routes/occasionRoutes'); 

app.use('/tasks', taskRoutes); // Use task routes
app.use('/users', userRoutes); // Use user routes

// The server starts listening only after the database connection is established
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
